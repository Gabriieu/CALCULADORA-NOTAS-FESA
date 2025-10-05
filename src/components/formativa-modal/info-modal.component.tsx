import { useEffect, useState } from "react";
import { SlQuestion } from "react-icons/sl";
import { FormativaModalStyle } from "./info-modal.style";
import { FcInfo } from "react-icons/fc";

interface IInfoModalComponentProp {
  titulo: string;
  descricao: string;
}
export const InfoModalComponent = ({
  titulo,
  descricao,
}: IInfoModalComponentProp) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBlink(false), 5000);
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
            <h2><FcInfo /> {titulo}</h2>
            <p>{descricao}</p>
          </dialog>
        </>
      )}
    </FormativaModalStyle>
  );
};
