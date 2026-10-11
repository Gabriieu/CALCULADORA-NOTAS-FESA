import { Squash as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { FcHome, FcInfo } from "react-icons/fc";
import { useTema } from "../../context/theme.context";
import logo from "../../shared/images/Gemini_Generated_Image_bb59e1bb59e1bb59.png";
import { DropdownMenu, HeaderContainer, ThemeToggle } from "./header.style";

export const HeaderComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const { tema, alternarTema } = useTema();
  const menuRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLDivElement>(null);

  // fecha o menu ao tocar fora dele ou ao apertar Esc
  useEffect(() => {
    if (!isOpen) return;

    const fecharAoTocarFora = (e: PointerEvent) => {
      const alvo = e.target as Node;
      // o botão do hambúrguer já alterna o menu sozinho; se fechasse aqui, o clique o reabriria
      if (menuRef.current?.contains(alvo) || botaoRef.current?.contains(alvo)) {
        return;
      }
      setOpen(false);
    };
    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", fecharAoTocarFora);
    document.addEventListener("keydown", fecharComEsc);
    return () => {
      document.removeEventListener("pointerdown", fecharAoTocarFora);
      document.removeEventListener("keydown", fecharComEsc);
    };
  }, [isOpen]);

  return (
    <HeaderContainer>
      <div className="header-content">
        <img src={logo} alt="" />
        <div ref={botaoRef}>
          <Hamburger toggled={isOpen} toggle={setOpen} size={33} />
        </div>
      </div>

      {isOpen && (
        <DropdownMenu ref={menuRef}>
          <a href="/" onClick={() => setOpen(false)}>
            <FcHome /> Início
          </a>
          <ThemeToggle
            type="button"
            onClick={() => {
              alternarTema();
              setOpen(false);
            }}
          >
            {tema === "dark" ? (
              <>
                <BsFillBrightnessHighFill /> Tema claro
              </>
            ) : (
              <>
                <BsFillMoonStarsFill /> Tema escuro
              </>
            )}
          </ThemeToggle>
          <a href="/sobre" onClick={() => setOpen(false)}>
            <FcInfo /> Sobre
          </a>
        </DropdownMenu>
      )}
    </HeaderContainer>
  );
};
