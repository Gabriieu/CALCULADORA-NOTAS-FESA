import { FooterStyle } from "./footer.style";

export const FooterComponent = () => {
  return (
    <FooterStyle>
      <p>[Beta]</p>
      <span id="developed-by">
        Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/jos%C3%A9gabrielsouza/"
          target="_blank"
        >
          José Gabriel
        </a>
      </span>
    </FooterStyle>
  );
};
