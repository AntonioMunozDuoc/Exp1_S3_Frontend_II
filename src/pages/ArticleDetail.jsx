import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import { buscarCategoria } from "../utils/categorias.js";
import { formatPrice } from "../utils/precios.js";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StockBadge from "../components/StockBadge.jsx";

function ArticleDetail() {
  // El parámetro dinámico :id de la ruta /inventario/:id
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, agregarAlCarrito, estadoCarga, errorMensaje } = useInventory();
  // La cantidad se guarda como texto para permitir borrar el campo mientras se escribe.
  const [cantidad, setCantidad] = useState("1");
  const [mensaje, setMensaje] = useState("");

  const item = items.find((articulo) => articulo.id === Number(id));

  function handleAgregar() {
    // Al agregar, la cantidad se acota entre 1 y el stock disponible.
    const unidades = Math.min(Math.max(1, Math.floor(Number(cantidad)) || 1), item.stock);
    agregarAlCarrito(item.id, unidades);
    setMensaje(`Se agregaron ${unidades} unidad(es) al carrito.`);
    setCantidad("1");
  }

  return (
    <LoadingState estado={estadoCarga} errorMensaje={errorMensaje}>
      {!item ? (
        <div className="tarjeta text-center">
          <p className="text-slate-600">El artículo solicitado no existe.</p>
          <Link to="/inventario" className="btn btn-primario mt-4">
            Volver al inventario
          </Link>
        </div>
      ) : (
        <section>
          <PageHeader titulo={item.nombre} subtitulo={`${item.marca} · ${buscarCategoria(item.categoria)?.label ?? item.categoria}`}>
            <Button variante="secundario" onClick={() => navigate(-1)}>
              ← Volver
            </Button>
          </PageHeader>

          <div className="tarjeta grid gap-6 sm:grid-cols-2">
            <dl className="space-y-3">
              <div>
                <dt className="text-xs uppercase text-slate-500">Precio</dt>
                <dd className="text-2xl font-bold text-marca-primario">{formatPrice(item.precio)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-500">Descripción</dt>
                <dd className="text-slate-700">{item.descripcion || "Sin descripción."}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-500">Disponibilidad</dt>
                <dd>
                  <StockBadge stock={item.stock} />
                </dd>
              </div>
            </dl>

            <div className="flex flex-col justify-center gap-3">
              <label htmlFor="cantidad" className="text-sm font-medium text-slate-700">
                Cantidad
              </label>
              <input
                id="cantidad"
                type="number"
                min="1"
                max={item.stock}
                className="campo sm:w-32"
                value={cantidad}
                disabled={item.stock === 0}
                onChange={(event) => setCantidad(event.target.value)}
              />
              <Button onClick={handleAgregar} disabled={item.stock === 0}>
                🛒 Agregar al carrito
              </Button>
              {mensaje && (
                <p className="text-sm text-green-800" role="status">
                  {mensaje}{" "}
                  <Link to="/carrito" className="font-semibold underline">
                    Ir al carrito
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </LoadingState>
  );
}

export default ArticleDetail;
