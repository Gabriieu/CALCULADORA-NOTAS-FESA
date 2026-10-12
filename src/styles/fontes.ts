import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import inter500 from "@fontsource/inter/files/inter-latin-500-normal.woff2?url";
import inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
import inter700Italico from "@fontsource/inter/files/inter-latin-700-italic.woff2?url";
import inter800 from "@fontsource/inter/files/inter-latin-800-normal.woff2?url";

// Um arquivo por peso, só do subconjunto latino (cobre o português). Fontes estáticas porque a
// versão variável não renderizou os pesos no WebKit, e o CSS do pacote variável usa
// format('woff2-variations'), que o WebKit não reconhece. A tabela usa negrito itálico; os outros
// itálicos são sintetizados pelo navegador.
const FACES = [
  { peso: 400, estilo: "normal", url: inter400 },
  { peso: 500, estilo: "normal", url: inter500 },
  { peso: 600, estilo: "normal", url: inter600 },
  { peso: 700, estilo: "normal", url: inter700 },
  { peso: 700, estilo: "italic", url: inter700Italico },
  { peso: 800, estilo: "normal", url: inter800 },
];

export const INTER_FONT_FACE = FACES.map(
  ({ peso, estilo, url }) => `
@font-face {
    font-family: 'Inter';
    font-style: ${estilo};
    font-weight: ${peso};
    font-display: swap;
    src: url(${url}) format('woff2');
}`,
).join("\n");
