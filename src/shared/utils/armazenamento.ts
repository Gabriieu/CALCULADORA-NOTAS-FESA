// tudo o que o app guarda (notas, DPs, tema, aceite do aviso...) fica no localStorage
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
