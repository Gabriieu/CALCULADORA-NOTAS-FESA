import { BiSolidBookAdd } from "react-icons/bi";
import { AdicionarDPStyle } from "./adicionar-dp.style";
import { useContext, useEffect, useState, useRef } from "react";
import { MainContext } from "../../context/main.context";
import { IDisciplina } from "../../context/interfaces/interfaces";
import { toast } from "react-toastify";

interface IAdicionarDPComponentProp {
  curso: string;
  semestre: number;
  onAdicionarDP: (disciplina: string) => void;
}

export const AdicionarDPComponent = ({
  curso,
  semestre,
  onAdicionarDP,
}: IAdicionarDPComponentProp) => {
  const { getDisciplinasAnteriores } = useContext(MainContext);
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState<
    IDisciplina[][]
  >([]);
  const [dpSelecionada, setDpSelecionada] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setDpSelecionada("");
    setDisciplinasDisponiveis(getDisciplinasAnteriores(curso, semestre));
  }, [curso, semestre]);

  const abrirModal = () => dialogRef.current?.showModal();
  const fecharModal = () => dialogRef.current?.close();

  const handleSelect = () => {
    if (!dpSelecionada) {
      toast.warn("Selecione uma disciplina!");
      return;
    }

    onAdicionarDP(dpSelecionada);
    fecharModal();
  };

  return (
    <AdicionarDPStyle>
      <dialog ref={dialogRef}>
        <h1>Selecione a DP que você está cursando</h1>
        <select
          value={dpSelecionada}
          onChange={(e) => setDpSelecionada(e.target.value)}
          name="disciplinas-select"
        >
          <option value="" disabled>
            Selecione uma disciplina
          </option>
          {disciplinasDisponiveis.map((semestre) =>
            semestre.map((disciplina) => (
              <option value={disciplina.nome} key={disciplina.nome}>
                {disciplina.nome.toUpperCase()}
              </option>
            ))
          )}
        </select>

        <div style={{ marginTop: "1rem" }}>
          {dpSelecionada ? (
            <button
              type="button"
              onClick={handleSelect}
              disabled={dpSelecionada === ""}
            >
              Ok
            </button>
          ) : null}
          <button type="button" id="cancel" onClick={fecharModal}>
            Cancelar
          </button>
        </div>
      </dialog>

      <button type="button" onClick={abrirModal}>
        <BiSolidBookAdd />
        <span>Adicionar DP</span>
      </button>
    </AdicionarDPStyle>
  );
};
