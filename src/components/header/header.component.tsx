import { HeaderStyle } from "./header.style";
import logo from "../../shared/images/logo.png";
import { AboutComponent } from "../about/about.component";

export const HeaderComponent = () => {
  return (
    <HeaderStyle>
      <div>
        <img src={logo} alt="" />
        <h1>Calculadora de Notas</h1>
        <AboutComponent />
      </div>
    </HeaderStyle>
  );
};
