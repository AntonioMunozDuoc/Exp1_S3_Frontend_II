/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind elimina (purge) en producción todas las clases que no aparezcan en estos archivos.
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Tema propio del supermercado: se usa como bg-marca-primario, text-marca-oscuro, etc.
      colors: {
        marca: {
          primario: "#15803d",
          oscuro: "#166534",
          claro: "#dcfce7",
          acento: "#f59e0b",
        },
      },
      fontFamily: {
        titulo: ['"Space Grotesk"', "sans-serif"],
        cuerpo: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
