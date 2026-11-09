import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";

// HashRouter evita errores 404 al recargar una ruta cuando el sitio está publicado en GitHub Pages.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </HashRouter>
  </StrictMode>
);
