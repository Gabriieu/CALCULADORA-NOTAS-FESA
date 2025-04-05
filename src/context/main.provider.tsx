import React, { createContext } from "react";
import { iSemestre } from "./interfaces/interfaces";

interface iMainProviderProps {
  children: React.ReactNode;
}

interface iMainContext {
  semestres: iSemestre[];
  setSemestres: React.Dispatch<React.SetStateAction<iSemestre[]>>;
}

export const MainContext = createContext({} as iMainContext);

export const MainProvider = ({ children }: iMainProviderProps) => {
  const primeiroSemestre: iSemestre = {
    semestre: 1,
    disciplinas: [
      { nome: "Álgebra Linear e Geometria Analítica" },
      { nome: "Algorítmos I" },
      { nome: "Cálculo Diferencial e Integral I" },
      { nome: "Ética e Cidadania" },
      { nome: "Introdução à Engenharia de Computação" },
      { nome: "Química e Ciência dos Materiais" },
    ],
  };
  const segundoSemestre: iSemestre = {
    semestre: 2,
    disciplinas: [
      { nome: "Algorítmos II" },
      { nome: "Banco de Dados I" },
      { nome: "Cálculo Diferencial e Integral II" },
      { nome: "Eletricidade Aplicada" },
      { nome: "Física Geral e Experimental I" },
    ],
  };
  const terceiroSemestre: iSemestre = {
    semestre: 3,
    disciplinas: [
      { nome: "Banco de Dados II" },
      { nome: "Cálculo Avançado" },
      { nome: "Eletiva I" },
      { nome: "Eletrônica Analógica" },
      { nome: "Física Geral e Experimental II" },
      { nome: "Metodologia Científica" },
      { nome: "Programação Orientada a Objetos" },
    ],
  };
  const quartoSemestre: iSemestre = {
    semestre: 4,
    disciplinas: [
      { nome: "Desenho Digital" },
      { nome: "Eletromagnetismo" },
      { nome: "Eletrônica Digital" },
      { nome: "Estrutura de Dados" },
      { nome: "Mecânica Geral" },
    ],
  };
  const quintoSemestre: iSemestre = {
    semestre: 5,
    disciplinas: [
      { nome: "Controle e Automação" },
      { nome: "Fenômenos de Transporte" },
      { nome: "Linguagem de Programação I" },
      { nome: "Mecânica dos Sólidos" },
      { nome: "Sistemas Embarcados" },
    ],
  };
  const sextoSemestre: iSemestre = {
    semestre: 6,
    disciplinas: [
      { nome: "Administração e Estratégia Empresarial" },
      { nome: "Arquitetura de Computadores" },
      { nome: "Linguagem de Programação II" },
      { nome: "Linguagens Formais e Autômatos" },
      { nome: "Modelagem de Software" },
      { nome: "Processamento de Sinais" },
    ],
  };
  const setimoSemestre: iSemestre = {
    semestre: 7,
    disciplinas: [
      { nome: "Compiladores" },
      { nome: "Comunicação de Dados" },
      { nome: "Economia" },
      { nome: "Gestão de Custos" },
      { nome: "Programação Mobile" },
      { nome: "Sistemas Reconfiguráveis" },
    ],
  };
  const oitavoSemestre: iSemestre = {
    semestre: 8,
    disciplinas: [
      { nome: "Engenharia de Software" },
      { nome: "Estatística" },
      { nome: "Gestão de Projetos na Eng. de Computação" },
      { nome: "Pesquisa Operacional" },
      { nome: "Redes de Computadores I" },
      { nome: "Sistemas Operacionais" },
    ],
  };
  const nonoSemestre: iSemestre = {
    semestre: 9,
    disciplinas: [
      { nome: "Gestão da Tecnologia da Informação" },
      { nome: "Gestão Empreendedora" },
      { nome: "Inteligência Artificial" },
      { nome: "Serviços de Rede" },
      { nome: "Sistemas Distribuídos" },
      { nome: "TCC I" },
    ],
  };
  const decimoSemestre: iSemestre = {
    semestre: 10,
    disciplinas: [
      { nome: "Ciências do Ambiente e Desenvolvimento Sustentável" },
      { nome: "Direito Digital" },
      { nome: "Gestão Estratégica da Informação" },
      { nome: "Programação Mobile" },
      { nome: "TCC II" },
      { nome: "Tópicos Avançados de Redes" },
    ],
  };

  const [semestres, setSemestres] = React.useState<iSemestre[]>([
    primeiroSemestre,
    segundoSemestre,
    terceiroSemestre,
    quartoSemestre,
    quintoSemestre,
    sextoSemestre,
    setimoSemestre,
    oitavoSemestre,
    nonoSemestre,
    decimoSemestre,
  ]);

  return (
    <MainContext.Provider value={{ semestres, setSemestres }}>
      {children}
    </MainContext.Provider>
  );
};
