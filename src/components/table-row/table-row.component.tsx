import { useRef } from "react";
import { FcBookmark } from "react-icons/fc";
import { toast } from "react-toastify";
import { InputComponent } from "../input/input.component";
import { OutPutMediaPrimerioBimeste } from "../out-media-1b/output-media-1b.component";
import { OutPutMediaSegundoBimeste } from "../out-media-2b/output-media-2b.component";
import { OutPutMediaFinal } from "../out-media-final/output-media-final.component";
import { TableRowStyle } from "./table-row.style";

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
  const pressTimer = useRef<number | null>(null);

  function confirmarExclusao() {
    if (DP && onExcluirDP) {
      onExcluirDP(disciplina);
      toast.warning(`DP de ${disciplina} foi excluída!`);
    }
  }

  function handleTouchStart() {
    if (DP) {
      pressTimer.current = window.setTimeout(() => {
        confirmarExclusao();
      }, 600);
    }
  }

  function handleTouchEnd() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }

  return (
    <TableRowStyle>
      <td
        className={DP ? "class DP" : "class"}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {DP ? <FcBookmark size={16} /> : null}
        {disciplina.toUpperCase()}{" "}
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
      </td>
    </TableRowStyle>
  );
};
