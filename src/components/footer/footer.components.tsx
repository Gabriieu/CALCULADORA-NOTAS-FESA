import { FooterStyle } from "./footer.style";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

export const FooterComponent = () => {
  return (
    <FooterStyle>
      <div id="footer-header">
        <span id="developed-by">Desenvolvido por José Gabriel</span>
      </div>
      <div id="footer-socials">
        <a
          id="github"
          href="https://github.com/Gabriieu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          id="linkedin"
          href="https://www.linkedin.com/in/jos%C3%A9gabrielsouza/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          id="portfolio"
          href="https://josegabriel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLink />
        </a>
      </div>
    </FooterStyle>
  );
};
