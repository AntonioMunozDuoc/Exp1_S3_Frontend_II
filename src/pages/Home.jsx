import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import LoadingState from "../components/LoadingState.jsx";

function Home() {
  const { items, totalItems, estadoCarga, errorMensaje } = useInventory();
  const totalUnidades = items.reduce((suma, item) => suma + item.stock, 0);

  const resumen = [
    ["Artículos distintos", items.length],
    ["Unidades disponibles", totalUnidades],
    ["Unidades en tu carrito", totalItems],
  ];

  return (
    <section>
      <div className="tarjeta bg-gradient-to-br from-marca-primario to-marca-oscuro text-white">
        <h1 className="text-3xl sm:text-4xl">Gestión de inventario</h1>
        <p className="mt-2 max-w-xl text-green-50">
          Administra los productos de tu supermercado: agrégalos, fíltralos por categoría, revisa su detalle y arma un
          carrito que actualiza el inventario en tiempo real.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/inventario" className="btn bg-white text-marca-oscuro hover:bg-green-50">
            Ver inventario
          </Link>
          <Link to="/agregar" className="btn bg-marca-acento text-slate-900 hover:bg-amber-400">
            Agregar artículo
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <LoadingState estado={estadoCarga} errorMensaje={errorMensaje}>
          <div className="grid gap-4 sm:grid-cols-3">
            {resumen.map(([etiqueta, valor]) => (
              <div key={etiqueta} className="tarjeta text-center">
                <p className="text-3xl font-bold text-marca-primario">{valor}</p>
                <p className="text-sm text-slate-600">{etiqueta}</p>
              </div>
            ))}
          </div>
        </LoadingState>
      </div>
    </section>
  );
}

export default Home;
