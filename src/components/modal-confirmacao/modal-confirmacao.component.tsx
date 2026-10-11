import { useEffect, useRef } from "react";
import { FaTrashCan } from "react-icons/fa6";
import {
  BackgroundConfirmacaoStyle,
  ModalConfirmacaoStyle,
} from "./modal-confirmacao.style";

interface IModalConfirmacaoProps {
  titulo: string;
  descricao: string;
  textoConfirmar: string;
  onConfirmar(): void;
  onCancelar(): void;
}

export const ModalConfirmacaoComponent = ({
  titulo,
  descricao,
  textoConfirmar,
  onConfirmar,
  onCancelar,
}: IModalConfirmacaoProps) => {
  const cancelarRef = useRef<HTMLButtonElement>(null);

  // o foco começa em "Cancelar" para que um Enter distraído não apague nada
  useEffect(() => {
    cancelarRef.current?.focus();

    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancelar();
    };
    document.addEventListener("keydown", fecharComEsc);
    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [onCancelar]);

  return (
    <BackgroundConfirmacaoStyle onClick={onCancelar}>
      <ModalConfirmacaoStyle
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacao-titulo"
        aria-describedby="modal-confirmacao-descricao"
        onClick={(e) => e.stopPropagation()}
      >
        <h6 id="modal-confirmacao-titulo" className="title">
          {titulo}
        </h6>
        <p id="modal-confirmacao-descricao" className="text">
          {descricao}
        </p>

        <div className="buttons">
          <button
            type="button"
            ref={cancelarRef}
            className="cancel"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button type="button" className="confirm" onClick={onConfirmar}>
            <FaTrashCan />
            {textoConfirmar}
          </button>
        </div>
      </ModalConfirmacaoStyle>
    </BackgroundConfirmacaoStyle>
  );
};
