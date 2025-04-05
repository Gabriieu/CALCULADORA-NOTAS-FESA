import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./context/main.provider.tsx";
import { ResetStyle } from "./resetStyles.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResetStyle />
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
