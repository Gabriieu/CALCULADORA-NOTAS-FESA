import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { MainProvider } from "./context/main.context.tsx";
import { TemaProvider } from "./context/theme.context.tsx";
import { GlobalStyle } from "./styles/globalStyles.ts";
import { ResetStyle } from "./styles/resetStyles.ts";
import { BrowserRouter } from "react-router-dom";
import { HeaderComponent } from "./components/header/header.component.tsx";
import { FooterComponent } from "./components/footer/footer.components.tsx";
import { ErrorBoundary } from "./components/error-boundary/error-boundary.component.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <ResetStyle />
    <GlobalStyle />
    <ErrorBoundary>
      <BrowserRouter>
        <TemaProvider>
          <MainProvider>
            <HeaderComponent />
            <App />
            <Analytics />
            <FooterComponent />
          </MainProvider>
        </TemaProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </>
);
