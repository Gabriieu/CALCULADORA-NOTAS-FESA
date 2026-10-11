import React, { createContext, useState } from "react";
import { IDisciplina } from "./interfaces/interfaces";

interface iMainProviderProps {
  children: React.ReactNode;
}

interface iMainContext {
  cursos: [] | string[];
  getCursos(): void;
  getSemestres(nomeCurso: string): void;
  semestres: number[] | undefined;
  disciplinas: [] | IDisciplina[];
  getDisciplinas(nomeCurso: string, semestre: number): void;
  showInputPlaceholder: boolean;
  setShowInputPlaceholder: React.Dispatch<React.SetStateAction<boolean>>;
  getDisciplinasAnteriores(
    nomeCurso: string,
    semestre: number
  ): {
    nome: string;
  }[][];
}

export const MainContext = createContext({} as iMainContext);

export const MainProvider = ({ children }: iMainProviderProps) => {
  const grade = [
    {
      course_id: 1,
      course_name: "Administração",
      course_semesters: [
        {
          semester_id: 1,
          classes: [
            {
              nome: "Macroeconomia",
            },
            {
              nome: "Teoria Geral da Administração",
            },
            {
              nome: "Ética e Cidadania",
            },
            {
              nome: "Ferramentas Computacionais",
            },
            {
              nome: "Métodos Quantitativos",
            },
            {
              nome: "Metodologia da Pesquisa Científica",
            },
          ],
        },
        {
          semester_id: 2,
          classes: [
            {
              nome: "Fundamentos de Marketing",
            },
            {
              nome: "Sociologia Aplicada à Administração",
            },
            {
              nome: "Direito Aplicado à Empresa",
            },
            {
              nome: "Estatística Básica",
            },
            {
              nome: "Comportamento Organizacional",
            },
            {
              nome: "Microeconomia",
            },
            {
              nome: "Estruturas Organizacionais",
            },
          ],
        },
        {
          semester_id: 3,
          classes: [
            {
              nome: "Estatística Aplicada",
            },
            {
              nome: "Planejamento Estratégico Empresarial",
            },
            {
              nome: "Comportamento do Consumidor e Pesquisa de Mercado",
            },
            {
              nome: "Administração de Sistemas de Informação",
            },
            {
              nome: "Contabilidade para Administradores",
            },
            {
              nome: "Projeto Interdisciplinar I",
            },
            {
              nome: "Eletiva I",
            },
          ],
        },
        {
          semester_id: 4,
          classes: [
            {
              nome: "Recursos Materiais e Patrimoniais",
            },
            {
              nome: "Criatividade e Inovação",
            },
            {
              nome: "Matemática Financeira",
            },
            {
              nome: "Gestão Mercadológica",
            },
            {
              nome: "Gestão Estratégica de Custos",
            },
            {
              nome: "Econometria",
            },
          ],
        },
        {
          semester_id: 5,
          classes: [
            {
              nome: "Administração da Produção e Operações",
            },
            {
              nome: "Análise Contábil e Financeira",
            },
            {
              nome: "Gestão de Inteligência de Mercado",
            },
            {
              nome: "Gestão de Projetos",
            },
            {
              nome: "Gestão de Pessoas",
            },
            {
              nome: "Planejamento Tributário",
            },
          ],
        },
        {
          semester_id: 6,
          classes: [
            {
              nome: "Gerenciamento da Cadeia de Suprimentos",
            },
            {
              nome: "Comércio Exterior",
            },
            {
              nome: "Pesquisa Operacional",
            },
            {
              nome: "Estratégia Competitiva e Corporativa",
            },
            {
              nome: "Modelos de Análise de Decisões",
            },
            {
              nome: "Projeto Interdisciplinar II",
            },
            {
              nome: "Viabilidade Econômico Financeira de Negócios",
            },
            {
              nome: "Eletiva II",
            },
          ],
        },
        {
          semester_id: 7,
          classes: [
            {
              nome: "Gestão da Qualidade e Produtividade",
            },
            {
              nome: "TCC I",
            },
            {
              nome: "Liderança e Gestão por Competência",
            },
            {
              nome: "Avaliação de Empresa para M&A",
            },
            {
              nome: "Empreendedorismo",
            },
            {
              nome: "Gestão do Conhecimento",
            },
            {
              nome: "Responsabilidade Social e Ambiental",
            },
          ],
        },
        {
          semester_id: 8,
          classes: [
            {
              nome: "Gestão do Relacionamento Público e Privado",
            },
            {
              nome: "Jogos Empresariais",
            },
            {
              nome: "TCC II",
            },
            {
              nome: "Tópicos Avançados de Gestão de Projetos",
            },
            {
              nome: "Práticas de Gestão Contemporânea e Internacionalização de Negócios",
            },
            {
              nome: "Gestão da Inovação",
            },
          ],
        },
      ],
    },
    {
      course_id: 2,
      course_name: "Engenharia de Alimentos",
      course_semesters: [
        {
          semester_id: 1,
          classes: [
            { nome: "ALGORITMO E INFORMÁTICA" },
            { nome: "ÁLGEBRA LINEAR E GEOMETRIA ANALÍTICA" },
            { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I" },
            { nome: "CIÊNCIA DO AMBIENTE E DESENVOLVIMENTO SUSTENTÁVEL" },
            { nome: "FÍSICA GERAL E EXPERIMENTAL I" },
            { nome: "INTRODUÇÃO À ENGENHARIA DE ALIMENTOS" },
            { nome: "METODOLOGIA CIENTÍFICA" },
            { nome: "MICROBIOLOGIA GERAL" },
            { nome: "QUÍMICA GERAL" },
          ],
        },
        {
          semester_id: 2,
          classes: [
            { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II" },
            { nome: "CIÊNCIA DOS MATERIAIS" },
            { nome: "ÉTICA E CIDADANIA" },
            { nome: "FÍSICO-QUÍMICA" },
            { nome: "FÍSICA GERAL E EXPERIMENTAL II" },
            { nome: "MECÂNICA GERAL" },
            { nome: "MICROBIOLOGIA DE ALIMENTOS" },
            { nome: "QUÍMICA ORGÂNICA" },
          ],
        },
        {
          semester_id: 3,
          classes: [
            { nome: "CÁLCULO DIFERENCIAL E INTEGRAL III" },
            { nome: "CÁLCULO NUMÉRICO" },
            { nome: "ELETRICIDADE APLICADA" },
            { nome: "ESTATÍSTICA BÁSICA" },
            { nome: "FUNDAMENTOS DE TECNOLOGIA DE ALIMENTOS" },
            { nome: "HIGIENE E LEGISLAÇÃO" },
            { nome: "MECÂNICA DOS SÓLIDOS" },
            { nome: "QUÍMICA ANALÍTICA" },
            { nome: "QUÍMICA DE ALIMENTOS I" },
            { nome: "ELETIVA I" },
          ],
        },
        {
          semester_id: 4,
          classes: [
            { nome: "BIOQUÍMICA DE ALIMENTOS" },
            { nome: "ELETROTÉCNICA E INSTALAÇÕES ELÉTRICAS" },
            { nome: "ESTATÍSTICA APLICADA" },
            { nome: "FENÔMENOS DE TRANSPORTE" },
            { nome: "GESTÃO AMBIENTAL E TRATAMENTO DE RESÍDUOS" },
            { nome: "QUÍMICA DE ALIMENTOS II" },
            { nome: "TERMODINÂMICA" },
          ],
        },
        {
          semester_id: 5,
          classes: [
            { nome: "ADMINISTRAÇÃO ESTRATÉGICA" },
            { nome: "ANÁLISE SENSORIAL" },
            { nome: "EMBALAGENS PARA ALIMENTOS" },
            { nome: "ENGENHARIA BIOQUÍMICA" },
            { nome: "EXPRESSÃO GRÁFICA" },
            { nome: "NUTRIÇÃO" },
            { nome: "OPERAÇÕES UNITÁRIAS I" },
            { nome: "REFRIGERAÇÃO" },
          ],
        },
        {
          semester_id: 6,
          classes: [
            { nome: "ECONOMIA" },
            { nome: "GESTÃO DA QUALIDADE E SEGURANÇA DOS ALIMENTOS" },
            { nome: "GESTÃO DE CUSTOS" },
            { nome: "OPERAÇÕES UNITÁRIAS II" },
            { nome: "TECNOLOGIA DE CARNES, PESCADOS E OVOS" },
            { nome: "TECNOLOGIA DE LEITE E CAFÉ" },
            { nome: "TECNOLOGIA DE ÓLEOS E GORDURAS VEGETAIS" },
            { nome: "ELETIVA II" },
          ],
        },
        {
          semester_id: 7,
          classes: [
            { nome: "DESENVOLVIMENTO DE PRODUTOS I" },
            { nome: "GESTÃO DE PROJETOS" },
            { nome: "INSTALAÇÕES INDUSTRIAIS" },
            { nome: "INSTRUMENTAÇÃO E CONTROLE DE PROCESSOS" },
            { nome: "TECNOLOGIA DE FRUTAS E HORTALIÇAS E PRODUTOS AÇUCARADOS" },
            { nome: "TECNOLOGIA DE PANIFICAÇÃO E MASSAS ALIMENTÍCIAS" },
          ],
        },
        {
          semester_id: 8,
          classes: [
            { nome: "DESENVOLVIMENTO DE PRODUTOS II" },
            { nome: "ECONOMIA DE NEGÓCIOS E MODELO E ANÁLISE DE DECISÃO" },
            { nome: "GESTÃO EMPREENDEDORA" },
            { nome: "TECNOLOGIA DE BEBIDAS" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "PLANEJAMENTO E PROJETOS INDUSTRIAIS" },
            { nome: "TCC I" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            { nome: "TCC II" },
          ],
        },
      ],
    },
    {
      course_id: 3,
      course_name: "Engenharia de Controle e Automação",
      course_semesters: [
        {
          semester_id: 1,
          classes: [
            { nome: "ALGORITMO E INFORMÁTICA" },
            { nome: "ÁLGEBRA LINEAR E GEOMETRIA ANALÍTICA" },
            { nome: "CÁLCULO DIFERENCIAL E INTEGRAL I" },
            { nome: "CIÊNCIAS DO AMBIENTE E DESENVOLVIMENTO SUSTENTÁVEL" },
            { nome: "EXPRESSÃO GRÁFICA" },
            { nome: "FÍSICA GERAL E EXPERIMENTAL I" },
            { nome: "INTRODUÇÃO À ENGENHARIA DE CONTROLE E AUTOMAÇÃO" },
            { nome: "SISTEMAS DIGITAIS" },
          ],
        },
        {
          semester_id: 2,
          classes: [
            { nome: "CÁLCULO DIFERENCIAL E INTEGRAL II" },
            { nome: "ELETRICIDADE APLICADA" },
            { nome: "FÍSICA GERAL E EXPERIMENTAL II" },
            { nome: "GESTÃO DE PROJETOS" },
            { nome: "PROJETO INTEGRADOR I" },
            { nome: "QUÍMICA GERAL" },
            { nome: "TECNOLOGIA MECÂNICA APLICADA" },
          ],
        },
        {
          semester_id: 3,
          classes: [
            { nome: "CIÊNCIA DOS MATERIAIS" },
            { nome: "ELETROTÉCNICA E INSTALAÇÕES ELÉTRICAS" },
            { nome: "ESTATÍSTICA BÁSICA" },
            { nome: "GESTÃO DE CUSTOS" },
            { nome: "MECÂNICA GERAL" },
            { nome: "OPERAÇÕES DE MANUFATURA" },
            { nome: "PROGRAMAÇÃO VISUAL E BANCO DE DADOS" },
            { nome: "ELETIVA I" },
          ],
        },
        {
          semester_id: 4,
          classes: [
            { nome: "AUTOMAÇÃO + CLP" },
            { nome: "CNC" },
            { nome: "ELETRÔNICA ANALÓGICA" },
            { nome: "MECÂNICA DOS SÓLIDOS" },
            { nome: "METODOLOGIA CIENTÍFICA E TECNOLÓGICA" },
            { nome: "PROJETO INTEGRADOR II" },
            { nome: "SISTEMAS MICROCONTROLADOS" },
          ],
        },
        {
          semester_id: 5,
          classes: [
            { nome: "CÁLCULO AVANÇADO" },
            { nome: "ELETRÔNICA INDUSTRIAL" },
            { nome: "ÉTICA E CIDADANIA" },
            { nome: "FENÔMENOS DE TRANSPORTE" },
            { nome: "GESTÃO DA MANUTENÇÃO" },
            { nome: "GESTÃO DA QUALIDADE" },
            { nome: "ROBÓTICA" },
          ],
        },
        {
          semester_id: 6,
          classes: [
            { nome: "CAM" },
            { nome: "HIDRÁULICA INDUSTRIAL" },
            { nome: "INSTRUMENTAÇÃO E SENSORES" },
            { nome: "MODELAGEM DE SISTEMAS DINÂMICOS" },
            { nome: "PROCESSOS DE FABRICAÇÃO" },
            { nome: "PROJETO INTEGRADOR III" },
            { nome: "ELETIVA II" },
          ],
        },
        {
          semester_id: 7,
          classes: [
            { nome: "ADMINISTRAÇÃO DA PRODUÇÃO" },
            { nome: "COMUNICAÇÃO EMPRESARIAL" },
            { nome: "CONTROLE E SERVOMECANISMO" },
            { nome: "GESTÃO DE PESSOAS" },
            { nome: "GESTÃO EMPREENDEDORA E MODELO DE NEGÓCIOS" },
            { nome: "SISTEMA SUPERVISÓRIO E REDES" },
            { nome: "SISTEMAS TÉRMICOS" },
          ],
        },
        {
          semester_id: 8,
          classes: [
            { nome: "CONTROLE AVANÇADO" },
            { nome: "DIREITO E LEGISLAÇÃO" },
            { nome: "ESTRATÉGIA E SIMULAÇÃO EMPRESARIAL" },
            { nome: "INTELIGÊNCIA ARTIFICIAL" },
            { nome: "PROCESSOS METALÚRGICOS" },
            { nome: "PROJETO INTEGRADOR IV" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "CONTROLE DISCRETO" },
            { nome: "SISTEMAS EMBARCADOS" },
            { nome: "TCC I" },
            { nome: "TÓPICOS ESPECIAIS EM ENGENHARIA" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            { nome: "CIÊNCIA DE DADOS" },
            { nome: "PROJETO DE MANUFATURA INTEGRADA POR COMPUTADOR" },
            { nome: "TCC II" },
          ],
        },
      ],
    },
    {
      course_id: 4,
      course_name: "Engenharia de Computação",
      course_semesters: [
        {
          semester_id: 1,
          classes: [
            { nome: "Álgebra Linear e Geometria Analítica" },
            { nome: "Algoritmos I" },
            { nome: "Cálculo Diferencial e Integral I" },
            { nome: "Ética e Cidadania" },
            { nome: "Introdução à Engenharia de Computação" },
            { nome: "Química e Ciência dos Materiais" },
          ],
        },
        {
          semester_id: 2,
          classes: [
            { nome: "Algoritmos II" },
            { nome: "Banco de Dados I" },
            { nome: "Cálculo Diferencial e Integral II" },
            { nome: "Eletricidade Aplicada" },
            { nome: "Física Geral e Experimental I" },
          ],
        },
        {
          semester_id: 3,
          classes: [
            { nome: "Banco de Dados II" },
            { nome: "Cálculo Avançado" },
            { nome: "Eletrônica Analógica" },
            { nome: "Física Geral e Experimental II" },
            { nome: "Metodologia Científica" },
            { nome: "Programação Orientada a Objetos" },
            { nome: "Eletiva I" },
          ],
        },
        {
          semester_id: 4,
          classes: [
            { nome: "Desenho Digital" },
            { nome: "Eletromagnetismo" },
            { nome: "Eletrônica Digital" },
            { nome: "Estruturas de Dados" },
            { nome: "Mecânica Geral" },
          ],
        },
        {
          semester_id: 5,
          classes: [
            { nome: "Controle e Automação" },
            { nome: "Fenômenos de Transporte" },
            { nome: "Linguagem de Programação I" },
            { nome: "Mecânica dos Sólidos" },
            { nome: "Sistemas Embarcados" },
          ],
        },
        {
          semester_id: 6,
          classes: [
            { nome: "Administração e Estratégia Empresarial" },
            { nome: "Arquitetura de Computadores" },
            { nome: "Linguagem de Programação II" },
            { nome: "Linguagens Formais e Autômatos" },
            { nome: "Modelagem de Software" },
            { nome: "Processamento de Sinais" },
            { nome: "Eletiva II" },
          ],
        },
        {
          semester_id: 7,
          classes: [
            { nome: "Compiladores" },
            { nome: "Comunicação de Dados" },
            { nome: "Economia" },
            { nome: "Gestão de Custos" },
            { nome: "Programação Mobile" },
            { nome: "Sistemas Reconfiguráveis" },
          ],
        },
        {
          semester_id: 8,
          classes: [
            { nome: "Engenharia de Software" },
            { nome: "Estatística" },
            { nome: "Gestão de Projetos na Engenharia de Computação" },
            { nome: "Pesquisa Operacional" },
            { nome: "Redes de Computadores I" },
            { nome: "Sistemas Operacionais" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "Arquitetura de Software" },
            { nome: "Empreendedorismo, Inovação e Modelagem de Negócios" },
            { nome: "Gestão da Qualidade" },
            { nome: "Inteligência Artificial" },
            { nome: "Qualidade de Software" },
            { nome: "Redes de Computadores II" },
            { nome: "TCC I" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            { nome: "Análise de Dados" },
            {
              nome: "Ciências do Ambiente e Desenvolvimento Sustentável",
            },
            { nome: "Direito Digital" },
            { nome: "Gestão da Tecnologia da Informação" },
            { nome: "Segurança da Informação" },
            { nome: "Sistemas Distribuídos" },
            { nome: "TCC II" },
          ],
        },
      ],
    },
  ];

  const [cursos, setCursos] = useState<string[] | []>([]);
  const [semestres, setSemestres] = useState<number[] | undefined>(undefined);
  const [disciplinas, setDisciplinas] = useState<IDisciplina[] | []>([]);
  const [showInputPlaceholder, setShowInputPlaceholder] =
    useState<boolean>(true);

  function getCursos(): void {
    setCursos(grade.map((curso) => curso.course_name));
  }

  function getSemestres(nomeCurso: string): void {
    const semestresDoCurso = grade.find(
      (curso) => curso.course_name === nomeCurso
    )?.course_semesters;
    const semestres: number[] = [];
    semestresDoCurso?.forEach((semestre) =>
      semestres.push(semestre.semester_id)
    );
    setSemestres(semestres);
  }

  function getDisciplinas(nomeCurso: string, semestre: number) {
    const disciplinas = grade.find((curso) => curso.course_name === nomeCurso)
      ?.course_semesters[semestre - 1];
    setDisciplinas(disciplinas!.classes);
  }

  // função para obter as disciplinas disponíveis para DP (todas as disciplinas anteriores ao semestre selecionado)
  function getDisciplinasAnteriores(nomeCurso: string, semestre: number) {
    const disciplinas = [];
    const curso = grade.find((curso) => curso.course_name === nomeCurso);
    for (let i = 0; i < semestre - 1; i++) {
      disciplinas.push(curso!.course_semesters[i]?.classes);
    }

    return disciplinas;
  }

  return (
    <MainContext.Provider
      value={{
        cursos,
        getCursos,
        getSemestres,
        semestres,
        disciplinas,
        getDisciplinas,
        showInputPlaceholder,
        setShowInputPlaceholder,
        getDisciplinasAnteriores,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
