import { useEffect, useState } from "react";
import { InputStyle } from "./input.style";

interface IInputProp {
  curso: string;
  disciplina: string;
  tipo: string; // ex: 'n1', 'n2'
  bimestre: number;
}

export const InputComponent = ({
  curso,
  disciplina,
  tipo,
  bimestre,
}: IInputProp) => {
  const storageKey = `${curso}_${disciplina}_${tipo}_${bimestre}`;
  const [nota, setNota] = useState<number | "">("");

  // Carregar do localStorage ao montar
  useEffect(() => {
    const notaSalva = localStorage.getItem(storageKey);
    if (notaSalva !== null) {
      const valorNumerico = Number(notaSalva);
      if (!isNaN(valorNumerico)) {
        setNota(valorNumerico);
      }
    }
  }, [storageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (valor === "") {
      setNota("");
      localStorage.removeItem(storageKey);
    } else {
      const numero = Number(valor);

      const valido = !isNaN(numero) && numero >= 0 && numero <= 10;

      if (valido) {
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
    />
  );
};
