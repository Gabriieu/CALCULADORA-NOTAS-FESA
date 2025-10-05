import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/main.context";
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
  const [placeholder, setPlaceholder] = useState<string | null>(null);

  const { showInputPlaceholder } = useContext(MainContext);

  // Geração das chaves seguindo o padrão unificado
  const n1Key = DP
    ? `DP_${curso}_${disciplina}_n1_${bimestre}_${semestre}`
    : `${curso}_${disciplina}_n1_${bimestre}`;

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
    };

    atualizaValores();
    const interval = setInterval(atualizaValores, 500);
    return () => clearInterval(interval);
  }, [curso, disciplina, tipo, bimestre, semestre, DP, n1Key, formativaKey]);

  // Atualiza placeholder (nota mínima para aprovação)
  useEffect(() => {
    if (tipo === "n2") {
      if (bimestre === 1 && n1 !== null) {
        const n2Necessaria = (5 - n1 * 0.4) / 0.6;
        const arredondada = Math.max(
          0,
          Math.min(10, Math.floor(n2Necessaria * 10) / 10)
        ).toString();
        setPlaceholder(arredondada);
      } else if (bimestre === 2 && n1 !== null && formativa !== null) {
        const n2Necessaria = (5 - (formativa * 0.2 + n1 * 0.2)) / 0.6;
        const arredondada = Math.max(
          0,
          Math.min(10, Math.floor(n2Necessaria * 10) / 10)
        ).toString();
        setPlaceholder(arredondada);
      } else {
        setPlaceholder(null);
      }
    } else {
      setPlaceholder(null);
    }
  }, [tipo, bimestre, n1, formativa]);

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
