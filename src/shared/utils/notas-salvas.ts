import { ICurso } from "../../context/interfaces/interfaces";

// chaves das notas no localStorage (ver input.component e input-formativa.component):
//   disciplina:  `${curso}_${disciplina}_${n1|n2}_${bimestre}` (não depende do semestre)
//   DP:          `DP_${curso}_${disciplina}_${n1|n2}_${bimestre}_${semestre}`
//   formativa:   `${curso}_formativa_${semestre}`

export interface INotasBimestre {
  n1: number | null;
  n2: number | null;
  // null quando o bimestre não tem nenhuma nota salva
  media: number | null;
}

export interface INotasDisciplina {
  nome: string;
  dp: boolean;
  b1: INotasBimestre;
  b2: INotasBimestre;
  // null quando falta a média de algum dos bimestres
  mediaFinal: number | null;
}

export interface INotasSemestre {
  semestre: number;
  formativa: number | null;
  disciplinas: INotasDisciplina[];
}

// null = nota não informada. Ao adicionar uma DP o app grava o nome da disciplina no lugar da
// N1 do 1º bimestre (é o que marca que a DP existe), então qualquer valor não numérico é ignorado
export function lerNota(chave: string): number | null {
  try {
    const valor = localStorage.getItem(chave);
    if (valor === null || valor.trim() === "") return null;

    const nota = Number(valor);
    return Number.isFinite(nota) ? nota : null;
  } catch {
    return null;
  }
}

// nomes das DPs do curso, por semestre
function listarDPs(curso: string): Map<number, Set<string>> {
  const prefixo = `DP_${curso}_`;
  const nomesPorSemestre = new Map<number, Set<string>>();

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (!chave?.startsWith(prefixo)) continue;

      const partes = /^(.+)_n[12]_[12]_(\d+)$/.exec(chave.slice(prefixo.length));
      if (!partes) continue;

      const semestre = Number(partes[2]);
      const nomes = nomesPorSemestre.get(semestre) ?? new Set<string>();
      nomesPorSemestre.set(semestre, nomes.add(partes[1]));
    }
  } catch {
    // sem acesso ao armazenamento: segue como se não houvesse DPs
  }

  return nomesPorSemestre;
}

// mesmas fórmulas dos componentes out-media-*, mas uma média só existe se houver nota que a
// sustente (o app mostra 0.0 em uma disciplina sem notas; no relatório isso viraria um dado falso)
function lerDisciplina(
  curso: string,
  nome: string,
  semestre: number,
  dp: boolean,
  formativa: number | null,
): INotasDisciplina {
  const nota = (tipo: "n1" | "n2", bimestre: 1 | 2) =>
    lerNota(
      dp
        ? `DP_${curso}_${nome}_${tipo}_${bimestre}_${semestre}`
        : `${curso}_${nome}_${tipo}_${bimestre}`,
    );

  const n1b1 = nota("n1", 1);
  const n2b1 = nota("n2", 1);
  const n1b2 = nota("n1", 2);
  const n2b2 = nota("n2", 2);

  const media1 =
    n1b1 !== null || n2b1 !== null
      ? (n1b1 ?? 0) * 0.4 + (n2b1 ?? 0) * 0.6
      : null;
  const media2 =
    n1b2 !== null || n2b2 !== null
      ? (((n1b2 ?? 0) + (formativa ?? 0)) / 2) * 0.4 + (n2b2 ?? 0) * 0.6
      : null;

  return {
    nome,
    dp,
    b1: { n1: n1b1, n2: n2b1, media: media1 },
    b2: { n1: n1b2, n2: n2b2, media: media2 },
    mediaFinal:
      media1 !== null && media2 !== null ? (media1 + media2) / 2 : null,
  };
}

function disciplinaTemNotas({ dp, b1, b2 }: INotasDisciplina): boolean {
  return dp || [b1.n1, b1.n2, b2.n1, b2.n2].some((nota) => nota !== null);
}

// só os semestres com alguma coisa salva (nota, formativa ou DP), na ordem da grade
export function lerNotasDoCurso(curso: ICurso): INotasSemestre[] {
  const nomeCurso = curso.course_name;
  const dps = listarDPs(nomeCurso);

  return curso.course_semesters
    .map(({ semester_id: semestre, classes }): INotasSemestre => {
      const formativa = lerNota(`${nomeCurso}_formativa_${semestre}`);
      const nomesDP = [...(dps.get(semestre) ?? [])].sort((a, b) =>
        a.localeCompare(b),
      );

      return {
        semestre,
        formativa,
        disciplinas: [
          ...classes.map(({ nome }) =>
            lerDisciplina(nomeCurso, nome, semestre, false, formativa),
          ),
          ...nomesDP.map((nome) =>
            lerDisciplina(nomeCurso, nome, semestre, true, formativa),
          ),
        ],
      };
    })
    .filter(
      ({ formativa, disciplinas }) =>
        formativa !== null || disciplinas.some(disciplinaTemNotas),
    );
}

export function cursoTemNotas(curso: ICurso): boolean {
  return lerNotasDoCurso(curso).length > 0;
}
