import { FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import { PdfGeneratorStyle } from "./pdf-generator.style";
import { useContext, useState } from "react";
import { MainContext } from "../../context/main.context";

interface IPdfGeneratorProps {
  curso: string;
  semestre: number;
}
export const PdfGenerator = ({ curso, semestre }: IPdfGeneratorProps) => {
  const [gerandoPdf, setGerandoPdf] = useState<boolean>(false);
  const { setShowInputPlaceholder } = useContext(MainContext);

  const gerarPdf = async () => {
    setShowInputPlaceholder(false);
    setGerandoPdf(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const tabela = document.getElementById("table-container");
      const formativaInput: HTMLInputElement | null = document.querySelector(
        "#field-formativa input"
      );
      const formativaTexto = formativaInput?.value.trim() || "Não informado";

      if (!tabela) throw new Error("Tabela não encontrada");

      const canvas = await html2canvas(tabela, {
        scale: 2,
        useCORS: true,
        windowWidth: 1024,
        scrollX: 0,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const imgProps = pdf.getImageProperties(imgData);
      const availableWidth = pageWidth - margin * 2;
      const imgHeight = (imgProps.height * availableWidth) / imgProps.width;

      // 🎓 CABEÇALHO PROFISSIONAL E SÓBRIO
      pdf.setFillColor(255, 255, 255); // fundo branco puro
      pdf.rect(0, 0, pageWidth, 32, "F");

      // linha sutil inferior para separar o cabeçalho
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.3);
      pdf.line(margin, 32, pageWidth - margin, 32);

      // título principal
      pdf.setTextColor(30, 30, 30);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("Relatório de Desempenho Semestral", pageWidth / 2, 18, {
        align: "center",
      });

      // subtítulo discreto
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10.5);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Curso: ${curso}  |  ${semestre}º semestre`, pageWidth / 2, 26, {
        align: "center",
      });

      // 📋 CAIXA DE DADOS RESUMO
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(245, 247, 250);
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
      pdf.text(formativaTexto, margin + 38, 62);

      // 🖼️ INSERE A TABELA CENTRALIZADA
      const imageY = 75;
      const maxHeight = pageHeight - imageY - 30;
      const finalHeight = Math.min(imgHeight, maxHeight);

      pdf.addImage(imgData, "PNG", margin, imageY, availableWidth, finalHeight);

      // ⚠️ AVISO NO RODAPÉ
      pdf.setFontSize(8);
      pdf.setTextColor(130, 130, 130);
      pdf.text(
        "Este documento não possui validade oficial da Faculdade Engenheiro Salvador Arena",
        pageWidth / 2,
        pageHeight - 15,
        { align: "center" }
      );

      pdf.text(
        "https://precisoestudar.com.br/",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );

      pdf.save(`${curso} ${semestre}º Semestre.pdf`);
    } catch (error) {
      console.log(error);
      toast.error("Ops... Houve um erro inesperado ao gerar o PDF 😕");
    } finally {
      setGerandoPdf(false);
      setShowInputPlaceholder(true);
    }
  };

  const handleGeneration = () => {
    toast.promise(gerarPdf(), {
      pending: "Estamos gerando seu PDF, aguarde um instante...",
      success: "PDF gerado com sucesso! 🎉",
      error: "Algo deu errado ao gerar o PDF. Tente novamente. 😕",
    });
  };

  return (
    <PdfGeneratorStyle>
      {gerandoPdf ? (
        <button disabled={true} type="button" onClick={handleGeneration}>
          <FaFilePdf />
          <span>Gerar PDF</span>
        </button>
      ) : (
        <button type="button" onClick={handleGeneration}>
          <FaFilePdf />
          <span>Gerar PDF</span>
        </button>
      )}
    </PdfGeneratorStyle>
  );
};
