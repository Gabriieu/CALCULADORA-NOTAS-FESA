import { useEffect, useState } from "react";
import { SlQuestion } from "react-icons/sl";
import { AboutStyle } from "./about.style";

export const AboutComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBlink(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AboutStyle>
      <SlQuestion
        className={`icon ${blink ? "blink" : ""}`}
        onClick={() => setShowModal(!showModal)}
        title="Sobre o projeto"
        color="orange"
      />

      {showModal && (
        <>
          <div id="modal-background" onClick={() => setShowModal(false)} />
          <dialog open>
            <div className="modal-header">
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <h2>SOBRE O PROJETO</h2>
            <p>
              <strong>Disclaimer:</strong> Este projeto é independente e não
              possui qualquer vínculo com a{" "}
              <strong>Faculdade Engenheiro Salvador Arena</strong>. Seu objetivo
              é apenas oferecer uma ferramenta de apoio para que os alunos
              acompanhem suas notas de forma prática. Em caso de dúvidas ou
              divergências, recomenda-se entrar em contato diretamente com o
              professor responsável.
            </p>
            <br />
            <p>
              Caso identifique que a grade está desatualizada ou incompleta,
              entre em contato com o desenvolvedor para solicitar as devidas
              correções.
            </p>
            <br />
            <span id="att">Última atualização: 1º Semestre - 2025</span>
          </dialog>
        </>
      )}
    </AboutStyle>
  );
};
