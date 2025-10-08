import { Page404Style } from "./404-page.style";

export const Page404 = () => {
  return (
    <Page404Style>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>
        😯Ops... Parece que o endereço digitado não existe. Verifique o link ou
        volte para a página inicial.
      </p>
      <a href="/">Voltar para o início</a>
    </Page404Style>
  );
};
