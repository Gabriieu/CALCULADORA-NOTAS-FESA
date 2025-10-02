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
              nome: "Teoria Geral de Administração",
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
              nome: "Direito Aplicado à Gestão",
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
              nome: "Administração de Sistema de Informação",
            },
            {
              nome: "Contabilidade para Administradores",
            },
            {
              nome: "Projeto Interdisciplinar",
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
              nome: "Gerenciamento de Cadeia de Suprimentos",
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
              nome: "Modelos de Análises de Decisões",
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
              nome: "Projeto Final de Curso I",
            },
            {
              nome: "Liderança e Gestão por Competência",
            },
            {
              nome: "Avaliação de Empresas para M&A",
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
              nome: "Estratégia e Simulação Empresarial",
            },
            {
              nome: "TCC II",
            },
            {
              nome: "Tópicos Avançados de Gestão de Projetos",
            },
            {
              nome: "Tópicos Avançados de Administração",
            },
            {
              nome: "Estudo das Organizações e suas Culturas",
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
            { nome: "CIÊNCIAS AMB. E DES. SUST" },
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
            { nome: "FISICO-QUÍMICA" },
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
            { nome: "QUÍMICA DOS ALIMENTOS I" },
            { nome: "ELETIVA I" },
          ],
        },
        {
          semester_id: 4,
          classes: [
            { nome: "BIOQUÍMICA DOS ALIMENTOS" },
            { nome: "ELETROTÉCNICA E INSTALAÇÕES ELÉTTRICAS" },
            { nome: "ESTATÍSTICA APLICADA" },
            { nome: "FENÔMENOS DE TRANSPORTE" },
            { nome: "GESTÃO AMBIENTAL E TRATAMENTO DE RESÍDUOS" },
            { nome: "QUÍMICA DOS ALIMENTOS II" },
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
            { nome: "TECNOLOGIA DE PANIFICAÇÃO" },
          ],
        },
        {
          semester_id: 8,
          classes: [
            { nome: "COMUNICAÇÃO EMPRESARIAL" },
            { nome: "CONTAB. E CUSTOS" },
            { nome: "GESTÃO AMBIENTAL" },
            { nome: "METODOLOGIA CIENTÍFICA" },
            { nome: "TECNOLOGIA DE BEBIDAS" },
            { nome: "TECNOLOGIA DE ÓLEOS" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "GESTÃO DE PROJETOS" },
            { nome: "PLANEJAMENTO E PROJETOS INDUSTRIAIS" },
            { nome: "PRINCÍPIOS DE ADMINISTRAÇÃO" },
            { nome: "TCC I" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            { nome: "ECONOMIA INDUSTRIAL" },
            { nome: "GESTÃO EMPREENDEDORA" },
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
            { nome: "CIÊNCIAS DO AMBIENTE DES. SUSTENTÁVEL" },
            { nome: "EXPRESSÃO GRÁFICA" },
            { nome: "FÍSICA GERAL E EXPERIMENTAL I" },
            { nome: "INTRODUÇÃO À ENG. CONTROLE E AUTOMAÇÃO" },
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
            { nome: "TECNOLOGIA MECANICA APLICADA" },
          ],
        },
        {
          semester_id: 3,
          classes: [
            { nome: "CIÊNCIA DOS MATERIAIS" },
            { nome: "ELETROTÉCNICA E INSTALAÇÕES ELÉTRICAS" },
            { nome: "ESTATÍSTICA BÁSICA" },
            { nome: "GESTÃO DE CUSTO" },
            { nome: "MECÂNICA GERA" },
            { nome: "OPERAÇÕES DE MANUFATURA" },
            { nome: "PROGRAMAÇÃO VISUAL E BANCO DE DADOS" },
            { nome: "ELETIVA I" },
          ],
        },
        {
          semester_id: 4,
          classes: [
            { nome: "AUTOMAÇÃO+CLP" },
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
            { nome: "GESTÃO EMPR. E NOGÓCIOS" },
            { nome: "SISTEMAS SUPERV. E REDES" },
            { nome: "SISTEMAS TÉRMICOS" },
          ],
        },
        {
          semester_id: 8,
          classes: [
            { nome: "CONTABILIDADE E CUSTOS" },
            { nome: "GESTÃO EMPREENDEDORA" },
            { nome: "GESTÃO DE PROJ. ENG CONTROLE E AUTOMAÇÃO" },
            { nome: "METODOLOGIA DO TRABALHO CIENTÍFICO" },
            { nome: "PROCESSOS METALÚRGICOS" },
            { nome: "SISTEMAS DE CONTROLE DISCRETO" },
            { nome: "SISTEMAS TÉRMICOS" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "SISTEMAS SUPERVISÓRIOS" },
            { nome: "TCC I" },
            { nome: "VIBRAÇÕES MECÂNICAS" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            { nome: "INTELIGÊNCIA ARTIFICIAL" },
            { nome: "TCC II" },
            { nome: "TÓPICOS ESPECIAIS DE ENGENHARIA" },
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
            { nome: "Algorítmos I" },
            { nome: "Cálculo Diferencial e Integral I" },
            { nome: "Ética e Cidadania" },
            { nome: "Introdução à Engenharia de Computação" },
            { nome: "Química e Ciência dos Materiais" },
          ],
        },
        {
          semester_id: 2,
          classes: [
            { nome: "Algorítmos II" },
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
            { nome: "Estrutura de Dados" },
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
            { nome: "ELETIVA II" },
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
            { nome: "Gestão de Projetos na Eng. de Computação" },
            { nome: "Pesquisa Operacional" },
            { nome: "Redes de Computadores I" },
            { nome: "Sistemas Operacionais" },
          ],
        },
        {
          semester_id: 9,
          classes: [
            { nome: "Gestão da Tecnologia da Informação" },
            { nome: "Gestão Empreendedora" },
            { nome: "Inteligência Artificial" },
            { nome: "Serviços de Rede" },
            { nome: "Sistemas Distribuídos" },
            { nome: "TCC I" },
          ],
        },
        {
          semester_id: 10,
          classes: [
            {
              nome: "Ciências do Ambiente e Desenvolvimento Sustentável",
            },
            { nome: "Direito Digital" },
            { nome: "Gestão Estratégica da Informação" },
            { nome: "Programação Mobile" },
            { nome: "TCC II" },
            { nome: "Tópicos Avançados de Redes" },
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
