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
        {2025 - new Date().getFullYear() === 0 ? (
          <span>© 2025 José Gabriel. Todos os direitos reservados.</span>
        ) : (
          <span>
            © 2025 - {new Date().getFullYear()} José Gabriel. Todos os direitos
            reservados.
          </span>
        )}
      </div>
    </FooterStyle>
  );
};
