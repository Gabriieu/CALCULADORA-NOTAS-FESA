import { Squash as Hamburger } from "hamburger-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  BsFillBrightnessHighFill,
  BsFillMoonStarsFill,
  BsHouseFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useTema } from "../../context/theme.context";
import logo from "../../shared/images/logo-header.webp";
import {
  BrandLink,
  HeaderContainer,
  IconeTema,
  Navegacao,
  ThemeToggle,
} from "./header.style";

// o sol gira ao nascer; a lua se inclina ao surgir
const ENTRADA_ICONE = {
  sol: [
    { transform: "rotate(-180deg) scale(0.2)", opacity: 0 },
    { transform: "rotate(0deg) scale(1)", opacity: 1 },
  ],
  lua: [
    { transform: "rotate(-70deg) scale(0.2)", opacity: 0 },
    { transform: "rotate(0deg) scale(1)", opacity: 1 },
  ],
};

// o hamburger-react renderiza o botão como <div role="button"> e não expõe ref nem aria-controls
const encontrarBotao = (raiz: HTMLElement | null) =>
  raiz?.querySelector<HTMLElement>('[role="button"]') ?? null;

export const HeaderComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const { tema, alternarTema } = useTema();
  const menuId = useId();
  const menuRef = useRef<HTMLElement>(null);
  const botaoRef = useRef<HTMLDivElement>(null);
  const iconeRef = useRef<HTMLSpanElement>(null);
  const temaAnterior = useRef(tema);

  const temaDestino = tema === "dark" ? "claro" : "escuro";

  // roda dentro do flushSync da troca, já com o ícone novo, então a animação aparece na tela nova;
  // comparar com o tema anterior evita animar na primeira renderização
  useLayoutEffect(() => {
    if (temaAnterior.current === tema) return;
    temaAnterior.current = tema;
    // o botão mostra o sol no tema escuro e a lua no claro
    iconeRef.current?.animate(ENTRADA_ICONE[tema === "dark" ? "sol" : "lua"], {
      duration: 700,
      delay: 100,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      fill: "backwards",
    });
  }, [tema]);

  useEffect(() => {
    encontrarBotao(botaoRef.current)?.setAttribute("aria-controls", menuId);
  }, [menuId]);

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
      if (e.key !== "Escape") return;
      setOpen(false);
      // sem isso o foco se perde, já que o menu some
      encontrarBotao(botaoRef.current)?.focus();
    };

    document.addEventListener("pointerdown", fecharAoTocarFora);
    document.addEventListener("keydown", fecharComEsc);
    return () => {
      document.removeEventListener("pointerdown", fecharAoTocarFora);
      document.removeEventListener("keydown", fecharComEsc);
    };
  }, [isOpen]);

  // a lib só reage ao Enter; um botão também precisa responder ao Espaço
  const alternarComEspaco = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " && e.target === encontrarBotao(botaoRef.current)) {
      e.preventDefault();
      setOpen((aberto) => !aberto);
    }
  };

  const fecharMenu = () => setOpen(false);

  return (
    <HeaderContainer>
      <div className="header-content">
        <BrandLink to="/" onClick={fecharMenu}>
          <img src={logo} alt="" width={150} height={143} />
          <span>Notas FESA</span>
        </BrandLink>

        <ThemeToggle
          type="button"
          onClick={() => alternarTema()}
          aria-label={`Mudar para o tema ${temaDestino}`}
          title={`Tema ${temaDestino}`}
        >
          <IconeTema ref={iconeRef}>
            {tema === "dark" ? (
              <BsFillBrightnessHighFill aria-hidden />
            ) : (
              <BsFillMoonStarsFill aria-hidden />
            )}
          </IconeTema>
        </ThemeToggle>

        <div className="menu-botao" ref={botaoRef} onKeyDown={alternarComEspaco}>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={33}
            label="Menu"
            hideOutline={false}
          />
        </div>

        <Navegacao
          id={menuId}
          ref={menuRef}
          aria-label="Principal"
          $aberto={isOpen}
        >
          <NavLink to="/" end onClick={fecharMenu}>
            <BsHouseFill aria-hidden /> Início
          </NavLink>
          <NavLink to="/sobre" onClick={fecharMenu}>
            <BsInfoCircleFill aria-hidden /> Sobre
          </NavLink>
        </Navegacao>
      </div>
    </HeaderContainer>
  );
};
