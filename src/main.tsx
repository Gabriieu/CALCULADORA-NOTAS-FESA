import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./context/main.context.tsx";
import { GlobalStyle } from "./styles/globalStyles.ts";
import { ResetStyle } from "./styles/resetStyles.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <ResetStyle />
    <GlobalStyle />
    <MainProvider>
      <App />
      <Analytics />
    </MainProvider>
  </>
);
