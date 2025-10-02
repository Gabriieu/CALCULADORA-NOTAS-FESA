import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/main.context";
import { InputStyle } from "./input.style";

interface IInputProp {
  curso: string;
  disciplina: string;
  tipo: string; // ex: 'n1', 'n2', 'formativa'
  bimestre: number;
  semestre: number;
}

export const InputComponent = ({
  curso,
  disciplina,
  tipo,
  bimestre,
  semestre,
}: IInputProp) => {
  const storageKey = `${curso}_${disciplina}_${tipo}_${bimestre}`;

  const [nota, setNota] = useState<number | "">("");
  const [n1, setN1] = useState<number | null>(null);
  const [formativa, setFormativa] = useState<number | null>(null);
  const [placeholder, setPlaceholder] = useState<string | null>(null);

  // quando gera o pdf, essa variavel torna-se false e esconde o placeholder no pdf
  const { showInputPlaceholder } = useContext(MainContext);

  const n1Key = `${curso}_${disciplina}_n1_${bimestre}`;
  const formativaKey = `${curso}_formativa_${semestre}`;

  // Carrega notas do localStorage e mantém atualizado
  useEffect(() => {
    const atualizaValores = () => {
      const notaSalva = localStorage.getItem(storageKey);
      if (notaSalva !== null && !isNaN(Number(notaSalva))) {
        setNota(Number(notaSalva));
      } else {
        setNota("");
      }

      const valorN1 = localStorage.getItem(n1Key);
      setN1(
        valorN1 !== null && !isNaN(Number(valorN1)) ? Number(valorN1) : null
      );

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
  }, [storageKey, n1Key, formativaKey]);

  // Atualiza o placeholder automaticamente
  useEffect(() => {
    if (tipo === "n2") {
      if (bimestre === 1) {
        if (n1 !== null) {
          // Primeiro bimestre: n1 (40%) + n2 (60%)
          const n2Necessaria = (5 - n1 * 0.4) / 0.6;
          const arredondada = Math.max(
            0,
            Math.min(10, Math.floor(n2Necessaria * 10) / 10)
          ).toString();
          setPlaceholder(arredondada);
        } else {
          setPlaceholder(null); // não mostra placeholder se não houver n1
        }
      }

      if (bimestre === 2) {
        if (n1 !== null && formativa !== null) {
          // Segundo bimestre: formativa (20%) + n1 (20%) + n2 (60%)
          const n2Necessaria = (5 - (formativa * 0.2 + n1 * 0.2)) / 0.6;
          const arredondada = Math.max(
            0,
            Math.min(10, Math.floor(n2Necessaria * 10) / 10)
          ).toString();
          setPlaceholder(arredondada);
        } else {
          setPlaceholder(null); // não mostra se faltar n1 ou formativa
        }
      }
    } else {
      setPlaceholder(null); // apenas n2 sugere nota
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
