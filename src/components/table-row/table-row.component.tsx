import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcBookmark } from "react-icons/fc";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { InputComponent } from "../input/input.component";
import { OutPutMediaPrimerioBimeste } from "../out-media-1b/output-media-1b.component";
import { OutPutMediaSegundoBimeste } from "../out-media-2b/output-media-2b.component";
import { OutPutMediaFinal } from "../out-media-final/output-media-final.component";
import {
  BackgroudModalStyle,
  TableRowDialogStyle,
  TableRowStyle,
} from "./table-row.style";

interface ITableRowProp {
  curso: string;
  disciplina: string;
  semestre: number;
  DP?: boolean;
  onExcluirDP?: (disciplina: string) => void;
}

export const TableRowComponent = ({
  curso,
  disciplina,
  semestre,
  DP,
  onExcluirDP,
}: ITableRowProp) => {
  const [excluindo, setExcluindo] = useState<boolean>(false);

  function confirmarExclusao() {
    if (DP && onExcluirDP) {
      onExcluirDP(disciplina);
      toast.warning(`DP de ${disciplina} foi excluída!`);
    }
    setExcluindo(false);
  }

  return (
    <TableRowStyle>
      <td className={DP ? "class DP" : "class"}>
        {DP && (
          <>
            <FcBookmark size={16} />
            <span
              className="trash-overlay"
              onClick={(e) => {
                e.stopPropagation();
                setExcluindo(true);
              }}
            >
              <FaRegTrashCan
                size={32}
                className="trash-icon"
                color="rgb(0, 0, 0)"
              />
            </span>
          </>
        )}
        {disciplina.toUpperCase()}
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n1"
          bimestre={1}
          semestre={semestre}
          DP={DP || false}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={1}
          semestre={semestre}
          DP={DP || false}
        />
      </td>
      <td>
        <OutPutMediaPrimerioBimeste
          curso={curso}
          disciplina={disciplina}
          DP={DP}
          semestreDP={semestre}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n1"
          bimestre={2}
          semestre={semestre}
          DP={DP}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={2}
          semestre={semestre}
          DP={DP}
        />
      </td>
      <td>
        <OutPutMediaSegundoBimeste
          curso={curso}
          disciplina={disciplina}
          semestre={semestre}
          DP={DP}
          semestreDP={semestre}
        />
      </td>
      <td>
        <OutPutMediaFinal
          curso={curso}
          disciplina={disciplina}
          semestre={semestre}
          DP={DP}
          semestreDP={semestre}
        />
        {excluindo && DP && (
          <>
            <BackgroudModalStyle
              onClick={() => setExcluindo(false)}
              onWheel={() => setExcluindo(false)}
              onTouchMove={() => setExcluindo(false)}
            />
            <TableRowDialogStyle role="dialog" aria-modal="true">
              <div>
                <h6 className="title">
                  EXCLUIR {disciplina.toUpperCase()} (DP)?
                </h6>
              </div>
              <div className="buttons">
                <button className="confirm" onClick={() => confirmarExclusao()}>
                  <MdDeleteForever /> Excluir
                </button>
                <button className="cancel" onClick={() => setExcluindo(false)}>
                  <MdCancel /> Cancelar
                </button>
              </div>
            </TableRowDialogStyle>
          </>
        )}
      </td>
    </TableRowStyle>
  );
};
