import { IoCheckmarkSharp } from "react-icons/io5";
import { AvisoModalStyle, BackgroudModalStyle } from "./modal-aviso.style";

export const AvisoModalComponent = ({ onCiente }: { onCiente: () => void }) => {
  function ciente() {
    const now = new Date();
    localStorage.setItem("ciente", "true");
    localStorage.setItem("cienteData", now.toISOString()); // salva a data de aceite
    onCiente();
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
          <button id="agree" onClick={ciente}>
            Sim
            <IoCheckmarkSharp size={20} />
          </button>
          <button id="agree" onClick={ciente}>
            Com certeza
            <IoCheckmarkSharp size={20} />
          </button>
        </div>
      </AvisoModalStyle>
    </BackgroudModalStyle>
  );
};
