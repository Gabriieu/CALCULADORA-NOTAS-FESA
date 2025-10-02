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

      if (!tabela) {
        throw new Error("Tabela não encontrada");
      }

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
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 10;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const headerHeight = 50;
      let remainingHeight = imgHeight;
      let positionY = headerHeight;
      let pageNumber = 1;

      while (remainingHeight > 0) {
        if (pageNumber > 1) {
          pdf.addPage();
          positionY = 10;
        }

        if (pageNumber === 1) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(18);
          pdf.setTextColor(0, 0, 0);
          pdf.text("Boletim Semestral de Notas", pageWidth / 2, 20, {
            align: "center",
          });

          pdf.setLineWidth(0.5);
          pdf.line(10, 23, pageWidth - 10, 23);

          pdf.setFont("courier", "normal");
          pdf.setFontSize(14);
          pdf.text(`Curso: ${curso} - ${semestre}º Semestre`, 10, 28);
          pdf.text(`Data de geração: ${new Date().toLocaleString()}`, 10, 35);
          pdf.text(`Nota da Avaliação Formativa: ${formativaTexto}`, 10, 42);
        }

        const sliceHeight = Math.min(remainingHeight, pageHeight - positionY);
        const canvasSlice = document.createElement("canvas");
        canvasSlice.width = canvas.width;
        canvasSlice.height = (sliceHeight * canvas.width) / pdfWidth;

        const ctx = canvasSlice.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(
          canvas,
          0,
          (imgHeight - remainingHeight) * (canvas.height / imgHeight),
          canvas.width,
          canvasSlice.height,
          0,
          0,
          canvas.width,
          canvasSlice.height
        );

        const sliceData = canvasSlice.toDataURL("image/png");
        pdf.addImage(sliceData, "PNG", 5, positionY, pdfWidth, sliceHeight);

        remainingHeight -= sliceHeight;
        pageNumber++;
      }

      const footerText =
        "Documento gerado em https://precisoestudar.com.br/ sem validade oficial da instituição Faculdade Engenheiro Salvador Arena.";
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(footerText, 10, pageHeight - 10);

      pdf.save(`${curso} ${semestre}º Semestre.pdf`);
    } catch (error) {
      setGerandoPdf(false);
      throw error;
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
