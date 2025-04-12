import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import { InputFormativaComponent } from "./components/input-formativa/input-formativa.component";
import { TableRowComponent } from "./components/table-row/table-row.component";
import { MainContext } from "./context/main.context";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.components";

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
          <fieldset>
            <legend>Formativa</legend>
            <label>Nota: </label>
            <InputFormativaComponent
              curso={cursoSelecionado!}
              semestre={semestreSelecionado!}
            />
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
      </section>
      <FooterComponent />
    </>
  );
}

export default App;
