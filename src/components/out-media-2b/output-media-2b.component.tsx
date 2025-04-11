import { useEffect, useState } from "react";
import { OutPutMediaSegundoBimestreStyle } from "./output-media-2b.style";

interface IOutPutProp {
  curso: string;
  disciplina: string;
  semestre: number;
}

export const OutPutMediaSegundoBimeste = ({
  curso,
  disciplina,
  semestre,
}: IOutPutProp) => {
  const [media, setMedia] = useState<number>(0);

  useEffect(() => {
    const calcularMedia = () => {
      const n1: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n1_2`)) || 0;
      const n2: number =
        Number(localStorage.getItem(`${curso}_${disciplina}_n2_2`)) || 0;
      const formativa: number =
      Number(localStorage.getItem(`${curso}_formativa_${semestre}`)) || 0;

      setMedia((((n1 + formativa) / 2 ) * 0.4 )+ n2 * 0.6);
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
    <OutPutMediaSegundoBimestreStyle>
      <span className={className}>
        {typeof media === "number" ? media.toFixed(1) : "-"}
      </span>
    </OutPutMediaSegundoBimestreStyle>
  );
};
