import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import { UrlServicesProvider } from "components/UrlServicesContext";

import Index from "views/Index.js";
import SuperAdmin from "layouts/SuperAdmin.js";
import ProjectsPage from "views/ProjectsPage.js";
import SingleProjectPage from "views/SingleProjectPage.js";
import SingleInformationPage from "views/SingleInformationPage.js";
import RegisterPage from "views/IndexSections/RegisterPage.js";
import Page404 from "views/404.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <UrlServicesProvider>
      <Routes>
        <Route path="/login" element={<Index />} />
        <Route path="/account/*" element={<SuperAdmin />} />
        <Route path="/information" element={<SingleInformationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project" element={<SingleProjectPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </UrlServicesProvider>
  </BrowserRouter>
);
