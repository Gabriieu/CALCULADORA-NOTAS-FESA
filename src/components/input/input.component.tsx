import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/main.context";
import {
  n2MinimaMediaFinal,
  n2MinimaPrimeiroBimestre,
} from "../../shared/utils/nota-minima";
import { InputStyle } from "./input.style";

interface IInputProp {
  curso: string;
  disciplina: string;
  tipo: string; // ex: 'n1', 'n2', 'formativa'
  bimestre: number;
  semestre: number;
  DP?: boolean;
}

export const InputComponent = ({
  curso,
  disciplina,
  tipo,
  bimestre,
  semestre,
  DP,
}: IInputProp) => {
  const [storageKey, setStorageKey] = useState<string>("");
  const [nota, setNota] = useState<number | "">("");
  const [n1, setN1] = useState<number | null>(null);
  const [formativa, setFormativa] = useState<number | null>(null);
  const [n1Bim1, setN1Bim1] = useState<number | null>(null);
  const [n2Bim1, setN2Bim1] = useState<number | null>(null);
  const [placeholder, setPlaceholder] = useState<string | null>(null);

  const { showInputPlaceholder } = useContext(MainContext);

  // Geração das chaves seguindo o padrão unificado
  const n1Key = DP
    ? `DP_${curso}_${disciplina}_n1_${bimestre}_${semestre}`
    : `${curso}_${disciplina}_n1_${bimestre}`;

  // Notas do 1º bimestre, necessárias para projetar a média final no 2º bimestre
  const n1Bim1Key = DP
    ? `DP_${curso}_${disciplina}_n1_1_${semestre}`
    : `${curso}_${disciplina}_n1_1`;
  const n2Bim1Key = DP
    ? `DP_${curso}_${disciplina}_n2_1_${semestre}`
    : `${curso}_${disciplina}_n2_1`;

  const formativaKey = `${curso}_formativa_${semestre}`;

  useEffect(() => {
    // Define a chave principal do input conforme o tipo (normal ou DP)
    const key = DP
      ? `DP_${curso}_${disciplina}_${tipo}_${bimestre}_${semestre}`
      : `${curso}_${disciplina}_${tipo}_${bimestre}`;

    setStorageKey(key);

    const atualizaValores = () => {
      // Valor principal do input
      const notaSalva = localStorage.getItem(key);
      if (notaSalva !== null && !isNaN(Number(notaSalva))) {
        setNota(Number(notaSalva));
      } else {
        setNota("");
      }

      // N1
      const valorN1 = localStorage.getItem(n1Key);
      setN1(
        valorN1 !== null && !isNaN(Number(valorN1)) ? Number(valorN1) : null
      );

      // Formativa
      const valorFormativa = localStorage.getItem(formativaKey);
      setFormativa(
        valorFormativa !== null && !isNaN(Number(valorFormativa))
          ? Number(valorFormativa)
          : null
      );

      // N1 e N2 do 1º bimestre
      const valorN1Bim1 = localStorage.getItem(n1Bim1Key);
      setN1Bim1(
        valorN1Bim1 !== null && !isNaN(Number(valorN1Bim1))
          ? Number(valorN1Bim1)
          : null
      );
      const valorN2Bim1 = localStorage.getItem(n2Bim1Key);
      setN2Bim1(
        valorN2Bim1 !== null && !isNaN(Number(valorN2Bim1))
          ? Number(valorN2Bim1)
          : null
      );
    };

    atualizaValores();
    const interval = setInterval(atualizaValores, 500);
    return () => clearInterval(interval);
  }, [
    curso,
    disciplina,
    tipo,
    bimestre,
    semestre,
    DP,
    n1Key,
    formativaKey,
    n1Bim1Key,
    n2Bim1Key,
  ]);

  // Atualiza placeholder (nota mínima para aprovação)
  useEffect(() => {
    if (tipo === "n2") {
      if (bimestre === 1 && n1 !== null) {
        const n2Minima = n2MinimaPrimeiroBimestre(n1);
        setPlaceholder(n2Minima === null ? null : String(n2Minima));
      } else if (
        bimestre === 2 &&
        n1 !== null &&
        formativa !== null &&
        n1Bim1 !== null &&
        n2Bim1 !== null
      ) {
        // sem sugestão quando nem 10 basta: nesse caso o aviso de exame aparece
        const n2Minima = n2MinimaMediaFinal({
          n1b1: n1Bim1,
          n2b1: n2Bim1,
          n1b2: n1,
          formativa,
        });
        setPlaceholder(n2Minima === null ? null : String(n2Minima));
      } else {
        setPlaceholder(null);
      }
    } else {
      setPlaceholder(null);
    }
  }, [tipo, bimestre, n1, formativa, n1Bim1, n2Bim1]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (valor === "") {
      setNota("");
      localStorage.removeItem(storageKey);
    } else {
      const numero = Number(valor);
      if (!isNaN(numero) && numero >= 0 && numero <= 10) {
        setNota(numero);
        localStorage.setItem(storageKey, String(numero));
      }
    }
  };

  return (
    <InputStyle
      type="number"
      min={0}
      max={10}
      step={0.1}
      value={nota}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      className={
        typeof nota === "number" ? (nota < 5 ? "vermelho" : "azul") : ""
      }
      placeholder={
        showInputPlaceholder && placeholder ? `≥ ${placeholder}` : ""
      }
    />
  );
};
