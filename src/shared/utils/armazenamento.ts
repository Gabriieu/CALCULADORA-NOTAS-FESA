// tudo o que o app guarda (notas, DPs, tema, aceite do aviso, último curso...) fica no localStorage
const CHAVE_ULTIMA_SELECAO = "ultimaSelecao";

export interface IUltimaSelecao {
  curso: string;
  semestre: number;
}

// só confere o formato; quem usa ainda precisa validar se o curso/semestre existem na grade
export function lerUltimaSelecao(): IUltimaSelecao | null {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_ULTIMA_SELECAO) ?? "null");
    if (typeof salvo?.curso === "string" && Number.isInteger(salvo?.semestre)) {
      return { curso: salvo.curso, semestre: salvo.semestre };
    }
  } catch {
    // JSON corrompido ou sem acesso ao armazenamento: segue como se nada tivesse sido salvo
  }
  return null;
}

export function salvarUltimaSelecao(curso: string, semestre: number): void {
  try {
    localStorage.setItem(
      CHAVE_ULTIMA_SELECAO,
      JSON.stringify({ curso, semestre }),
    );
  } catch {
    // sem armazenamento: a seleção vale apenas para esta sessão
  }
}

export function existemDadosSalvos(): boolean {
  try {
    return localStorage.length > 0;
  } catch {
    return false;
  }
}

export function apagarDadosSalvos(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
}
