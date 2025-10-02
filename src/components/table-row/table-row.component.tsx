import { InputComponent } from "../input/input.component";
import { OutPutMediaPrimerioBimeste } from "../out-media-1b/output-media-1b.component";
import { OutPutMediaSegundoBimeste } from "../out-media-2b/output-media-2b.component";
import { OutPutMediaFinal } from "../out-media-final/output-media-final.component";
import { TableRowStyle } from "./table-row.style";

interface ITableRowProp {
  curso: string;
  disciplina: string;
  semestre: number;
}

export const TableRowComponent = ({
  curso,
  disciplina,
  semestre,
}: ITableRowProp) => {
  return (
    <TableRowStyle>
      <td className="class">{disciplina.toUpperCase()} </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n1"
          bimestre={1}
          semestre={semestre}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={1}
          semestre={semestre}
        />
      </td>
      <td>
        <OutPutMediaPrimerioBimeste curso={curso} disciplina={disciplina} />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n1"
          bimestre={2}
          semestre={semestre}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={2}
          semestre={semestre}
        />
      </td>
      <td>
        <OutPutMediaSegundoBimeste
          curso={curso}
          disciplina={disciplina}
          semestre={semestre}
        />
      </td>
      <td>
        <OutPutMediaFinal
          curso={curso}
          disciplina={disciplina}
          semestre={semestre}
        />
      </td>
    </TableRowStyle>
  );
};
