export interface ICurso {
  course_id: number;
  course_name: string;
  course_semesters: ISemestre[];
}

export interface ISemestre {
  semester_id: number;
  classes: IDisciplina[];
}

export interface IDisciplina {
  nome: string;
}
