import { useEffect, useState } from "react";
import { InputFormativaStyle } from "./input-formativa.style";

interface IInputProp {
  curso: string;
  semestre: number;
}

export const InputFormativaComponent = ({ curso, semestre }: IInputProp) => {
  const storageKey = `${curso}_formativa_${semestre}`;
  const [nota, setNota] = useState<number | "">("");

  useEffect(() => {
    const notaSalva = Number(localStorage.getItem(storageKey)) || '';

    setNota(notaSalva);
  }, [storageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (valor === "") {
      setNota("");
      localStorage.removeItem(storageKey);
    } else {
      const numero = Number(valor);

      // Só aceita números entre 0 e 10 com até 1 casa decimal
      const valido = !isNaN(numero) && numero >= 0 && numero <= 10;

      if (valido) {
        setNota(numero);
        localStorage.setItem(storageKey, String(numero));
      }
    }
  };

  return (
    <InputFormativaStyle
      type="number"
      min={0}
      max={10}
      step={0.1}
      value={nota}
      onChange={handleChange}
      className={
        typeof nota === "number" ? (nota < 5 ? "vermelho" : "azul") : ""
      }
    />
  );
};
