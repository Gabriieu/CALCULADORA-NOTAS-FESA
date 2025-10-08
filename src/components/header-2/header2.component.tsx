import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { FcHome, FcInfo } from "react-icons/fc";
import logo from "../../shared/images/Gemini_Generated_Image_bb59e1bb59e1bb59.png";
import { DropdownMenu, HeaderContainer, ThemeToggle } from "./header2.style";

export const HeaderComponent2 = () => {
  const [isOpen, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.setAttribute("data-theme", !isDark ? "dark" : "light");
  };

  return (
    <HeaderContainer>
      <div className="header-content">
        <img src={logo} alt="" />
        <Hamburger toggled={isOpen} toggle={setOpen} size={33} />
      </div>

      {isOpen && (
        <DropdownMenu>
          <a href="/">
            <FcHome /> Início
          </a>
          {isDark ? (
            <ThemeToggle onClick={toggleTheme}>
              <BsFillMoonStarsFill /> Dark
            </ThemeToggle>
          ) : (
            <ThemeToggle onClick={toggleTheme}>
              <BsFillBrightnessHighFill /> Light
            </ThemeToggle>
          )}
          <a href="/sobre">
            <FcInfo /> Sobre
          </a>
        </DropdownMenu>
      )}
    </HeaderContainer>
  );
};
