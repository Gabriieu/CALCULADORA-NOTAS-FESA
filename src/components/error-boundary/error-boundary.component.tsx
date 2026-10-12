import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErroTelaStyle } from "./error-boundary.style";

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  falhou: boolean;
}

// sem isto, qualquer erro durante a renderização deixa a tela inteira em branco
export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state: IErrorBoundaryState = { falhou: false };

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { falhou: true };
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    console.error(erro, info.componentStack);
  }

  render() {
    if (!this.state.falhou) return this.props.children;

    return (
      <ErroTelaStyle role="alert">
        <h1>Algo deu errado</h1>
        <p>
          Não foi possível exibir a calculadora. Isso pode acontecer se o
          navegador estiver bloqueando o armazenamento de dados do site. Tente
          recarregar a página.
        </p>
        <button type="button" onClick={() => window.location.reload()}>
          Recarregar a página
        </button>
      </ErroTelaStyle>
    );
  }
}
