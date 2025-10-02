import { toast } from "react-toastify";
import { AvisoModalStyle, BackgroudModalStyle } from "./modal-aviso.style";
import { useState } from "react";
import gif from "../../shared/gif/gif1.gif";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

export const AvisoModalComponent = ({ onCiente }: { onCiente: () => void }) => {
  const [clicks, setClick] = useState<number>(0);
  const mensagens = [
    "Tem que aceitar pra usar 😌",
    "Tá ficando difícil de confiar em você 😬",
  ];

  function ciente() {
    const now = new Date();
    localStorage.setItem("ciente", "true");
    localStorage.setItem("cienteData", now.toISOString()); // salva a data de aceite
    onCiente();
  }

  function discorda() {
    if (clicks < mensagens.length) {
      const index = clicks % mensagens.length;
      toast.info(mensagens[index]);
    } else {
      // Exibe GIF no toast
      for (let i = 0; i < 4; i++) {
        toast.warning(
          <div style={{ textAlign: "center" }}>
            <img
              src={gif}
              alt="Drama GIF"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>,
          { autoClose: false }
        );
      }
    }
    setClick(clicks + 1);
  }

  return (
    <BackgroudModalStyle id="background">
      <AvisoModalStyle>
        <div>
          <h6 className="title">Aviso e Isenção de Responsabilidade</h6>
        </div>
        <div className="text">
          <p>
            Este projeto é uma ferramenta de apoio para alunos da FESA no
            cálculo de notas. É importante ressaltar que não há vínculo oficial
            com a FESA.
          </p>
          <br />
          <p>
            Ao utilizar esta ferramenta, você concorda que os resultados obtidos
            são meramente referenciais e que o uso é de sua inteira
            responsabilidade.
          </p>
          <br />
          <p>
            Em caso de dúvidas ou divergências, o aluno deve sempre procurar o
            professor responsável ou a própria instituição para obter as
            informações oficiais.
          </p>
        </div>

        <div className="buttons">
          {clicks <= 2 ? (
            <>
              <button id="agree" onClick={ciente}>
                Li e estou ciente
                <IoCheckmarkSharp size={20} />
              </button>
              <button id="disagree" onClick={discorda} disabled={clicks > 2}>
                Não concordo
                <ImCancelCircle size={20} />
              </button>
            </>
          ) : (
            <button id="agree" onClick={ciente}>
              COM CERTEZA, LI TUDINHO E ESTOU CIENTE. OBRIGADO!
            </button>
          )}
        </div>
      </AvisoModalStyle>
    </BackgroudModalStyle>
  );
};
