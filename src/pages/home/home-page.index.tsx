import { useCallback, useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { AdicionarDPComponent } from "../../components/adicionar-dp/adicionar-dp.component";
import { InfoModalComponent } from "../../components/info-modal/info-modal.component";
import { InputFormativaComponent } from "../../components/input-formativa/input-formativa.component";
import { AvisoModalComponent } from "../../components/modal-aviso/modal-aviso.component";
import { PdfGenerator } from "../../components/pdf-generator/pdf-generator.component";
import { TableRowComponent } from "../../components/table-row/table-row.component";
import { MainContext } from "../../context/main.context";
import { MainStyle } from "./home-page.style";

export const HomePage = () => {
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
  const [disciplinasDP, setDisciplinasDP] = useState<string[]>([]);
  const [ciente, setCiente] = useState<boolean>(false);
  const [leuAvisoDP, setLeuAvisoDP] = useState<boolean>(false);

  const handleCursoSelecao = useCallback((nomeCurso: string) => {
    setCursoSelecionado(nomeCurso);
  }, []);

  useEffect(() => {
    const ciente = localStorage.getItem("ciente");
    const cienteData = localStorage.getItem("cienteData");

    if (ciente === "true" && cienteData) {
      const dataAceite = new Date(cienteData);
      const agora = new Date();

      const diffMeses =
        (agora.getFullYear() - dataAceite.getFullYear()) * 12 +
        (agora.getMonth() - dataAceite.getMonth());

      if (diffMeses >= 2) {
        localStorage.removeItem("ciente");
        localStorage.removeItem("cienteData");
        setCiente(false);
      } else {
        setCiente(true);
      }
    } else {
      setCiente(false);
    }

    getCursos();
    if (cursoSelecionado) {
      getSemestres(cursoSelecionado);
      setSemestreSelecionado(1);
      getDisciplinas(cursoSelecionado, 1);
    }
    getDPs();
  }, [cursoSelecionado]);

  useEffect(() => {
    getDPs();
  }, [semestreSelecionado]);

  function handleSemestreSelecao(valor: string) {
    const semestreNumero = Number(valor);
    setSemestreSelecionado(semestreNumero);

    if (cursoSelecionado && semestreNumero) {
      getDisciplinas(cursoSelecionado, semestreNumero);
    }
  }

  function adicionarDP(disciplina: string, tipoNota: string, bimestre: number) {
    if (!cursoSelecionado || !semestreSelecionado) return;

    // Limite de 3 DPs
    if (disciplinasDP.length >= 3) {
      toast.error("Não é possível adicionar mais que 3 DP");
      return;
    }

    // Verifica se a DP já existe
    if (disciplinasDP.includes(disciplina)) {
      toast.error("Essa DP já foi adicionada!");
      return;
    }

    const key = `DP_${cursoSelecionado}_${disciplina}_${tipoNota}_${bimestre}_${semestreSelecionado}`;
    localStorage.setItem(key, disciplina);

    setDisciplinasDP((prev) => [...prev, disciplina]);

    avisoExclusaoDP();
  }

  // Obtém DPs do localStorage
  function getDPs() {
    if (!cursoSelecionado || !semestreSelecionado) return;

    const dpPrefix = `DP_${cursoSelecionado}_`;
    const dpSet = new Set<string>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(dpPrefix)) {
        const parts = key.split("_");
        const semestre = Number(parts[parts.length - 1]);

        if (semestre === semestreSelecionado) {
          const disciplinaNome = parts.slice(2, parts.length - 3).join("_");
          dpSet.add(disciplinaNome);
        }
      }
    }

    const dpItems = Array.from(dpSet);
    setDisciplinasDP(dpItems);

    if (dpItems.length > 0) {
      avisoExclusaoDP();
    }
  }

  function excluirDP(disciplina: string) {
    if (!cursoSelecionado || !semestreSelecionado) return;

    const prefix = `DP_${cursoSelecionado}_${disciplina}_`;

    Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => localStorage.removeItem(key));

    setDisciplinasDP((prev) => prev.filter((dp) => dp !== disciplina));
  }

  function avisoExclusaoDP() {
    const jaLeuAviso = localStorage.getItem("leuAvisoDP") === "true";
    if (jaLeuAviso || leuAvisoDP) return;

    toast.warning(
      <div style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
          Toque sobre uma <strong>DP</strong> para excluí-la.
        </p>
        <button
          style={{
            marginTop: "14px",
            padding: "8px 18px",
            borderRadius: "12px",
            border: "none",
            background: "#0077cc",
            color: "white",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.3s ease",
          }}
          onClick={() => {
            localStorage.setItem("leuAvisoDP", "true");
            toast.dismiss();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Entendi
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "light",
        position: "bottom-center",
        transition: Bounce,
        closeButton: false,
        className: "custom-toast",
      }
    );

    setLeuAvisoDP(true);
    localStorage.setItem("leuAvisoDP", "true");
  }

  return (
    <>
      <MainStyle>
        {!ciente ? (
          <AvisoModalComponent onCiente={() => setCiente(true)} />
        ) : null}

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
              <legend>Avaliação Formativa</legend>
              <div>
                <label>Nota: </label>
                <InputFormativaComponent
                  curso={cursoSelecionado!}
                  semestre={semestreSelecionado!}
                />
              </div>
              <InfoModalComponent
                titulo="Formativa"
                descricao="
              A avaliação formativa é realizada no 2º bimestre e tem peso de 50%
              na N1."
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
                  {/* disciplinas DP */}
                  {disciplinasDP.map((dp, index) => (
                    <TableRowComponent
                      key={`DP_${index}`}
                      curso={cursoSelecionado ?? ""}
                      disciplina={dp}
                      semestre={semestreSelecionado!}
                      DP={true}
                      onExcluirDP={excluirDP}
                    />
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>

          {cursoSelecionado ? (
            <div id="table-bottom">
              {semestreSelecionado! > 1 ? (
                <div id="table-bottom-left">
                  <AdicionarDPComponent
                    curso={cursoSelecionado}
                    semestre={semestreSelecionado!}
                    onAdicionarDP={(disciplina) =>
                      adicionarDP(disciplina, "n1", 1)
                    }
                  />
                </div>
              ) : null}
              <PdfGenerator
                curso={cursoSelecionado}
                semestre={semestreSelecionado!}
              />
            </div>
          ) : null}
        </section>
      </MainStyle>
    </>
  );
};
