import { NavLink } from "react-router-dom";

const OPCIONES = [
  { to: "/", label: "Inicio", icono: "🏠", end: true },
  { to: "/quienes-somos", label: "Quiénes somos", icono: "ℹ️" },
  { to: "/contacto", label: "Contáctanos", icono: "✉️" },
];

// Menú inferior fijo con las páginas informativas del sitio.
function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"
      aria-label="Menú inferior"
    >
      <ul className="mx-auto grid max-w-5xl grid-cols-3">
        {OPCIONES.map(({ to, label, icono, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition ${
                  isActive ? "text-marca-primario" : "text-slate-600 hover:text-marca-primario"
                }`
              }
            >
              <span aria-hidden="true" className="text-lg">
                {icono}
              </span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
