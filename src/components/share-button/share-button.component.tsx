import { useState } from "react";
import { FaLink, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { ShareButtonStyle, ShareOptions } from "./share-button.style";

export const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.info("Link copiado! 📋");
    setOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = `Achei esse site que ajuda a acompanhar as notas da FESA! Dá uma olhada: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;

    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <ShareButtonStyle>
      <button onClick={() => setOpen(!open)} aria-label="Compartilhar">
        <FaShareAlt />
      </button>

      {open && (
        <ShareOptions>
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
  );
};

export default ShareButton;
