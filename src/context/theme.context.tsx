import { createContext, useContext, useEffect, useState } from "react";

export type Tema = "light" | "dark";

interface ITemaContext {
  tema: Tema;
  alternarTema(): void;
}

interface ITemaProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "tema";

const TemaContext = createContext({} as ITemaContext);

function lerTemaSalvo(): Tema | null {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo === "light" || salvo === "dark" ? salvo : null;
  } catch {
    return null;
  }
}

// a mesma lógica roda inline no index.html para evitar o flash de tema errado
export const TemaProvider = ({ children }: ITemaProviderProps) => {
  // o padrão é sempre o claro, até o usuário escolher outro tema
  const [tema, setTema] = useState<Tema>(() => lerTemaSalvo() ?? "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  const alternarTema = () => {
    const novo: Tema = tema === "dark" ? "light" : "dark";
    setTema(novo);
    try {
      localStorage.setItem(STORAGE_KEY, novo);
    } catch {
      // sem armazenamento: o tema vale apenas para esta sessão
    }
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTema = () => useContext(TemaContext);
