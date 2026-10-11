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

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const imgProps = pdf.getImageProperties(imgData);
  const availableWidth = pageWidth - margin * 2;
  const imgHeight = (imgProps.height * availableWidth) / imgProps.width;

  // CABEÇALHO
  pdf.setFillColor(255, 255, 255); // fundo branco puro
  pdf.rect(0, 0, pageWidth, 32, "F");

  // linha inferior para separar o cabeçalho
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.3);
  pdf.line(margin, 32, pageWidth - margin, 32);

  // adiciona a logo no canto superior esquerdo
  const logoWidth = 25; // largura em mm
  const logoHeight = 25; // altura em mm (ajuste se precisar)
  pdf.addImage(logo, "PNG", margin, 3.5, logoWidth, logoHeight); // posicionado a 3.5mm do topo

  // título principal
  pdf.setTextColor(30, 30, 30);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Relatório de Desempenho Semestral", pageWidth / 2, 18, {
    align: "center",
  });

  // subtítulo
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Curso: ${curso}  |  ${semestre}º semestre`, pageWidth / 2, 26, {
    align: "center",
  });

  // CAIXA DE DADOS RESUMO
  pdf.setDrawColor(200, 200, 200);
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(margin, 45, pageWidth - margin * 2, 25, 3, 3, "FD");

  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Data de geração:", margin + 5, 55);
  pdf.setFont("helvetica", "normal");
  pdf.text(new Date().toLocaleString(), margin + 42, 55);

  pdf.setFont("helvetica", "bold");
  pdf.text("Nota formativa:", margin + 5, 62);
  pdf.setFont("helvetica", "normal");
  pdf.text(formativa, margin + 38, 62);

  // INSERE A TABELA CENTRALIZADA
  const imageY = 75;
  const maxHeight = pageHeight - imageY - 30;
  const finalHeight = Math.min(imgHeight, maxHeight);

  pdf.addImage(imgData, "PNG", margin, imageY, availableWidth, finalHeight);

  // AVISO NO RODAPÉ
  pdf.setFontSize(8);
  pdf.setTextColor(130, 130, 130);
  pdf.text(
    "Este documento não possui validade oficial da Faculdade Engenheiro Salvador Arena",
    pageWidth / 2,
    pageHeight - 15,
    { align: "center" },
  );

  pdf.text("https://precisoestudar.com.br/", pageWidth / 2, pageHeight - 10, {
    align: "center",
  });

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

// mesmo layout do PDF, desenhado em um canvas (medidas em px)
async function salvarImagem({
  tabela,
  logo,
  curso,
  semestre,
  formativa,
}: IRelatorio) {
  const logoImg = await carregarImagem(logo);

  const margem = 96;
  const topoTabela = 410;
  const largura = tabela.width + margem * 2;
  const altura = topoTabela + tabela.height + 150;

  const canvas = document.createElement("canvas");
  canvas.width = largura;
  canvas.height = altura;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas indisponível");

  const fonte = "Arial, Helvetica, sans-serif";

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, largura, altura);

  // CABEÇALHO
  ctx.drawImage(logoImg, margem, 20, 160, 160);

  ctx.textAlign = "center";
  ctx.fillStyle = "#1e1e1e";
  ctx.font = `bold 52px ${fonte}`;
  ctx.fillText("Relatório de Desempenho Semestral", largura / 2, 108);

  ctx.fillStyle = "#505050";
  ctx.font = `28px ${fonte}`;
  ctx.fillText(`Curso: ${curso}  |  ${semestre}º semestre`, largura / 2, 160);

  ctx.strokeStyle = "#dcdcdc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margem, 200);
  ctx.lineTo(largura - margem, 200);
  ctx.stroke();

  // CAIXA DE DADOS RESUMO
  ctx.strokeStyle = "#c8c8c8";
  ctx.beginPath();
  ctx.roundRect(margem, 240, largura - margem * 2, 130, 16);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#323232";
  const resumo = [
    ["Data de geração:", new Date().toLocaleString()],
    ["Nota formativa:", formativa],
  ];
  resumo.forEach(([rotulo, valor], i) => {
    const y = 292 + i * 50;
    ctx.font = `bold 28px ${fonte}`;
    ctx.fillText(rotulo, margem + 32, y);
    const larguraRotulo = ctx.measureText(rotulo).width;
    ctx.font = `28px ${fonte}`;
    ctx.fillText(valor, margem + 32 + larguraRotulo + 16, y);
  });

  // TABELA
  ctx.drawImage(tabela, margem, topoTabela);

  // AVISO NO RODAPÉ
  ctx.textAlign = "center";
  ctx.fillStyle = "#828282";
  ctx.font = `22px ${fonte}`;
  ctx.fillText(
    "Este documento não possui validade oficial da Faculdade Engenheiro Salvador Arena",
    largura / 2,
    altura - 80,
  );
  ctx.fillText("https://precisoestudar.com.br/", largura / 2, altura - 45);

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
