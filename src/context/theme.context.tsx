import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

export type Tema = "light" | "dark";

interface ITemaContext {
  tema: Tema;
  // origem: elemento de onde a revelação nasce (o botão); sem ele, parte do centro da tela
  alternarTema(origem?: Element): void;
  // volta ao tema padrão sem gravar nada; usado depois de apagar os dados salvos
  redefinirTema(): void;
}

interface ITemaProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "tema";
const CLASSE_TRANSICAO = "troca-tema";
const DURACAO_REVELACAO_MS = 500;

const TemaContext = createContext({} as ITemaContext);

function lerTemaSalvo(): Tema | null {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo === "light" || salvo === "dark" ? salvo : null;
  } catch {
    return null;
  }
}

// a mesma lógica roda inline no index.html para evitar o flash de tema errado
export const TemaProvider = ({ children }: ITemaProviderProps) => {
  // o padrão é sempre o claro, até o usuário escolher outro tema
  const [tema, setTema] = useState<Tema>(() => lerTemaSalvo() ?? "light");

  const transicaoAtual = useRef<ViewTransition | null>(null);

  // layout effect (e não useEffect) para o atributo já estar no DOM quando o flushSync
  // retornar: é nesse instante que a view transition captura o estado novo
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  // revela o tema novo em um círculo que cresce a partir da origem. Os estilos da transição
  // (classe troca-tema) ficam em globalStyles.ts
  const trocarTema = (novo: Tema, origem?: Element) => {
    if (novo === tema) return;

    const aplicar = () => flushSync(() => setTema(novo));

    const semAnimacao =
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semAnimacao) {
      aplicar();
      return;
    }

    const caixa = origem?.getBoundingClientRect();
    const x = caixa ? caixa.left + caixa.width / 2 : window.innerWidth / 2;
    const y = caixa ? caixa.top + caixa.height / 2 : window.innerHeight / 2;
    // distância até o canto mais afastado, para o círculo terminar cobrindo a tela toda
    const raio = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const raiz = document.documentElement;
    raiz.classList.add(CLASSE_TRANSICAO);
    const transicao = document.startViewTransition(aplicar);
    transicaoAtual.current = transicao;

    // se outra troca começar antes desta terminar, ready é rejeitada; não há o que animar
    transicao.ready
      .then(() =>
        raiz.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${raio}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: DURACAO_REVELACAO_MS,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      )
      .catch(() => {});

    transicao.finished.finally(() => {
      // a classe só sai quando termina a troca mais recente
      if (transicaoAtual.current !== transicao) return;
      transicaoAtual.current = null;
      raiz.classList.remove(CLASSE_TRANSICAO);
    });
  };

  const alternarTema = (origem?: Element) => {
    const novo: Tema = tema === "dark" ? "light" : "dark";
    trocarTema(novo, origem);
    try {
      localStorage.setItem(STORAGE_KEY, novo);
    } catch {
      // sem armazenamento: o tema vale apenas para esta sessão
    }
  };

  const redefinirTema = () => trocarTema("light");

  return (
    <TemaContext.Provider value={{ tema, alternarTema, redefinirTema }}>
      {children}
    </TemaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTema = () => useContext(TemaContext);
