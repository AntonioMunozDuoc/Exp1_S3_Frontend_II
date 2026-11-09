import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";

const claseEnlace = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-white text-marca-oscuro" : "text-white hover:bg-marca-oscuro"
  }`;

// Menú superior: inventario, agregar artículo y carrito (con la cantidad de unidades).
function Navbar() {
  const { totalItems } = useInventory();
  // Controla el menú desplegable en pantallas pequeñas.
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="sticky top-0 z-20 bg-marca-primario shadow-md" aria-label="Menú principal">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="font-titulo text-lg font-bold text-white">
          🛒 Supermercado
        </Link>

        <button
          type="button"
          className="rounded-lg px-3 py-2 text-white ring-1 ring-white/50 sm:hidden"
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label="Abrir menú de navegación"
        >
          ☰
        </button>

        <div
          id="menu-principal"
          className={`${menuAbierto ? "flex" : "hidden"} w-full flex-col gap-1 sm:flex sm:w-auto sm:flex-row`}
          onClick={() => setMenuAbierto(false)}
        >
          <NavLink to="/inventario" className={claseEnlace}>
            Inventario
          </NavLink>
          <NavLink to="/agregar" className={claseEnlace}>
            Agregar artículo
          </NavLink>
          <NavLink to="/carrito" className={claseEnlace}>
            Carrito
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-marca-acento px-2 py-0.5 text-xs font-bold text-slate-900">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
