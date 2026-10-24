import { useContext, useEffect, useState } from "react";
import {
  FaChevronUp,
  FaFileExport,
  FaFileImage,
  FaFilePdf,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ICurso } from "../../context/interfaces/interfaces";
import { MainContext } from "../../context/main.context";
import { cursoTemNotas } from "../../shared/utils/notas-salvas";
import {
  AVISO_RODAPE,
  MARGEM,
  PAGINA_LARGURA,
  RELATORIO_COR,
  RODAPE_Y,
  SITE_URL,
  carregarImagem,
  desenharCabecalho,
  desenharCartoes,
  desenharFaixas,
  desenharRodape,
  type RGB,
} from "../../shared/utils/relatorio-pdf";
import { MenuBackdropStyle, PdfGeneratorStyle } from "./pdf-generator.style";

// "pdf" e "imagem" reproduzem a tabela do semestre na tela; "relatorio" reúne todas as notas salvas do curso
type FormatoTabela = "pdf" | "imagem";
type Formato = FormatoTabela | "relatorio";

interface IPdfGeneratorProps {
  curso: string;
  semestre: number;
}

interface IRelatorio {
  tabela: HTMLCanvasElement;
  logo: string;
  curso: string;
  semestre: number;
  formativa: string;
}

const MENSAGENS: Record<
  Formato,
  { pending: string; success: string; error: string }
> = {
  pdf: {
    pending: "Estamos gerando seu PDF, aguarde um instante...",
    success: "PDF gerado com sucesso! 🎉",
    error:
      "Ops... não foi possível gerar o PDF 😕. Isso pode acontecer devido a alta demanda no servidor. Tente novamente em alguns instantes.",
  },
  imagem: {
    pending: "Estamos gerando sua imagem, aguarde um instante...",
    success: "Imagem gerada com sucesso! 🎉",
    error:
      "Ops... não foi possível gerar a imagem 😕. Isso pode acontecer devido a alta demanda no servidor. Tente novamente em alguns instantes.",
  },
  relatorio: {
    pending: "Estamos gerando o relatório do curso, aguarde um instante...",
    success: "Relatório gerado com sucesso! 🎉",
    error:
      "Ops... não foi possível gerar o relatório 😕. Tente novamente em alguns instantes.",
  },
};

async function capturarTabela(): Promise<HTMLCanvasElement> {
  const { default: html2canvas } = await import("html2canvas");
  const tabela = document.getElementById("table-container");

  if (!tabela) throw new Error("Tabela não encontrada");

  return html2canvas(tabela, {
    scale: 2,
    useCORS: true,
    windowWidth: 1024,
    scrollX: 0,
    scrollY: -window.scrollY,
    // o relatório é sempre claro e não herda o estilo da coluna "Disciplina" fixa
    onclone: (clonedDoc, clonedTabela) => {
      clonedDoc.documentElement.setAttribute("data-theme", "light");
      const tabelaClonada = clonedTabela.querySelector("table");
      tabelaClonada?.removeAttribute("data-disciplina-fixa");
      // as animações CSS recomeçam no clone: sem isto a tabela sai translúcida e reduzida no arquivo
      tabelaClonada?.style.setProperty("animation", "none");
      // o ícone de exame pisca e só faz sentido com o modal, que o arquivo não tem
      clonedTabela
        .querySelectorAll("[data-aviso-exame]")
        .forEach((aviso) => aviso.remove());
    },
  });
}

const TITULO_RELATORIO = "Relatório de Desempenho Semestral";

async function salvarPdf({
  tabela,
  logo,
  curso,
  semestre,
  formativa,
}: IRelatorio) {
  // import dinamico para amenizar sobrecarregamento
  const { default: jsPDF } = await import("jspdf");

  const imgData = tabela.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const contentWidth = PAGINA_LARGURA - MARGEM * 2;
  const imgProps = pdf.getImageProperties(imgData);

  pdf.setProperties({
    title: `${TITULO_RELATORIO} - ${curso} ${semestre}º semestre`,
    subject: "Notas e médias por disciplina",
    author: "Calculadora de Notas FESA",
    creator: SITE_URL,
  });

  desenharFaixas(pdf);

  await desenharCabecalho(pdf, logo, TITULO_RELATORIO, [
    { texto: "Curso: ", cor: RELATORIO_COR.suave },
    { texto: curso, negrito: true, cor: RELATORIO_COR.titulo },
    { texto: "   |   ", cor: RELATORIO_COR.borda },
    {
      texto: `${semestre}º semestre`,
      negrito: true,
      cor: RELATORIO_COR.titulo,
    },
  ]);

  desenharCartoes(
    pdf,
    [
      { rotulo: "Data de geração", valor: new Date().toLocaleString() },
      { rotulo: "Nota formativa", valor: formativa },
    ],
    47,
  );

  // TÍTULO DA SEÇÃO
  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(MARGEM, 74.2, 1.2, 4.6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  pdf.text("Desempenho por disciplina", MARGEM + 3.5, 77.8);

  // INSERE A TABELA CENTRALIZADA, EMOLDURADA
  const quadroY = 82;
  const quadroPadding = 2.5;
  const larguraMax = contentWidth - quadroPadding * 2;
  const alturaMax = RODAPE_Y - 5 - quadroY - quadroPadding * 2;

  // se a tabela for muito alta, reduz mantendo a proporção
  const escala = Math.min(
    larguraMax / imgProps.width,
    alturaMax / imgProps.height,
  );
  const imgWidth = imgProps.width * escala;
  const imgHeight = imgProps.height * escala;
  const quadroLargura = imgWidth + quadroPadding * 2;
  const quadroAltura = imgHeight + quadroPadding * 2;
  const quadroX = MARGEM + (contentWidth - quadroLargura) / 2;

  // sombra suave
  pdf.setFillColor(...RELATORIO_COR.sombra);
  pdf.roundedRect(
    quadroX + 0.5,
    quadroY + 0.7,
    quadroLargura,
    quadroAltura,
    2,
    2,
    "F",
  );

  pdf.setFillColor(...RELATORIO_COR.branco);
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(quadroX, quadroY, quadroLargura, quadroAltura, 2, 2, "FD");

  // sem o último argumento o jsPDF grava os pixels descomprimidos (~6MB para esta tabela, contra
  // ~140KB comprimida). "FAST" não perde qualidade e custa bem menos CPU que "SLOW" para ganhar
  // poucos KB
  pdf.addImage(
    imgData,
    "PNG",
    quadroX + quadroPadding,
    quadroY + quadroPadding,
    imgWidth,
    imgHeight,
    undefined,
    "FAST",
  );

  desenharRodape(pdf);

  pdf.save(`${curso} ${semestre}º Semestre.pdf`);
}

// mesmo layout do PDF, desenhado em um canvas. As medidas estão em mm (as
// mesmas do PDF) e o canvas é escalado para a tabela entrar sem redimensionar
async function salvarImagem({
  tabela,
  logo,
  curso,
  semestre,
  formativa,
}: IRelatorio) {
  const logoImg = await carregarImagem(logo);

  const larguraPagina = 210;
  const margem = 15;
  const larguraConteudo = larguraPagina - margem * 2;
  const quadroPadding = 2.5;
  const quadroY = 82;

  // px por mm: a tabela ocupa exatamente a área interna da moldura
  const mm = tabela.width / (larguraConteudo - quadroPadding * 2);
  const imgAltura = tabela.height / mm;
  const quadroAltura = imgAltura + quadroPadding * 2;
  // a página do PDF é fixa; a imagem acompanha a altura da tabela
  const rodapeY = quadroY + quadroAltura + 10;
  const alturaPagina = rodapeY + 25;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(larguraPagina * mm);
  canvas.height = Math.round(alturaPagina * mm);
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas indisponível");

  ctx.scale(mm, mm);
  ctx.textBaseline = "alphabetic";

  const fonte = "Arial, Helvetica, sans-serif";
  const rgb = ([r, g, b]: RGB) => `rgb(${r}, ${g}, ${b})`;

  // o tamanho é em pt (como no PDF), convertido para mm, a unidade do canvas
  const escrever = (
    texto: string,
    x: number,
    y: number,
    opcoes: {
      tamanho: number;
      cor: RGB;
      negrito?: boolean;
      alinhar?: CanvasTextAlign;
      charSpace?: number;
    },
  ) => {
    const { tamanho, negrito, alinhar = "left", charSpace = 0 } = opcoes;
    ctx.font = `${negrito ? "bold " : ""}${(tamanho * 25.4) / 72}px ${fonte}`;
    ctx.letterSpacing = `${charSpace}px`;
    ctx.textAlign = alinhar;
    ctx.fillStyle = rgb(opcoes.cor);
    ctx.fillText(texto, x, y);
    return ctx.measureText(texto).width;
  };

  const retangulo = (
    x: number,
    y: number,
    largura: number,
    altura: number,
    raio: number,
    preenchimento: RGB | null,
    borda: RGB | null = null,
  ) => {
    ctx.beginPath();
    ctx.roundRect(x, y, largura, altura, raio);
    if (preenchimento) {
      ctx.fillStyle = rgb(preenchimento);
      ctx.fill();
    }
    if (borda) {
      ctx.strokeStyle = rgb(borda);
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
  };

  const linhaHorizontal = (y: number) => {
    ctx.strokeStyle = rgb(RELATORIO_COR.borda);
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(margem, y);
    ctx.lineTo(larguraPagina - margem, y);
    ctx.stroke();
  };

  ctx.fillStyle = rgb(RELATORIO_COR.branco);
  ctx.fillRect(0, 0, larguraPagina, alturaPagina);

  // FAIXAS DE TOPO E BASE (espelhadas)
  ctx.fillStyle = rgb(RELATORIO_COR.profunda);
  ctx.fillRect(0, 0, larguraPagina, 3);
  ctx.fillRect(0, alturaPagina - 3, larguraPagina, 3);
  ctx.fillStyle = rgb(RELATORIO_COR.primaria);
  ctx.fillRect(0, 3, larguraPagina, 1.2);
  ctx.fillRect(0, alturaPagina - 4.2, larguraPagina, 1.2);

  // CABEÇALHO
  // a logo mantém a proporção original dentro de um quadrado de 24mm
  const logoBox = 24;
  const logoScale = Math.min(
    logoBox / logoImg.naturalWidth,
    logoBox / logoImg.naturalHeight,
  );
  const logoWidth = logoImg.naturalWidth * logoScale;
  const logoHeight = logoImg.naturalHeight * logoScale;
  ctx.drawImage(
    logoImg,
    margem,
    11 + (logoBox - logoHeight) / 2,
    logoWidth,
    logoHeight,
  );

  const textoX = margem + logoWidth + 6;

  escrever("CALCULADORA DE NOTAS FESA", textoX, 15.5, {
    tamanho: 7.5,
    cor: RELATORIO_COR.primaria,
    negrito: true,
    charSpace: 0.5,
  });
  escrever(TITULO_RELATORIO, textoX, 24, {
    tamanho: 18,
    cor: RELATORIO_COR.titulo,
    negrito: true,
  });

  let cursor = textoX;
  [
    { texto: "Curso: ", cor: RELATORIO_COR.suave, negrito: false },
    { texto: curso, cor: RELATORIO_COR.titulo, negrito: true },
    { texto: "   |   ", cor: RELATORIO_COR.borda, negrito: false },
    {
      texto: `${semestre}º semestre`,
      cor: RELATORIO_COR.titulo,
      negrito: true,
    },
  ].forEach(({ texto, cor, negrito }) => {
    cursor += escrever(texto, cursor, 31, { tamanho: 10.5, cor, negrito });
  });

  // linha inferior para separar o cabeçalho
  linhaHorizontal(40);

  // CARTÕES DE DADOS RESUMO
  const cartaoY = 47;
  const cartaoAltura = 20;
  const cartaoGap = 6;
  const cartaoLargura = (larguraConteudo - cartaoGap) / 2;

  [
    { rotulo: "Data de geração", valor: new Date().toLocaleString() },
    { rotulo: "Nota formativa", valor: formativa },
  ].forEach(({ rotulo, valor }, i) => {
    const x = margem + i * (cartaoLargura + cartaoGap);

    retangulo(
      x,
      cartaoY,
      cartaoLargura,
      cartaoAltura,
      2,
      RELATORIO_COR.fundo,
      RELATORIO_COR.borda,
    );
    retangulo(
      x + 4,
      cartaoY + 4.5,
      1,
      cartaoAltura - 9,
      0.5,
      RELATORIO_COR.primaria,
    );

    escrever(rotulo.toUpperCase(), x + 8, cartaoY + 8.2, {
      tamanho: 7.5,
      cor: RELATORIO_COR.suave,
      negrito: true,
      charSpace: 0.4,
    });
    escrever(valor, x + 8, cartaoY + 15, {
      tamanho: 12.5,
      cor: RELATORIO_COR.titulo,
      negrito: true,
    });
  });

  // TÍTULO DA SEÇÃO
  ctx.fillStyle = rgb(RELATORIO_COR.primaria);
  ctx.fillRect(margem, 74.2, 1.2, 4.6);
  escrever("Desempenho por disciplina", margem + 3.5, 77.8, {
    tamanho: 10,
    cor: RELATORIO_COR.titulo,
    negrito: true,
  });

  // TABELA EMOLDURADA, COM SOMBRA SUAVE
  retangulo(
    margem + 0.5,
    quadroY + 0.7,
    larguraConteudo,
    quadroAltura,
    2,
    RELATORIO_COR.sombra,
  );
  retangulo(
    margem,
    quadroY,
    larguraConteudo,
    quadroAltura,
    2,
    RELATORIO_COR.branco,
    RELATORIO_COR.borda,
  );
  ctx.drawImage(
    tabela,
    margem + quadroPadding,
    quadroY + quadroPadding,
    larguraConteudo - quadroPadding * 2,
    imgAltura,
  );

  // RODAPÉ
  linhaHorizontal(rodapeY);
  escrever(AVISO_RODAPE, larguraPagina / 2, rodapeY + 6.5, {
    tamanho: 7.5,
    cor: RELATORIO_COR.suave,
    alinhar: "center",
  });
  escrever(SITE_URL, larguraPagina / 2, rodapeY + 11.5, {
    tamanho: 8,
    cor: RELATORIO_COR.primaria,
    negrito: true,
    alinhar: "center",
  });

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );

  if (!blob) throw new Error("Não foi possível gerar a imagem");

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${curso} ${semestre}º Semestre.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const PdfGenerator = ({ curso, semestre }: IPdfGeneratorProps) => {
  const [gerando, setGerando] = useState<boolean>(false);
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const { grade, setShowInputPlaceholder } = useContext(MainContext);

  useEffect(() => {
    if (!menuAberto) return;

    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };

    document.addEventListener("keydown", fecharComEsc);
    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [menuAberto]);

  const gerarArquivo = async (formato: FormatoTabela) => {
    setShowInputPlaceholder(false);
    setGerando(true);
    try {
      // imports dinamicos para amenizar sobrecarregamento
      const [tabela, logoModule] = await Promise.all([
        capturarTabela(),
        import("../../shared/images/logo.png"),
      ]);

      const formativaInput: HTMLInputElement | null = document.querySelector(
        "#field-formativa input",
      );

      const relatorio: IRelatorio = {
        tabela,
        logo: logoModule.default,
        curso,
        semestre,
        formativa: formativaInput?.value.trim() || "Não informado",
      };

      if (formato === "pdf") {
        await salvarPdf(relatorio);
      } else {
        await salvarImagem(relatorio);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setGerando(false);
      setShowInputPlaceholder(true);
    }
  };

  // não depende da tabela na tela, então não mexe nos placeholders
  const gerarRelatorio = async (cursoGrade: ICurso) => {
    setGerando(true);
    try {
      // import dinamico para amenizar sobrecarregamento
      const { salvarRelatorioCurso } = await import(
        "../../shared/utils/relatorio-curso-pdf"
      );

      await salvarRelatorioCurso(cursoGrade);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setGerando(false);
    }
  };

  const handleGeneration = (formato: FormatoTabela) => {
    setMenuAberto(false);
    toast.promise(gerarArquivo(formato), MENSAGENS[formato]);
  };

  const handleRelatorio = () => {
    setMenuAberto(false);

    const cursoGrade = grade.find((c) => c.course_name === curso);
    if (!cursoGrade) return;

    if (!cursoTemNotas(cursoGrade)) {
      toast.info("Ainda não há notas salvas neste curso para gerar o relatório.");
      return;
    }

    toast.promise(gerarRelatorio(cursoGrade), MENSAGENS.relatorio);
  };

  return (
    <PdfGeneratorStyle>
      {menuAberto && (
        <MenuBackdropStyle
          onClick={() => setMenuAberto(false)}
          onTouchMove={() => setMenuAberto(false)}
          onWheel={() => setMenuAberto(false)}
        />
      )}

      <button
        type="button"
        className="trigger"
        aria-haspopup="menu"
        aria-expanded={menuAberto}
        disabled={gerando}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        <FaFileExport />
        <span>Gerar arquivo</span>
        <FaChevronUp className="caret" />
      </button>

      {menuAberto && (
        <div className="menu" role="menu">
          <div role="group" aria-labelledby="grupo-semestre">
            <span id="grupo-semestre" className="grupo-titulo">
              Semestre atual ({semestre}º)
            </span>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleGeneration("pdf")}
            >
              <FaFilePdf className="icon-pdf" />
              Documento (PDF)
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleGeneration("imagem")}
            >
              <FaFileImage className="icon-imagem" />
              Imagem (PNG)
            </button>
          </div>

          <div className="divisor" role="separator" />

          <div role="group" aria-labelledby="grupo-curso">
            <span id="grupo-curso" className="grupo-titulo">
              Curso completo
            </span>
            <button
              type="button"
              role="menuitem"
              title="Todas as notas salvas do curso, separadas por semestre"
              onClick={handleRelatorio}
            >
              <FaFilePdf className="icon-pdf" />
              Relatório (PDF)
            </button>
          </div>
        </div>
      )}
    </PdfGeneratorStyle>
  );
};
