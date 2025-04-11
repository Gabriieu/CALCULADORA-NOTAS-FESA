import { useEffect, useState } from "react";
import { InputStyle } from "./input-formativa.style";

interface IInputProp {
  curso: string;
  semestre: number;
}

export const InputFormativaComponent = ({ curso, semestre }: IInputProp) => {
  const storageKey = `${curso}_formativa_${semestre}`;
  const [nota, setNota] = useState<number>(0);

  useEffect(() => {
    const notaSalva = Number(localStorage.getItem(storageKey)) || 0;

    setNota(notaSalva);
  }, [storageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
  
    if (valor === "") {
      setNota(0);
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
    <InputStyle
      type="number"
      min={0}
      max={10}
      step={0.10}
      value={nota}
      onChange={handleChange}
    />
  );
};
