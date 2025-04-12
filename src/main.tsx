import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./context/main.context.tsx";
import { ResetStyle } from "./resetStyles.ts";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <>
    <ResetStyle />
    <MainProvider>
      <App />
      <Analytics />
    </MainProvider>
  </>
);
