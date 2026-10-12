import type { jsPDF } from "jspdf";

export type RGB = readonly [number, number, number];

// paleta dos relatórios (PDF e imagem), na família de azul do cabeçalho da tabela
export const RELATORIO_COR = {
  primaria: [0, 119, 204],
  profunda: [23, 53, 150],
  titulo: [15, 39, 66],
  suave: [100, 116, 139],
  fundo: [243, 247, 251],
  borda: [214, 224, 236],
  sombra: [232, 237, 243],
  branco: [255, 255, 255],
} as const satisfies Record<string, RGB>;

export const SITE_URL = "https://precisoestudar.com.br/";
export const AVISO_RODAPE =
  "Este documento não possui validade oficial da Faculdade Engenheiro Salvador Arena";

// medidas do PDF, em mm (A4 retrato)
export const PAGINA_LARGURA = 210;
export const PAGINA_ALTURA = 297;
export const MARGEM = 15;
export const RODAPE_Y = 272;

export interface ITrecho {
  texto: string;
  negrito?: boolean;
  cor: RGB;
}

// sem o locale, a data sairia no formato da região do aparelho (ex.: "3:45:12 PM"), e o espaço
// especial antes do AM/PM não existe na fonte padrão do PDF
export const dataGeracao = () => new Date().toLocaleString("pt-BR");

export function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// escreve trechos com estilos diferentes na mesma linha
export function escreverTrechos(
  pdf: jsPDF,
  trechos: ITrecho[],
  x: number,
  y: number,
) {
  let cursor = x;
  trechos.forEach(({ texto, negrito, cor }) => {
    pdf.setFont("helvetica", negrito ? "bold" : "normal");
    pdf.setTextColor(...cor);
    pdf.text(texto, cursor, y);
    cursor += pdf.getTextWidth(texto);
  });
}

// faixas de topo e base (espelhadas) da página atual
export function desenharFaixas(pdf: jsPDF) {
  pdf.setFillColor(...RELATORIO_COR.profunda);
  pdf.rect(0, 0, PAGINA_LARGURA, 3, "F");
  pdf.rect(0, PAGINA_ALTURA - 3, PAGINA_LARGURA, 3, "F");
  pdf.setFillColor(...RELATORIO_COR.primaria);
  pdf.rect(0, 3, PAGINA_LARGURA, 1.2, "F");
  pdf.rect(0, PAGINA_ALTURA - 4.2, PAGINA_LARGURA, 1.2, "F");
}

// logo, título e uma linha de detalhes; termina com um filete em y = 40
export async function desenharCabecalho(
  pdf: jsPDF,
  logo: string,
  titulo: string,
  detalhes: ITrecho[],
) {
  const logoImg = await carregarImagem(logo);

  // a logo mantém a proporção original dentro de um quadrado de 24mm
  const logoBox = 24;
  const logoScale = Math.min(
    logoBox / logoImg.naturalWidth,
    logoBox / logoImg.naturalHeight,
  );
  const logoWidth = logoImg.naturalWidth * logoScale;
  const logoHeight = logoImg.naturalHeight * logoScale;
  pdf.addImage(
    logo,
    "PNG",
    MARGEM,
    11 + (logoBox - logoHeight) / 2,
    logoWidth,
    logoHeight,
  );

  const textoX = MARGEM + logoWidth + 6;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...RELATORIO_COR.primaria);
  pdf.text("CALCULADORA DE NOTAS FESA", textoX, 15.5, { charSpace: 0.5 });

  pdf.setFontSize(18);
  pdf.setTextColor(...RELATORIO_COR.titulo);
  pdf.text(titulo, textoX, 24);

  pdf.setFontSize(10.5);
  escreverTrechos(pdf, detalhes, textoX, 31);

  // linha inferior para separar o cabeçalho
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.3);
  pdf.line(MARGEM, 40, PAGINA_LARGURA - MARGEM, 40);
}

// cartões de dados resumo, lado a lado, com 20mm de altura
export function desenharCartoes(
  pdf: jsPDF,
  cartoes: { rotulo: string; valor: string }[],
  y: number,
) {
  const cartaoAltura = 20;
  const cartaoGap = 6;
  const contentWidth = PAGINA_LARGURA - MARGEM * 2;
  const cartaoLargura =
    (contentWidth - cartaoGap * (cartoes.length - 1)) / cartoes.length;

  cartoes.forEach(({ rotulo, valor }, i) => {
    const x = MARGEM + i * (cartaoLargura + cartaoGap);

    pdf.setFillColor(...RELATORIO_COR.fundo);
    pdf.setDrawColor(...RELATORIO_COR.borda);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(x, y, cartaoLargura, cartaoAltura, 2, 2, "FD");

    pdf.setFillColor(...RELATORIO_COR.primaria);
    pdf.roundedRect(x + 4, y + 4.5, 1, cartaoAltura - 9, 0.5, 0.5, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...RELATORIO_COR.suave);
    pdf.text(rotulo.toUpperCase(), x + 8, y + 8.2, { charSpace: 0.4 });

    pdf.setFontSize(12.5);
    pdf.setTextColor(...RELATORIO_COR.titulo);
    pdf.text(valor, x + 8, y + 15);
  });
}

// filete, aviso e link do site, na posição fixa do rodapé da página atual
export function desenharRodape(pdf: jsPDF) {
  pdf.setDrawColor(...RELATORIO_COR.borda);
  pdf.setLineWidth(0.3);
  pdf.line(MARGEM, RODAPE_Y, PAGINA_LARGURA - MARGEM, RODAPE_Y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...RELATORIO_COR.suave);
  pdf.text(AVISO_RODAPE, PAGINA_LARGURA / 2, RODAPE_Y + 6.5, {
    align: "center",
  });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...RELATORIO_COR.primaria);
  const siteLargura = pdf.getTextWidth(SITE_URL);
  const siteX = (PAGINA_LARGURA - siteLargura) / 2;
  pdf.text(SITE_URL, siteX, RODAPE_Y + 11.5);
  pdf.link(siteX, RODAPE_Y + 8.5, siteLargura, 4, { url: SITE_URL });
}
