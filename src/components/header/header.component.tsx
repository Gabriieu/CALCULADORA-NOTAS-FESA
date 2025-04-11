import { HeaderStyle } from "./header.style";
import logo from "../../../public/logo.png";

export const HeaderComponent = () => {
  return (
    <HeaderStyle>
      <div>
        <img src={logo} alt="" />
        <h1>Calculadora de Notas</h1>
      </div>
    </HeaderStyle>
  );
};
