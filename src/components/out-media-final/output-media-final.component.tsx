import { useEffect, useState } from "react";
import {
  assinarArmazenamento,
  lerItem,
} from "../../shared/utils/armazenamento";
import { OutPutMediaFinalStyle } from "./output-media-final.style";

interface IOutPutProp {
  curso: string;
  disciplina: string;
  semestre: number;
  DP?: boolean;
  semestreDP?: number;
}

export const OutPutMediaFinal = ({
  curso,
  disciplina,
  semestre,
  DP,
  semestreDP,
}: IOutPutProp) => {
  const [mediaFinal, setMediaFinal] = useState<number>(0);

  useEffect(() => {
    const calcularMedia = () => {
      const n1_1: number = DP
        ? Number(lerItem(`DP_${curso}_${disciplina}_n1_1_${semestreDP}`)) || 0
        : Number(lerItem(`${curso}_${disciplina}_n1_1`)) || 0;
      const n2_1: number = DP
        ? Number(lerItem(`DP_${curso}_${disciplina}_n2_1_${semestreDP}`)) || 0
        : Number(lerItem(`${curso}_${disciplina}_n2_1`)) || 0;
      const n1_2: number = DP
        ? Number(lerItem(`DP_${curso}_${disciplina}_n1_2_${semestreDP}`)) || 0
        : Number(lerItem(`${curso}_${disciplina}_n1_2`)) || 0;
      const n2_2: number = DP
        ? Number(lerItem(`DP_${curso}_${disciplina}_n2_2_${semestreDP}`)) || 0
        : Number(lerItem(`${curso}_${disciplina}_n2_2`)) || 0;
      const formativa: number =
        Number(lerItem(`${curso}_formativa_${semestre}`)) || 0;

      setMediaFinal(
        (n1_1 * 0.4 +
          n2_1 * 0.6 +
          (((n1_2 + formativa) / 2) * 0.4 + n2_2 * 0.6)) /
          2
      );
    };

    calcularMedia();
    // recalcula quando qualquer nota é gravada, em vez de consultar o armazenamento em intervalos
    return assinarArmazenamento(calcularMedia);
  }, [curso, disciplina, semestre, DP, semestreDP]);

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
