import { InputComponent } from "../input/input.component";
import { OutPutMediaPrimerioBimeste } from "../out-media-1b/output-media-1b.component";
import { OutPutMediaSegundoBimeste } from "../out-media-2b/output-media-2b.component";
import { OutPutMediaFinal } from "../out-media-final/output-media-final.component";

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
  //const [formativa, setFormativa] = useState<number | null>(null);

  //function getFormativa() {}

  return (
    <tr>
      <td>{disciplina}</td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n1"
          bimestre={1}
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={1}
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
        />
      </td>
      <td>
        <InputComponent
          curso={curso}
          disciplina={disciplina}
          tipo="n2"
          bimestre={2}
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
    </tr>
  );
};
