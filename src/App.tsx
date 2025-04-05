import { useContext, useEffect, useState } from "react";
import "./App.css";
import { MainContext } from "./context/main.provider";

function App() {
  const { semestres } = useContext(MainContext);
  const [semestreSelecionado, setSemestreSelecionado] = useState<number | null>(
    null
  );
  const [formativa, setFormativa] = useState<number>(0);
  const [notas, setNotas] = useState<{
    [key: string]: {
      n1_b1: number;
      n2_b1: number;
      n1_b2: number;
      n2_b2: number;
      mediaB1: number;
      mediaB2: number;
      mediaFinal: number;
    };
  }>({});

  useEffect(() => {
    if (semestres.length > 0) {
      const primeiroSemestre = semestres[0].semestre;
      setSemestreSelecionado(primeiroSemestre);
      const notasSalvas = localStorage.getItem(`notas_${primeiroSemestre}`);
      if (notasSalvas) {
        setNotas(JSON.parse(notasSalvas));
      }
    }
  }, [semestres]);

  useEffect(() => {
    if (semestreSelecionado !== null) {
      const notasSalvas = localStorage.getItem(`notas_${semestreSelecionado}`);
      if (notasSalvas) {
        setNotas(JSON.parse(notasSalvas));
      } else {
        setNotas({});
      }
    }
  }, [semestreSelecionado]);

  const salvarNotasNoLocalStorage = (notasAtualizadas: typeof notas) => {
    if (semestreSelecionado !== null) {
      localStorage.setItem(
        `notas_${semestreSelecionado}`,
        JSON.stringify(notasAtualizadas)
      );
    }
  };

  const handleNotaChange = (
    disciplina: string,
    campo: keyof (typeof notas)[string],
    valor: number
  ) => {
    const notaCorrigida = Math.min(10, Math.max(0, Number(valor.toFixed(1))));

    setNotas((prev) => {
      const novaNota = { ...prev[disciplina], [campo]: notaCorrigida };
      novaNota.mediaB1 = Number(
        ((novaNota.n1_b1 || 0) * 0.4 + (novaNota.n2_b1 || 0) * 0.6).toFixed(1)
      );
      novaNota.mediaB2 = Number(
        (
          (novaNota.n1_b2 || 0) * 0.2 +
          (novaNota.n2_b2 || 0) * 0.6 +
          (formativa || 0) * 0.2
        ).toFixed(1)
      );
      novaNota.mediaFinal = Number(
        ((novaNota.mediaB1 + novaNota.mediaB2) / 2).toFixed(1)
      );
      const notasAtualizadas = { ...prev, [disciplina]: novaNota };
      salvarNotasNoLocalStorage(notasAtualizadas);
      return notasAtualizadas;
    });
  };

  const handleFormativaChange = (valor: number) => {
    const notaCorrigida = Math.min(10, Math.max(0, Number(valor.toFixed(1))));
    setFormativa(notaCorrigida);
    setNotas((prev) => {
      const novasNotas = { ...prev };
      Object.keys(novasNotas).forEach((disciplina) => {
        novasNotas[disciplina].mediaB2 = Number(
          (
            (novasNotas[disciplina].n1_b2 || 0) * 0.2 +
            (novasNotas[disciplina].n2_b2 || 0) * 0.6 +
            notaCorrigida * 0.2
          ).toFixed(1)
        );
        novasNotas[disciplina].mediaFinal = Number(
          (
            (novasNotas[disciplina].mediaB1 + novasNotas[disciplina].mediaB2) /
            2
          ).toFixed(1)
        );
      });
      salvarNotasNoLocalStorage(novasNotas);
      return novasNotas;
    });
  };

  return (
    <>
      <section>
        <fieldset>
          <legend>Selecionar Semestre</legend>
          <label htmlFor="semestreSelect">Semestre:</label>
          <select
            id="semestreSelect"
            value={semestreSelecionado || ""}
            onChange={(e) => setSemestreSelecionado(Number(e.target.value))}
          >
            {semestres.map((semestre, index) => (
              <option key={index} value={semestre.semestre}>
                {semestre.semestre}º Semestre
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Nota Formativa</legend>
          <label htmlFor="notaFormativa">Nota Formativa:</label>
          <input
            id="notaFormativa"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formativa}
            onChange={(e) => handleFormativaChange(Number(e.target.value))}
          />
        </fieldset>

        <div id="table-container">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Disciplina</th>
              <th colSpan={3}>1º Bimestre</th>
              <th colSpan={3}>2º Bimestre</th>
              <th rowSpan={2}>Média Final</th>
            </tr>
            <tr>
              <th>N1</th>
              <th>N2</th>
              <th>Média B1</th>
              <th>N1</th>
              <th>N2</th>
              <th>Média B2</th>
            </tr>
          </thead>
          <tbody>
            {semestres
              .filter((semestre) => semestre.semestre === semestreSelecionado)
              .flatMap((semestre) =>
                semestre.disciplinas.map((disciplina, index) => (
                  <tr key={index}>
                    <td>{disciplina.nome}</td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={notas[disciplina.nome]?.n1_b1 || ""}
                        onChange={(e) =>
                          handleNotaChange(
                            disciplina.nome,
                            "n1_b1",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={notas[disciplina.nome]?.n2_b1 || ""}
                        onChange={(e) =>
                          handleNotaChange(
                            disciplina.nome,
                            "n2_b1",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      {notas[disciplina.nome]?.mediaB1?.toFixed(1) || "-"}
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={notas[disciplina.nome]?.n1_b2 || ""}
                        onChange={(e) =>
                          handleNotaChange(
                            disciplina.nome,
                            "n1_b2",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={notas[disciplina.nome]?.n2_b2 || ""}
                        onChange={(e) =>
                          handleNotaChange(
                            disciplina.nome,
                            "n2_b2",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      {notas[disciplina.nome]?.mediaB2?.toFixed(1) || "-"}
                    </td>
                    <td>
                      {notas[disciplina.nome]?.mediaFinal?.toFixed(1) || "-"}
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
        </div>
      </section>
    </>
  );
}

export default App;
