import logo from "../../shared/images/Gemini_Generated_Image_bb59e1bb59e1bb59.png";
import { HeaderStyle } from "./header.style";

export const HeaderComponent = () => {
  return (
    <HeaderStyle>
      <div>
        <img src={logo} alt="" />
        <h1>Calculadora de Notas</h1>
        {/* <AboutComponent /> */}
      </div>
    </HeaderStyle>
  );
};
