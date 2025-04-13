import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import "./App.css";
import { FooterComponent } from "./components/footer/footer.components";
import { FormativaModalComponent } from "./components/formativa-modal/formativa-modal.component";
import { HeaderComponent } from "./components/header/header.component";
import { InputFormativaComponent } from "./components/input-formativa/input-formativa.component";
import { TableRowComponent } from "./components/table-row/table-row.component";
import { MainContext } from "./context/main.context";

function App() {
  const {
    cursos,
    getCursos,
    getSemestres,
    semestres,
    disciplinas,
    getDisciplinas,
  } = useContext(MainContext);

  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);
  const [semestreSelecionado, setSemestreSelecionado] = useState<number | null>(
    null
  );

  const handleCursoSelecao = useCallback((nomeCurso: string) => {
    setCursoSelecionado(nomeCurso);
  }, []);

  function handleSemestreSelecao(valor: string) {
    const semestreNumero = Number(valor);
    setSemestreSelecionado(semestreNumero);

    if (cursoSelecionado && semestreNumero) {
      getDisciplinas(cursoSelecionado, semestreNumero);
    }
  }

  const handleExportPDF = async () => {
    const element = document.getElementById("table-container");

    if (!element) return;

    // Força layout "desktop"
    const canvas = await html2canvas(element, {
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
        pdf.text(
          `Curso: ${cursoSelecionado} - ${semestreSelecionado}º Semestre`,
          10,
          28
        );
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

    pdf.save(`${cursoSelecionado} ${semestreSelecionado}º Semestre.pdf`);
  };

  useEffect(() => {
    getCursos();
    if (cursoSelecionado) {
      getSemestres(cursoSelecionado);
      setSemestreSelecionado(1);
      getDisciplinas(cursoSelecionado, 1);
    }
  }, [cursoSelecionado]);

  return (
    <>
      <HeaderComponent />
      <section>
        <fieldset>
          <legend>Selecione seu curso</legend>

          <label htmlFor="curso">Curso: </label>
          <select
            id="curso"
            name="curso"
            onChange={(e) => handleCursoSelecao(e.target.value)}
          >
            <option value="" disabled={!!cursoSelecionado}>
              Selecione um curso
            </option>
            {cursos.map((curso) => (
              <option key={curso} value={curso}>
                {curso}
              </option>
            ))}
          </select>

          <label htmlFor="semestre">Semestre: </label>
          <select
            id="semestre"
            name="semestre"
            value={semestreSelecionado ?? ""}
            onChange={(e) => handleSemestreSelecao(e.target.value)}
            disabled={!cursoSelecionado}
          >
            {semestres?.map((semestre) => (
              <option key={semestre} value={semestre}>
                {semestre}º Semestre
              </option>
            ))}
          </select>
        </fieldset>
      </section>

      {cursoSelecionado && semestreSelecionado ? (
        <section>
          <fieldset id="field-formativa">
            <legend>Formativa</legend>
            <div>
              <label>Nota: </label>
              <InputFormativaComponent
                curso={cursoSelecionado!}
                semestre={semestreSelecionado!}
              />
            </div>
            <FormativaModalComponent />
          </fieldset>
        </section>
      ) : null}

      <section>
        <div id="table-container">
          {cursoSelecionado && semestreSelecionado ? (
            <table>
              <thead>
                <tr>
                  <th rowSpan={2}>DISCIPLINA</th>
                  <th colSpan={3}>1º BIMESTRE</th>
                  <th colSpan={3}>2º BIMESTRE</th>
                  <th rowSpan={2}>MÉDIA FINAL</th>
                </tr>
                <tr>
                  <th>N1</th>
                  <th>N2</th>
                  <th>MÉDIA B1</th>
                  <th>N1</th>
                  <th>N2</th>
                  <th>MÉDIA B2</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((disciplina) => (
                  <TableRowComponent
                    key={`${cursoSelecionado}_${disciplina.nome}`}
                    curso={cursoSelecionado ?? ""}
                    disciplina={disciplina.nome}
                    semestre={semestreSelecionado!}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
        {cursoSelecionado ? (
          <div id="pdf-generate">
            <div onClick={handleExportPDF}>
              <span>Gerar PDF</span>
              <span> </span>
              <FaFilePdf color="red" />
            </div>
          </div>
        ) : null}
      </section>
      <FooterComponent />
    </>
  );
}

export default App;
