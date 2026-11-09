import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { buscarCategoria } from "../utils/categorias.js";
import PageHeader from "../components/PageHeader.jsx";
import LoadingState from "../components/LoadingState.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import InventoryTable from "../components/InventoryTable.jsx";

function Inventory() {
  const { items, estadoCarga, errorMensaje } = useInventory();

  // El filtro y la búsqueda viven en estados locales: el inventario original NUNCA se modifica,
  // solo se calcula una lista derivada (itemsFiltrados) a partir de él.
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 300);

  const itemsFiltrados = useMemo(() => {
    const termino = busquedaDebounced.trim().toLowerCase();

    return items.filter((item) => {
      const coincideCategoria = categoriaActiva === "todas" || item.categoria === categoriaActiva;
      const coincideBusqueda =
        termino === "" || item.nombre.toLowerCase().includes(termino) || item.marca.toLowerCase().includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  }, [items, categoriaActiva, busquedaDebounced]);

  const nombreCategoria = buscarCategoria(categoriaActiva)?.label ?? "la categoría seleccionada";

  return (
    <section>
      <PageHeader titulo="Inventario" subtitulo="Haz clic en un artículo para ver su detalle.">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <div className="w-full sm:w-52">
            <label htmlFor="busqueda" className="mb-1 block text-sm font-medium text-slate-700">
              Buscar
            </label>
            <input
              id="busqueda"
              type="search"
              className="campo"
              placeholder="Nombre o marca"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>
          <CategoryFilter valor={categoriaActiva} onChange={setCategoriaActiva} />
        </div>
      </PageHeader>

      <LoadingState estado={estadoCarga} errorMensaje={errorMensaje}>
        <p className="mb-3 text-sm text-slate-600" aria-live="polite">
          Mostrando {itemsFiltrados.length} de {items.length} artículos
        </p>

        {itemsFiltrados.length > 0 ? (
          <InventoryTable items={itemsFiltrados} />
        ) : (
          <div className="tarjeta text-center text-slate-600">
            No se encontraron artículos
            {categoriaActiva !== "todas" ? ` en ${nombreCategoria}` : ""}.{" "}
            <Link to="/agregar" className="font-semibold text-marca-primario hover:underline">
              Agrega uno
            </Link>
            .
          </div>
        )}
      </LoadingState>
    </section>
  );
}

export default Inventory;
