import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./context/main.context.tsx";
import { ResetStyle } from "./resetStyles.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <ResetStyle />
    <MainProvider>
      <App />
    </MainProvider>
  </>
);
