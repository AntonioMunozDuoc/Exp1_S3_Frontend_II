import { formatPrice } from "../utils/precios.js";
import Button from "./Button.jsx";

// Línea del carrito con los controles para aumentar o disminuir la cantidad.
function CartItem({ item, onAumentar, onDisminuir, onQuitar }) {
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-800">{item.nombre}</p>
        <p className="text-sm text-slate-500">
          {item.marca} · {formatPrice(item.precio)} c/u
        </p>
        <p className="text-xs text-slate-500">Disponibles en inventario: {item.stock}</p>
      </div>

      <div className="flex items-center gap-2" role="group" aria-label={`Cantidad de ${item.nombre}`}>
        <Button
          variante="secundario"
          className="px-3"
          onClick={() => onDisminuir(item.id)}
          aria-label={`Disminuir cantidad de ${item.nombre}`}
        >
          −
        </Button>
        <span className="w-8 text-center font-semibold" aria-live="polite">
          {item.cantidad}
        </span>
        <Button
          variante="secundario"
          className="px-3"
          onClick={() => onAumentar(item.id)}
          disabled={item.stock === 0}
          aria-label={`Aumentar cantidad de ${item.nombre}`}
        >
          +
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 sm:w-48 sm:justify-end">
        <span className="font-bold text-slate-800">{formatPrice(item.subtotal)}</span>
        <Button variante="peligro" className="px-3 py-1" onClick={() => onQuitar(item.id)}>
          Quitar
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
