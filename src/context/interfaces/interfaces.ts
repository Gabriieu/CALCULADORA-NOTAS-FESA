export interface iSemestre {
  semestre: number;
  disciplinas: iDisciplina[];
}

export interface iDisciplina {
  nome: string;
}
