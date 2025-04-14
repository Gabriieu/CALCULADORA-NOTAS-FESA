import { FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import { PdfGeneratorStyle } from "./pdf-generator.style";

interface IPdfGeneratorProps {
  curso: string;
  semestre: number;
}
export const PdfGenerator = ({ curso, semestre }: IPdfGeneratorProps) => {
  const gerarPdf = async () => {
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const tabela = document.getElementById("table-container");

      if (!tabela) {
        throw new Error();
      }

      // Força layout "desktop"
      const canvas = await html2canvas(tabela, {
        scale: 1.25,
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

      // Cabeçalho
      const headerHeight = 40;

      // Altura total da imagem + cabeçalho
      let remainingHeight = imgHeight;
      let positionY = headerHeight;

      let pageNumber = 1;

      while (remainingHeight > 0) {
        if (pageNumber > 1) {
          pdf.addPage();
          positionY = 10;
        }

        // Adiciona o cabeçalho somente na primeira página
        if (pageNumber === 1) {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(18);
          pdf.setTextColor(0, 0, 0); // Cor preta para o texto
          pdf.text("Boletim Semestral de Notas", pageWidth / 2, 20, {
            align: "center",
          });

          // Linha separadora para destacar o cabeçalho
          pdf.setLineWidth(0.5);
          pdf.line(10, 23, pageWidth - 10, 23);

          // Detalhes adicionais abaixo do título
          pdf.setFont("courier", "normal");
          pdf.setFontSize(12);
          pdf.text(`Curso: ${curso} - ${semestre}º Semestre`, 10, 28);
          pdf.text(`Data de geração: ${new Date().toLocaleString()}`, 10, 35);
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
        "Documento gerado no site: https://calculadora-notas-fesa.vercel.app | Não possui validade oficial da instituição Faculdade Engenheiro Salvador Arena.";
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(footerText, 10, pageHeight - 10);

      pdf.save(`${curso} ${semestre}º Semestre.pdf`);
    } catch (error) {
      throw error;
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
      <button type="button" onClick={handleGeneration}>
        <FaFilePdf />
        <span>Gerar PDF</span>
      </button>
    </PdfGeneratorStyle>
  );
};
