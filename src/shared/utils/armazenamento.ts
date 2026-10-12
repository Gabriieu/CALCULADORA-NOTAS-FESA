// tudo o que o app guarda (notas, DPs, aceite do aviso, último curso...) passa por aqui.
// O localStorage pode lançar erro ao ser acessado (ex.: "Bloquear todos os cookies" no Safari do
// iOS) ou recusar uma gravação; nesses casos o app segue funcionando com um armazenamento em
// memória, que vale apenas para a sessão atual
const CHAVE_ULTIMA_SELECAO = "ultimaSelecao";

const memoria = new Map<string, string>();
const ouvintes = new Set<() => void>();

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

// mudanças feitas em outra aba
if (typeof window !== "undefined") {
  window.addEventListener("storage", notificar);
}

// chama o ouvinte sempre que algo é gravado ou apagado, em qualquer componente ou aba.
// Devolve a função que cancela a assinatura
export function assinarArmazenamento(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function lerItem(chave: string): string | null {
  const emMemoria = memoria.get(chave);
  if (emMemoria !== undefined) return emMemoria;

  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

export function gravarItem(chave: string, valor: string): void {
  try {
    localStorage.setItem(chave, valor);
    memoria.delete(chave);
  } catch {
    memoria.set(chave, valor);
  }
  notificar();
}

export function removerItem(chave: string): void {
  memoria.delete(chave);
  try {
    localStorage.removeItem(chave);
  } catch {
    // sem armazenamento: não há nada gravado para remover
  }
  notificar();
}

export function listarChaves(): string[] {
  const chaves = new Set(memoria.keys());

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave !== null) chaves.add(chave);
    }
  } catch {
    // sem acesso ao armazenamento: só existem as chaves em memória
  }

  return [...chaves];
}

export interface IUltimaSelecao {
  curso: string;
  semestre: number;
}

// só confere o formato; quem usa ainda precisa validar se o curso/semestre existem na grade
export function lerUltimaSelecao(): IUltimaSelecao | null {
  try {
    const salvo = JSON.parse(lerItem(CHAVE_ULTIMA_SELECAO) ?? "null");
    if (typeof salvo?.curso === "string" && Number.isInteger(salvo?.semestre)) {
      return { curso: salvo.curso, semestre: salvo.semestre };
    }
  } catch {
    // JSON corrompido: segue como se nada tivesse sido salvo
  }
  return null;
}

export function salvarUltimaSelecao(curso: string, semestre: number): void {
  gravarItem(CHAVE_ULTIMA_SELECAO, JSON.stringify({ curso, semestre }));
}

export function existemDadosSalvos(): boolean {
  return listarChaves().length > 0;
}

function armazenamentoAcessivel(): boolean {
  try {
    void localStorage.length;
    return true;
  } catch {
    return false;
  }
}

// false só quando o navegador recusa apagar o que está salvo
export function apagarDadosSalvos(): boolean {
  memoria.clear();
  let apagou = true;

  try {
    localStorage.clear();
  } catch {
    // inacessível: não havia nada gravado, então não há o que apagar; acessível, mas recusou: falhou
    apagou = !armazenamentoAcessivel();
  }

  notificar();
  return apagou;
}
