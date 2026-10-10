import { useState } from "react";
import { FaLink, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  BackgroundStyle,
  ShareButtonStyle,
  ShareOptions,
} from "./share-button.style";

// navigator.clipboard só existe em contexto seguro (HTTPS/localhost). Em HTTP
// (ex.: abrindo pelo IP da rede no celular) e em alguns navegadores embutidos
// ele é undefined, então cai no fallback com execCommand.
async function copiarTexto(texto: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      // permissão negada: tenta o fallback
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = texto;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, texto.length);

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    const copiado = await copiarTexto(currentUrl);

    if (copiado) {
      toast.info("Link copiado! 📋");
    } else {
      toast.error(
        "Não foi possível copiar o link. Copie pelo endereço do navegador."
      );
    }
    setOpen(false);
  };

  const fraseAleatoria = (): string => {
    const messages: string[] = [
      "Simulador de DP grátis. Chore com responsabilidade: ",
      "Quer sofrer antes da nota oficial sair? Toma aí: ",
      "DP vem aí? Não sei, mas esse site pode te dar uma ideia: ",
      "Mais precisa que previsão do tempo: previsão de DP: ",
      "Simula aí e já separa os lenços: ",
      "Ferramenta oficial de quem vive no limite da média: ",
      "Se der azul, respira. Se der vermelho... já era: ",
      "Mais fácil aceitar logo a DP do que esperar o resultado final: ",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleWhatsAppClick = () => {
    const uri = window.location.href;
    const message = fraseAleatoria() + uri;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;

    setOpen(false);
    window.open(url, "_blank");
  };

  return (
    <>
      {open ? (
        <BackgroundStyle
          onClick={() => setOpen(false)}
          onTouchMove={() => setOpen(false)}
          onWheel={() => setOpen(false)}
        ></BackgroundStyle>
      ) : null}
      <ShareButtonStyle>
        <button onClick={() => setOpen(!open)}>
          <FaShareAlt />
        </button>

        {open && (
          <ShareOptions>
            <span id="share-header">Compartilhe</span>
            <br />
            <button onClick={handleWhatsAppClick}>
              <FaWhatsapp size={18} color="#25D366" />
              WhatsApp
            </button>

            <button onClick={copyToClipboard}>
              <FaLink size={18} />
              Copiar link
            </button>
          </ShareOptions>
        )}
      </ShareButtonStyle>
    </>
  );
};

export default ShareButton;
