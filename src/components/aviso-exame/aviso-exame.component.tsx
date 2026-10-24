import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaTriangleExclamation } from "react-icons/fa6";
import {
  mediaChegaA5,
  mediaFinal,
  n2MinimaMediaFinal,
  NOTA_MAXIMA,
} from "../../shared/utils/nota-minima";
import { lerNota } from "../../shared/utils/notas-salvas";
import {
  BackgroundAvisoExameStyle,
  BotaoAvisoExameStyle,
  ModalAvisoExameStyle,
} from "./aviso-exame.style";

interface IAvisoExameProp {
  curso: string;
  disciplina: string;
  semestre: number;
  DP?: boolean;
}

// n2-insuficiente: falta só a N2 do 2º bimestre e nem 10 nela leva a média final a 5
// media-baixa: todas as notas lançadas e a média final ficou abaixo de 5
type MotivoExame = "n2-insuficiente" | "media-baixa";

const formataNota = (nota: number) => nota.toFixed(1).replace(".", ",");

// Avisa que o aluno terá que fazer o exame, depois que todas as notas (formativa inclusa)
// estão lançadas, exceto a N2 do 2º bimestre no caso "n2-insuficiente"
export const AvisoExame = ({
  curso,
  disciplina,
  semestre,
  DP,
}: IAvisoExameProp) => {
  const [motivo, setMotivo] = useState<MotivoExame | null>(null);
  // "n2-insuficiente": melhor média final possível (com 10 na N2)
  // "media-baixa": a média final atual
  const [media, setMedia] = useState<number | null>(null);
  const [aberto, setAberto] = useState<boolean>(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();

  useEffect(() => {
    const nota = (tipo: "n1" | "n2", bimestre: 1 | 2) =>
      lerNota(
        DP
          ? `DP_${curso}_${disciplina}_${tipo}_${bimestre}_${semestre}`
          : `${curso}_${disciplina}_${tipo}_${bimestre}`
      );

    const semAviso = () => {
      setMotivo(null);
      setMedia(null);
      setAberto(false);
    };

    const verificaExame = () => {
      const n1b1 = nota("n1", 1);
      const n2b1 = nota("n2", 1);
      const n1b2 = nota("n1", 2);
      const n2b2 = nota("n2", 2);
      const formativa = lerNota(`${curso}_formativa_${semestre}`);

      if (
        n1b1 === null ||
        n2b1 === null ||
        n1b2 === null ||
        formativa === null
      ) {
        return semAviso();
      }

      const notas = { n1b1, n2b1, n1b2, formativa };

      if (n2b2 !== null) {
        const mediaAtual = mediaFinal({ ...notas, n2b2 });
        if (mediaChegaA5(mediaAtual)) return semAviso();

        setMotivo("media-baixa");
        setMedia(mediaAtual);
      } else if (n2MinimaMediaFinal(notas) === null) {
        setMotivo("n2-insuficiente");
        setMedia(mediaFinal({ ...notas, n2b2: NOTA_MAXIMA }));
      } else {
        semAviso();
      }
    };

    verificaExame();
    const intervalo = setInterval(verificaExame, 300);

    return () => clearInterval(intervalo);
  }, [curso, disciplina, semestre, DP]);

  const fechar = useCallback(() => {
    setAberto(false);
    botaoRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!aberto) return;

    fecharRef.current?.focus();

    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", fecharComEsc);
    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [aberto, fechar]);

  if (motivo === null || media === null) return null;

  return (
    <>
      <BotaoAvisoExameStyle
        ref={botaoRef}
        type="button"
        // o PDF/imagem da tabela remove este botão (ver capturarTabela)
        data-aviso-exame
        aria-haspopup="dialog"
        aria-label={`Exame necessário em ${disciplina}. Abrir detalhes`}
        title="Exame necessário"
        onClick={(e) => {
          e.stopPropagation();
          setAberto(true);
        }}
      >
        <FaTriangleExclamation aria-hidden="true" />
      </BotaoAvisoExameStyle>

      {/* portal: a tabela tem rolagem, coluna fixa e animação, que prendem um modal fixed */}
      {aberto &&
        createPortal(
          <BackgroundAvisoExameStyle onClick={fechar}>
            <ModalAvisoExameStyle
              role="dialog"
              aria-modal="true"
              aria-labelledby={tituloId}
              onClick={(e) => e.stopPropagation()}
            >
              <h6 id={tituloId} className="title">
                <FaTriangleExclamation aria-hidden="true" />
                Exame necessário
              </h6>
              <p className="text">
                Em <strong>{disciplina.toUpperCase()}</strong>,{" "}
                {motivo === "n2-insuficiente" ? (
                  <>
                    mesmo tirando <strong>{NOTA_MAXIMA}</strong> na N2 do 2º
                    bimestre, a média final seria de apenas{" "}
                    <strong>{formataNota(media)}</strong>, abaixo de{" "}
                    <strong>5,0</strong>.
                  </>
                ) : (
                  <>
                    a média final ficou em <strong>{formataNota(media)}</strong>
                    , abaixo de <strong>5,0</strong>.
                  </>
                )}
              </p>
              <p className="text">Por isso, você terá que fazer o exame.</p>
              <button
                ref={fecharRef}
                type="button"
                className="fechar"
                onClick={fechar}
              >
                Entendi
              </button>
            </ModalAvisoExameStyle>
          </BackgroundAvisoExameStyle>,
          document.body
        )}
    </>
  );
};
