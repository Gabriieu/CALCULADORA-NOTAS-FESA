import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AboutPage } from "../pages/about/about-page.index";
import { HomePage } from "../pages/home/home-page.index";
import { Page404 } from "../pages/404/404-page.index";

export const RoutesMain = () => {
  const { pathname } = useLocation();
  const pathAnterior = useRef(pathname);

  // os links do header deixaram de recarregar a página, então o scroll não volta ao topo sozinho;
  // o guard evita mexer no scroll restaurado pelo navegador num refresh
  useEffect(() => {
    if (pathAnterior.current === pathname) return;
    pathAnterior.current = pathname;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
