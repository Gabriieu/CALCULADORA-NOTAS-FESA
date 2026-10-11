import { useContext, useEffect, useState } from "react";
import {
  FaChevronUp,
  FaFileExport,
  FaFileImage,
  FaFilePdf,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { MainContext } from "../../context/main.context";
import { MenuBackdropStyle, PdfGeneratorStyle } from "./pdf-generator.style";

type Formato = "pdf" | "imagem";

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
      clonedTabela
        .querySelector("table")
        ?.removeAttribute("data-disciplina-fixa");
    },
  });
}

type RGB = readonly [number, number, number];

// paleta do relatório (PDF e imagem), na família de azul do cabeçalho da tabela
const RELATORIO_COR = {
  primaria: [0, 119, 204],
  profunda: [23, 53, 150],
  titulo: [15, 39, 66],
  suave: [100, 116, 139],
  fundo: [243, 247, 251],
  borda: [214, 224, 236],
  sombra: [232, 237, 243],
  branco: [255, 255, 255],
} as const satisfies Record<string, RGB>;

const SITE_URL = "https://precisoestudar.com.br/";
const TITULO_RELATORIO = "Relatório de Desempenho Semestral";
const AVISO_RODAPE =
  "Este documento não possui validade oficial da Faculdade Engenheiro Salvador Arena";

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
  const logoImg = await carregarImagem(logo);
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const imgProps = pdf.getImageProperties(imgData);

  pdf.setProperties({
    title: `${TITULO_RELATORIO} - ${curso} ${semestre}º semestre`,
    subject: "Notas e médias por disciplina",
    author: "Calculadora de Notas FESA",
    creator: SITE_URL,
  });

  // escreve trechos com estilos diferentes na mesma linha
  const escreverTrechos = (
    trechos: { texto: string; negrito?: boolean; cor: RGB }[],
    x: number,
    y: number,
  ) => {
    let cursor = x;
    trechos.forEach(({ texto, negrito, cor }) => {
      pdf.setFont("helvetica", negrito ? "bold" : "normal");
      pdf.setTextColor(...cor);
      pdf.text(texto, cursor, y);
      cursor += pdf.getTextWidth(texto);
    });
  };

  // FAIXAS DE TOPO E BASE (espelhadas)
  pdf.setFillColor(...RELATORIO_COR.profunda);
  pdf.rect(0, 0, pageWidth, 3, "F");
  pdf.rect(0, pageHeight - 3, pageWidth, 3, "F");
  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(0, 3, pageWidth, 1.2, "F");
  pdf.rect(0, pageHeight - 4.2, pageWidth, 1.2, "F");

  // CABEÇALHO
  // a logo mantém a proporção original dentro de um quadrado de 24mm
  const logoBox = 24;
  const logoScale = Math.min(
    logoBox / logoImg.naturalWidth,
    logoBox / logoImg.naturalHeight,
  );
  const logoWidth = logoImg.naturalWidth * logoScale;
  const logoHeight = logoImg.naturalHeight * logoScale;
  pdf.addImage(
    logo,
    "PNG",
    margin,
    11 + (logoBox - logoHeight) / 2,
    logoWidth,
    logoHeight,
  );

  const textoX = margin + logoWidth + 6;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...RELATORIO_COR.primaria);
  pdf.text("CALCULADORA DE NOTAS FESA", textoX, 15.5, { charSpace: 0.5 });

  pdf.setFontSize(18);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  pdf.text(TITULO_RELATORIO, textoX, 24);

  pdf.setFontSize(10.5);
  escreverTrechos(
    [
      { texto: "Curso: ", cor: RELATORIO_COR.suave },
      { texto: curso, negrito: true, cor: RELATORIO_COR.titulo },
      { texto: "   |   ", cor: RELATORIO_COR.borda },
      {
        texto: `${semestre}º semestre`,
        negrito: true,
        cor: RELATORIO_COR.titulo,
      },
    ],
    textoX,
    31,
  );

  // linha inferior para separar o cabeçalho
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.3);
  pdf.line(margin, 40, pageWidth - margin, 40);

  // CARTÕES DE DADOS RESUMO
  const cartaoY = 47;
  const cartaoAltura = 20;
  const cartaoGap = 6;
  const cartaoLargura = (contentWidth - cartaoGap) / 2;

  [
    { rotulo: "Data de geração", valor: new Date().toLocaleString() },
    { rotulo: "Nota formativa", valor: formativa },
  ].forEach(({ rotulo, valor }, i) => {
    const x = margin + i * (cartaoLargura + cartaoGap);

    pdf.setFillColor(...RELATORIO_COR.fundo);
    pdf.setDrawColor(...RELATORIO_COR.borda);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(x, cartaoY, cartaoLargura, cartaoAltura, 2, 2, "FD");

    pdf.setFillColor(...RELATORIO_COR.primaria);
    pdf.roundedRect(x + 4, cartaoY + 4.5, 1, cartaoAltura - 9, 0.5, 0.5, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...RELATORIO_COR.suave);
    pdf.text(rotulo.toUpperCase(), x + 8, cartaoY + 8.2, { charSpace: 0.4 });

    pdf.setFontSize(12.5);
    pdf.setTextColor(...RELATORIO_COR.titulo);
    pdf.text(valor, x + 8, cartaoY + 15);
  });

  // TÍTULO DA SEÇÃO
  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(margin, 74.2, 1.2, 4.6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  pdf.text("Desempenho por disciplina", margin + 3.5, 77.8);

  // INSERE A TABELA CENTRALIZADA, EMOLDURADA
  const rodapeY = 272;
  const quadroY = 82;
  const quadroPadding = 2.5;
  const larguraMax = contentWidth - quadroPadding * 2;
  const alturaMax = rodapeY - 5 - quadroY - quadroPadding * 2;

  // se a tabela for muito alta, reduz mantendo a proporção
  const escala = Math.min(
    larguraMax / imgProps.width,
    alturaMax / imgProps.height,
  );
  const imgWidth = imgProps.width * escala;
  const imgHeight = imgProps.height * escala;
  const quadroLargura = imgWidth + quadroPadding * 2;
  const quadroAltura = imgHeight + quadroPadding * 2;
  const quadroX = margin + (contentWidth - quadroLargura) / 2;

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

  pdf.addImage(
    imgData,
    "PNG",
    quadroX + quadroPadding,
    quadroY + quadroPadding,
    imgWidth,
    imgHeight,
  );

  // RODAPÉ
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.3);
  pdf.line(margin, rodapeY, pageWidth - margin, rodapeY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...RELATORIO_COR.suave);
  pdf.text(AVISO_RODAPE, pageWidth / 2, rodapeY + 6.5, { align: "center" });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...RELATORIO_COR.primaria);
  const siteLargura = pdf.getTextWidth(SITE_URL);
  const siteX = (pageWidth - siteLargura) / 2;
  pdf.text(SITE_URL, siteX, rodapeY + 11.5);
  pdf.link(siteX, rodapeY + 8.5, siteLargura, 4, { url: SITE_URL });

  pdf.save(`${curso} ${semestre}º Semestre.pdf`);
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
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
  const { setShowInputPlaceholder } = useContext(MainContext);

  useEffect(() => {
    if (!menuAberto) return;

    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };

    document.addEventListener("keydown", fecharComEsc);
    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [menuAberto]);

  const gerarArquivo = async (formato: Formato) => {
    setShowInputPlaceholder(false);
    setGerando(true);
    try {
      // imports dinamicos para amenizar sobrecarregamento
      const [tabela, logoModule] = await Promise.all([
        capturarTabela(),
        import("../../shared/images/Gemini_Generated_Image_bb59e1bb59e1bb59.png"),
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

  const handleGeneration = (formato: Formato) => {
    setMenuAberto(false);
    toast.promise(gerarArquivo(formato), MENSAGENS[formato]);
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
          <button
            type="button"
            role="menuitem"
            onClick={() => handleGeneration("pdf")}
          >
            <FaFilePdf className="icon-pdf" />
            PDF
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
      )}
    </PdfGeneratorStyle>
  );
};
