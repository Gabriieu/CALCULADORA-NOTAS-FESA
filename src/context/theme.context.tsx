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

function temaDoSistema(): Tema {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// a mesma lógica roda inline no index.html para evitar o flash de tema errado
export const TemaProvider = ({ children }: ITemaProviderProps) => {
  const [tema, setTema] = useState<Tema>(
    () => lerTemaSalvo() ?? temaDoSistema(),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  // enquanto o usuário não escolher um tema, acompanha o do sistema
  useEffect(() => {
    const consulta = window.matchMedia("(prefers-color-scheme: dark)");
    const acompanharSistema = (e: MediaQueryListEvent) => {
      if (!lerTemaSalvo()) setTema(e.matches ? "dark" : "light");
    };

    consulta.addEventListener("change", acompanharSistema);
    return () => consulta.removeEventListener("change", acompanharSistema);
  }, []);

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
