import { Link } from "react-router-dom";
import { buscarCategoria } from "../utils/categorias.js";
import { formatPrice } from "../utils/precios.js";
import StockBadge from "./StockBadge.jsx";

// Tabla del inventario; cada fila lleva a la pantalla de detalle del artículo.
function InventoryTable({ items }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-md ring-1 ring-slate-100">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Nombre
            </th>
            <th scope="col" className="px-4 py-3">
              Marca
            </th>
            <th scope="col" className="px-4 py-3">
              Tipo de producto
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Precio
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Stock
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => {
            const categoria = buscarCategoria(item.categoria);

            return (
              <tr key={item.id} className="transition hover:bg-marca-claro/50">
                <td className="px-4 py-3 font-medium text-slate-800">
                  <Link to={`/inventario/${item.id}`} className="hover:text-marca-primario hover:underline">
                    {item.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.marca}</td>
                <td className="px-4 py-3 text-slate-600">
                  {categoria ? `${categoria.icono} ${categoria.label}` : item.categoria}
                </td>
                <td className="px-4 py-3 text-right text-slate-800">{formatPrice(item.precio)}</td>
                <td className="px-4 py-3 text-center">
                  <StockBadge stock={item.stock} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/inventario/${item.id}`}
                    className="btn btn-secundario px-3 py-1"
                    aria-label={`Ver detalle de ${item.nombre}`}
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
