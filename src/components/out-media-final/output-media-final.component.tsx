import { useEffect, useState } from "react";
import { OutPutMediaFinalStyle } from "./output-media-final.style";

interface IOutPutProp {
  curso: string;
  disciplina: string;
  semestre: number;
}

export const OutPutMediaFinal = ({
  curso,
  disciplina,
  semestre,
}: IOutPutProp) => {
  const [mediaFinal, setMediaFinal] = useState<number>(0);

  useEffect(() => {
    const calcularMedia = () => {
      const n1_1: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n1_1`)) || 0;
      const n2_1: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n2_1`)) || 0;
      const n1_2: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n1_2`)) || 0;
      const n2_2: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n2_2`)) || 0;
      const formativa: number =
        Number(localStorage.getItem(`${curso}_formativa_${semestre}`)) || 0;

      setMediaFinal(
        (n1_1 * 0.4 +
          n2_1 * 0.6 +
          (((n1_2 + formativa) / 2) * 0.4 + n2_2 * 0.6)) /
          2
      );
    };

    calcularMedia();
    const intervalo = setInterval(calcularMedia, 300);

    return () => clearInterval(intervalo);
  }, [curso, disciplina]);

  const className =
    typeof mediaFinal === "number"
      ? Number(mediaFinal.toFixed(1)) >= 5
        ? "blue"
        : "red"
      : "";

  return (
    <OutPutMediaFinalStyle>
      <span className={className}>
        {typeof mediaFinal === "number" ? mediaFinal.toFixed(1) : "-"}
      </span>
    </OutPutMediaFinalStyle>
  );
};
