import type { jsPDF } from "jspdf";
import { ICurso } from "../../context/interfaces/interfaces";
import {
  INotasDisciplina,
  INotasSemestre,
  lerNotasDoCurso,
} from "./notas-salvas";
import {
  MARGEM,
  PAGINA_LARGURA,
  RELATORIO_COR,
  RODAPE_Y,
  SITE_URL,
  desenharCabecalho,
  desenharCartoes,
  desenharFaixas,
  desenharRodape,
  escreverTrechos,
  type RGB,
} from "./relatorio-pdf";

const TITULO_RELATORIO = "Relatório Geral de Notas";

// mesmas cores das notas na tela
const COR_NOTA_AZUL: RGB = [0, 123, 255];
const COR_NOTA_VERMELHA: RGB = [220, 53, 69];

// colunas: disciplina, (N1, N2, média) do 1º bimestre, (N1, N2, média) do 2º e média final
const LARGURAS = [66, 16, 16, 16, 16, 16, 16, 18];
const COLUNAS_X = LARGURAS.reduce(
  (xs, largura) => [...xs, xs[xs.length - 1] + largura],
  [MARGEM],
);
const TABELA_LARGURA = COLUNAS_X[COLUNAS_X.length - 1] - MARGEM;

const TABELA_CABECALHO_ALTURA = 11;
const LINHA_ALTURA_MIN = 6.2;
const LINHA_ENTRE_LINHAS = 3.2;
const CELULA_PADDING = 2;
const DP_ETIQUETA_LARGURA = 5.4;
const SEMESTRE_TITULO_ALTURA = 8;
const SEMESTRE_ESPACO = 6;

// onde o conteúdo começa nas páginas seguintes à primeira (abaixo do cabeçalho corrido)
const CONTINUACAO_Y = 22;
const LIMITE_Y = RODAPE_Y - 5;

interface ILinha {
  disciplina: INotasDisciplina;
  nome: string[];
  altura: number;
}

// o tamanho e o estilo da fonte precisam estar definidos antes de medir o nome
function medirLinha(pdf: jsPDF, disciplina: INotasDisciplina): ILinha {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);

  const recuo = disciplina.dp ? DP_ETIQUETA_LARGURA + 1.5 : 0;
  const nome: string[] = pdf.splitTextToSize(
    disciplina.nome.toUpperCase(),
    LARGURAS[0] - CELULA_PADDING * 2 - recuo,
  );

  return {
    disciplina,
    nome,
    altura: Math.max(
      LINHA_ALTURA_MIN,
      (nome.length - 1) * LINHA_ENTRE_LINHAS + 6.2,
    ),
  };
}

function desenharTituloSemestre(
  pdf: jsPDF,
  { semestre, formativa }: INotasSemestre,
  y: number,
  continuacao: boolean,
) {
  const baseline = y + 3.6;

  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(MARGEM, y, 1.2, 4.6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  pdf.text(
    `${semestre}º semestre${continuacao ? " (continuação)" : ""}`,
    MARGEM + 3.5,
    baseline,
  );

  // a formativa vale para todas as disciplinas do semestre, por isso fica no título
  const rotulo = "Nota formativa: ";
  const valor = formativa === null ? "não informada" : String(formativa);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  const rotuloLargura = pdf.getTextWidth(rotulo);
  pdf.setFont("helvetica", "bold");
  const valorLargura = pdf.getTextWidth(valor);

  escreverTrechos(
    pdf,
    [
      { texto: rotulo, cor: RELATORIO_COR.suave },
      { texto: valor, negrito: true, cor: RELATORIO_COR.titulo },
    ],
    PAGINA_LARGURA - MARGEM - rotuloLargura - valorLargura,
    baseline,
  );
}

function desenharCabecalhoTabela(pdf: jsPDF, y: number) {
  const meio = TABELA_CABECALHO_ALTURA / 2;
  const centro = (de: number, ate: number) =>
    (COLUNAS_X[de] + COLUNAS_X[ate]) / 2;

  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(MARGEM, y, TABELA_LARGURA, TABELA_CABECALHO_ALTURA, "F");

  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.2);
  [1, 4, 7].forEach((i) =>
    pdf.line(COLUNAS_X[i], y, COLUNAS_X[i], y + TABELA_CABECALHO_ALTURA),
  );
  [2, 3, 5, 6].forEach((i) =>
    pdf.line(COLUNAS_X[i], y + meio, COLUNAS_X[i], y + TABELA_CABECALHO_ALTURA),
  );
  pdf.line(COLUNAS_X[1], y + meio, COLUNAS_X[7], y + meio);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.5);
  pdf.setTextColor(...RELATORIO_COR.branco);

  const texto = (valor: string, x: number, yTexto: number) =>
    pdf.text(valor, x, yTexto, { align: "center", baseline: "middle" });

  texto("DISCIPLINA", centro(0, 1), y + meio);
  texto("1º BIMESTRE", centro(1, 4), y + meio / 2);
  texto("2º BIMESTRE", centro(4, 7), y + meio / 2);
  texto("MÉDIA", centro(7, 8), y + meio - 1.3);
  texto("FINAL", centro(7, 8), y + meio + 1.3);

  ["N1", "N2", "MÉDIA B1", "N1", "N2", "MÉDIA B2"].forEach((rotulo, i) =>
    texto(rotulo, centro(i + 1, i + 2), y + meio + meio / 2),
  );
}

function desenharLinha(pdf: jsPDF, y: number, linha: ILinha, zebra: boolean) {
  const { disciplina, nome, altura } = linha;
  const centroY = y + altura / 2;

  const fundo: RGB = zebra ? RELATORIO_COR.fundo : RELATORIO_COR.branco;

  pdf.setFillColor(...fundo);
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.2);
  pdf.rect(MARGEM, y, TABELA_LARGURA, altura, "FD");
  COLUNAS_X.slice(1, -1).forEach((x) => pdf.line(x, y, x, y + altura));

  // nome da disciplina, centralizado na altura da linha
  const primeiraLinhaY = centroY - ((nome.length - 1) * LINHA_ENTRE_LINHAS) / 2;
  const nomeX =
    MARGEM +
    CELULA_PADDING +
    (disciplina.dp ? DP_ETIQUETA_LARGURA + 1.5 : 0);

  if (disciplina.dp) {
    pdf.setFillColor(...RELATORIO_COR.primaria);
    pdf.roundedRect(
      MARGEM + CELULA_PADDING,
      primeiraLinhaY - 1.5,
      DP_ETIQUETA_LARGURA,
      3,
      0.8,
      0.8,
      "F",
    );
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5.5);
    pdf.setTextColor(...RELATORIO_COR.branco);
    pdf.text(
      "DP",
      MARGEM + CELULA_PADDING + DP_ETIQUETA_LARGURA / 2,
      primeiraLinhaY,
      { align: "center", baseline: "middle" },
    );
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  nome.forEach((trecho, i) =>
    pdf.text(trecho, nomeX, primeiraLinhaY + i * LINHA_ENTRE_LINHAS, {
      baseline: "middle",
    }),
  );

  const { b1, b2, mediaFinal } = disciplina;
  const celulas: { valor: number | null; media: boolean }[] = [
    { valor: b1.n1, media: false },
    { valor: b1.n2, media: false },
    { valor: b1.media, media: true },
    { valor: b2.n1, media: false },
    { valor: b2.n2, media: false },
    { valor: b2.media, media: true },
    { valor: mediaFinal, media: true },
  ];

  celulas.forEach(({ valor, media }, i) => {
    // as médias são pintadas sobre o valor já arredondado, como na tela
    const vermelho =
      valor !== null && (media ? Number(valor.toFixed(1)) : valor) < 5;

    pdf.setFont("helvetica", media && valor !== null ? "bold" : "normal");
    pdf.setFontSize(7.5);
    pdf.setTextColor(
      ...(valor === null
        ? RELATORIO_COR.suave
        : vermelho
          ? COR_NOTA_VERMELHA
          : COR_NOTA_AZUL),
    );
    pdf.text(
      valor === null ? "—" : media ? valor.toFixed(1) : String(valor),
      (COLUNAS_X[i + 1] + COLUNAS_X[i + 2]) / 2,
      centroY,
      { align: "center", baseline: "middle" },
    );
  });
}

// devolve o y logo abaixo da tabela do semestre
function desenharSemestre(
  pdf: jsPDF,
  semestre: INotasSemestre,
  yInicial: number,
): number {
  const linhas = semestre.disciplinas.map((d) => medirLinha(pdf, d));
  let y = yInicial;

  // título e cabeçalho da tabela nunca ficam sozinhos no fim de uma página
  const primeiraLinha = linhas[0]?.altura ?? LINHA_ALTURA_MIN;
  if (
    y + SEMESTRE_TITULO_ALTURA + TABELA_CABECALHO_ALTURA + primeiraLinha >
    LIMITE_Y
  ) {
    pdf.addPage();
    y = CONTINUACAO_Y;
  }

  const abrirTabela = (continuacao: boolean) => {
    desenharTituloSemestre(pdf, semestre, y, continuacao);
    y += SEMESTRE_TITULO_ALTURA;
    desenharCabecalhoTabela(pdf, y);
    y += TABELA_CABECALHO_ALTURA;
  };

  abrirTabela(false);

  linhas.forEach((linha, i) => {
    if (y + linha.altura > LIMITE_Y) {
      pdf.addPage();
      y = CONTINUACAO_Y;
      abrirTabela(true);
    }

    desenharLinha(pdf, y, linha, i % 2 === 1);
    y += linha.altura;
  });

  return y;
}

// rodapé e faixas de todas as páginas, desenhados no fim porque só então se sabe o total
function acabarPaginas(pdf: jsPDF, curso: string) {
  const total = pdf.getNumberOfPages();

  for (let pagina = 1; pagina <= total; pagina++) {
    pdf.setPage(pagina);
    desenharFaixas(pdf);
    desenharRodape(pdf);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...RELATORIO_COR.suave);
    pdf.text(
      `Página ${pagina} de ${total}`,
      PAGINA_LARGURA - MARGEM,
      RODAPE_Y + 11.5,
      { align: "right" },
    );

    // a primeira página já tem o cabeçalho completo
    if (pagina === 1) continue;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...RELATORIO_COR.primaria);
    pdf.text("CALCULADORA DE NOTAS FESA", MARGEM, 12, { charSpace: 0.5 });

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...RELATORIO_COR.suave);
    pdf.text(curso, PAGINA_LARGURA - MARGEM, 12, { align: "right" });

    pdf.setDrawColor(...RELATORIO_COR.borda);
    pdf.setLineWidth(0.3);
    pdf.line(MARGEM, 15, PAGINA_LARGURA - MARGEM, 15);
  }
}

// relatório com todas as notas salvas do curso, um bloco por semestre
export async function salvarRelatorioCurso(curso: ICurso) {
  const semestres = lerNotasDoCurso(curso);
  if (semestres.length === 0) {
    throw new Error("Não há notas salvas para este curso");
  }

  // imports dinamicos para amenizar sobrecarregamento
  const [{ default: jsPDF }, { default: logo }] = await Promise.all([
    import("jspdf"),
    import("../images/logo.png"),
  ]);

  const nomeCurso = curso.course_name;
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setProperties({
    title: `${TITULO_RELATORIO} - ${nomeCurso}`,
    subject: "Notas e médias por disciplina e semestre",
    author: "Calculadora de Notas FESA",
    creator: SITE_URL,
  });

  await desenharCabecalho(pdf, logo, TITULO_RELATORIO, [
    { texto: "Curso: ", cor: RELATORIO_COR.suave },
    { texto: nomeCurso, negrito: true, cor: RELATORIO_COR.titulo },
  ]);

  desenharCartoes(
    pdf,
    [
      { rotulo: "Data de geração", valor: new Date().toLocaleString() },
      {
        rotulo: "Semestres com notas",
        valor: `${semestres.length} de ${curso.course_semesters.length}`,
      },
    ],
    47,
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(...RELATORIO_COR.suave);
  pdf.text(
    "—  nota não informada   ·   DP = dependência   ·   a média final só é calculada com notas nos dois bimestres",
    MARGEM,
    73,
  );

  let y = 80;
  semestres.forEach((semestre) => {
    y = desenharSemestre(pdf, semestre, y) + SEMESTRE_ESPACO;
  });

  acabarPaginas(pdf, nomeCurso);

  pdf.save(`${nomeCurso} - Relatório Geral.pdf`);
}
