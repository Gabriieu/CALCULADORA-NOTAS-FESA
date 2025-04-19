import { useEffect, useState } from "react";
import { SlQuestion } from "react-icons/sl";
import { FormativaModalStyle } from "./about.style";

export const FormativaModalComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBlink(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FormativaModalStyle>
      <SlQuestion
        className={`icon ${blink ? "blink" : ""}`}
        onClick={() => setShowModal(!showModal)}
        color="orange"
      />

      {showModal && (
        <>
          <div
            id="modal-background"
            onClick={() => setShowModal(false)}
            onWheel={() => setShowModal(false)}
            onTouchMove={() => setShowModal(false)}
          />
          <dialog open>
            <div className="modal-header">
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <h2>Avaliação Formativa</h2>
            <p>
              A avaliação formativa é aplicada no segundo bimestre de cada
              semestre e corresponde a 50% do valor da nota N1 do 2º bimestre.
            </p>
          </dialog>
        </>
      )}
    </FormativaModalStyle>
  );
};
