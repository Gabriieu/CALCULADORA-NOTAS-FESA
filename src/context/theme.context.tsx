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
const DURACAO_REVELACAO_MS = 800;
// arranca rápido e assenta devagar, como uma onda que perde força
const SUAVIZACAO_REVELACAO = "cubic-bezier(0.6, 0, 0.1, 1)";
// largura da borda esfumada do círculo, proporcional ao tamanho da tela
const PENA_MIN_PX = 90;
const PENA_MAX_PX = 220;

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
  const ondaRef = useRef<HTMLDivElement>(null);

  // layout effect (e não useEffect) para o atributo já estar no DOM quando o flushSync
  // retornar: é nesse instante que a view transition captura o estado novo
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  // revela o tema novo em um círculo de borda esfumada que cresce a partir da origem, com uma
  // onda de luz na borda enquanto a tela antiga se afasta. Os estilos da transição (classe
  // troca-tema) ficam em globalStyles.ts
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

    const pena = Math.round(
      Math.min(PENA_MAX_PX, Math.max(PENA_MIN_PX, raio * 0.14)),
    );
    // com o raio nesse valor a borda esfumada já saiu inteira da tela
    const raioFinal = `${Math.ceil(raio + pena)}px`;

    const raiz = document.documentElement;
    raiz.style.setProperty("--tema-x", `${x}px`);
    raiz.style.setProperty("--tema-y", `${y}px`);
    raiz.style.setProperty("--tema-pena", `${pena}px`);
    raiz.classList.add(CLASSE_TRANSICAO);
    const transicao = document.startViewTransition(aplicar);
    transicaoAtual.current = transicao;

    let mascara: Animation | undefined;

    // se outra troca começar antes desta terminar, ready é rejeitada; não há o que animar
    transicao.ready
      .then(() => {
        const tempo = {
          duration: DURACAO_REVELACAO_MS,
          easing: SUAVIZACAO_REVELACAO,
        };
        const crescer = { "--tema-raio": ["0px", raioFinal] };

        // forwards: ao terminar, a máscara não pode voltar a fechar em 0 antes de a troca acabar
        mascara = raiz.animate(crescer, {
          ...tempo,
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        });
        ondaRef.current?.animate(crescer, tempo);
        // a tela antiga é empurrada para trás, de dentro para fora
        raiz.animate(
          {
            transform: ["scale(1)", "scale(1.05)"],
            filter: [
              "blur(0px) brightness(1)",
              "blur(6px) brightness(0.9)",
            ],
          },
          { ...tempo, pseudoElement: "::view-transition-old(root)" },
        );
      })
      .catch(() => {});

    transicao.finished.finally(() => {
      // o pseudo-elemento já sumiu; sem isso a animação com fill forwards fica pendurada na raiz
      mascara?.cancel();
      // a classe só sai quando termina a troca mais recente
      if (transicaoAtual.current !== transicao) return;
      transicaoAtual.current = null;
      raiz.classList.remove(CLASSE_TRANSICAO);
      raiz.style.removeProperty("--tema-x");
      raiz.style.removeProperty("--tema-y");
      raiz.style.removeProperty("--tema-pena");
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
      <div ref={ondaRef} className="onda-tema" aria-hidden="true" />
    </TemaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTema = () => useContext(TemaContext);
