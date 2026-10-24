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
  alternarTema(): void;
  // volta ao tema padrão sem gravar nada; usado depois de apagar os dados salvos
  redefinirTema(): void;
}

interface ITemaProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "tema";
const CLASSE_TRANSICAO = "troca-tema";
const DURACAO_TROCA_MS = 800;
// arranca rápido e assenta devagar
const SUAVIZACAO_TROCA = "cubic-bezier(0.6, 0, 0.1, 1)";

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

  // o header desliza para a direita e volta pela esquerda, e a página faz o oposto: sai para a
  // esquerda e volta pela direita. Cada tela antiga é emendada à nova como uma esteira, então
  // juntas cobrem a largura inteira durante todo o percurso. Os estilos da transição (classe
  // troca-tema) ficam em globalStyles.ts
  const trocarTema = (novo: Tema) => {
    if (novo === tema) return;

    const aplicar = () => flushSync(() => setTema(novo));

    const semAnimacao =
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semAnimacao) {
      aplicar();
      return;
    }

    const raiz = document.documentElement;
    raiz.classList.add(CLASSE_TRANSICAO);
    const transicao = document.startViewTransition(aplicar);
    transicaoAtual.current = transicao;

    // se outra troca começar antes desta terminar, ready é rejeitada; não há o que animar
    transicao.ready
      .then(() => {
        const tempo = {
          duration: DURACAO_TROCA_MS,
          easing: SUAVIZACAO_TROCA,
        };
        const deslizar = (camada: string, de: string, para: string) =>
          raiz.animate(
            { transform: [`translateX(${de})`, `translateX(${para})`] },
            { ...tempo, pseudoElement: `::view-transition-${camada}` },
          );

        // header: para a direita
        deslizar("old(header-tema)", "0", "100%");
        deslizar("new(header-tema)", "-100%", "0");
        // página: para a esquerda
        deslizar("old(root)", "0", "-100%");
        deslizar("new(root)", "100%", "0");
      })
      .catch(() => {});

    transicao.finished.finally(() => {
      // a classe só sai quando termina a troca mais recente
      if (transicaoAtual.current !== transicao) return;
      transicaoAtual.current = null;
      raiz.classList.remove(CLASSE_TRANSICAO);
    });
  };

  const alternarTema = () => {
    const novo: Tema = tema === "dark" ? "light" : "dark";
    trocarTema(novo);
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
