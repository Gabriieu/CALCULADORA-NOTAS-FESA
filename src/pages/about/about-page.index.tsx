import { AboutPageStyle } from "./about-page.style";

export const AboutPage = () => {
  return (
    <AboutPageStyle>
      <section className="about-container">
        <h1>Calculadora de Notas FESA</h1>

        <p>
          Este projeto foi desenvolvido para auxiliar os estudantes da{" "}
          <strong>Faculdade Engenheiro Salvador Arena (FESA)</strong> no
          acompanhamento de suas notas.
        </p>

        <p>
          É importante destacar que esta ferramenta não possui vínculo oficial
          com a instituição. Podem ocorrer divergências de arredondamento,
          imprecisões ou diferenças na grade curricular. Assim, os resultados
          aqui exibidos são apenas <strong>referenciais</strong> e{" "}
          <strong>não devem ser considerados oficiais</strong>.
        </p>

        <p>
          Em caso de dúvidas ou inconsistências, recomenda-se procurar o
          professor responsável ou a própria instituição.
        </p>

        <div className="divider"></div>

        <p>
          Caso identifique algum problema ou deseje sugerir melhorias, você pode
          entrar em contato com o desenvolvedor via LinkedIn{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/jos%C3%A9gabrielsouza/"
          >
            clicando aqui.
          </a>
        </p>
      </section>
    </AboutPageStyle>
  );
};
