import { Route, Routes } from "react-router-dom";
import { AboutPage } from "../pages/about/about-page.index";
import { HomePage } from "../pages/home/home-page.index";
import { Page404 } from "../pages/404/404-page.index";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
