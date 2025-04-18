import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FooterStyle } from "./footer.style";
import ShareButton from "../share-button/share-button.component";

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
        <ShareButton />
      </div>
      <div id="footer-note">
        <span>© 2025 - Feito com carinho, café e TypeScript.</span>
      </div>
    </FooterStyle>
  );
};
