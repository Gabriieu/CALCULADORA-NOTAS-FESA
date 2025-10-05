import { useEffect, useState } from "react";
import { OutPutMediaPrimeiroBimestreStyle } from "./output-media-1b.style";

interface IOutPutProp {
  curso: string;
  disciplina: string;
  DP?: boolean;
  semestreDP?: number;
}

export const OutPutMediaPrimerioBimeste = ({
  curso,
  disciplina,
  DP,
  semestreDP,
}: IOutPutProp) => {
  const [media, setMedia] = useState<number>(0);

  useEffect(() => {
    const calcularMedia = () => {
      const n1: number = DP
        ? Number(
            localStorage.getItem(`DP_${curso}_${disciplina}_n1_1_${semestreDP}`)
          ) || 0
        : Number(localStorage.getItem(`${curso}_${disciplina}_n1_1`)) || 0;
      const n2: number = DP
        ? Number(
            localStorage.getItem(`DP_${curso}_${disciplina}_n2_1_${semestreDP}`)
          ) || 0
        : Number(localStorage.getItem(`${curso}_${disciplina}_n2_1`)) || 0;

      if (n1 && n2) {
        setMedia(Number(n1) * 0.4 + Number(n2) * 0.6);
      } else if (n1) {
        setMedia(Number(n1) * 0.4);
      } else if (n2) {
        setMedia(Number(n2) * 0.6);
      } else {
        setMedia(0);
      }
    };

    calcularMedia();
    const intervalo = setInterval(calcularMedia, 300);

    return () => clearInterval(intervalo);
  }, [curso, disciplina]);

  const className =
    typeof media === "number"
      ? Number(media.toFixed(1)) >= 5
        ? "blue"
        : "red"
      : "";

  return (
    <OutPutMediaPrimeiroBimestreStyle>
      <span className={className}>
        {typeof media === "number" ? media.toFixed(1) : "-"}
      </span>
    </OutPutMediaPrimeiroBimestreStyle>
  );
};
