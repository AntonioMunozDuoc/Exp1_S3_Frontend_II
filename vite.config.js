import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` debe coincidir con el nombre del repositorio para que los recursos carguen en gh-pages.
export default defineConfig({
  plugins: [react()],
  base: "/supermercado-antonio-munoz-PFY2202/",
});
