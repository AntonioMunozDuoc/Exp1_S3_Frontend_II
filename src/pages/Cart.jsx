import { useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import { formatPrice } from "../utils/precios.js";
import Button from "../components/Button.jsx";
import CartItem from "../components/CartItem.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LoadingState from "../components/LoadingState.jsx";

function Cart() {
  const {
    carrito,
    total,
    totalItems,
    aumentar,
    disminuir,
    quitarDelCarrito,
    vaciarCarrito,
    finalizarCompra,
    estadoCarga,
    errorMensaje,
  } = useInventory();
  const [compraExitosa, setCompraExitosa] = useState(false);

  function handleFinalizar() {
    finalizarCompra();
    setCompraExitosa(true);
  }

  return (
    <section>
      <LoadingState estado={estadoCarga} errorMensaje={errorMensaje}>
        {carrito.length === 0 ? (
          <>
            <PageHeader titulo="Carrito de compras" />
            <div className="tarjeta text-center text-slate-600">
              {compraExitosa ? (
                <p className="mb-2 font-semibold text-green-800" role="status">
                  ✅ ¡Compra realizada con éxito!
                </p>
              ) : (
                <p className="mb-2">Tu carrito está vacío.</p>
              )}
              <Link to="/inventario" className="btn btn-primario mt-2">
                Ir al inventario
              </Link>
            </div>
          </>
        ) : (
          <>
            <PageHeader titulo="Carrito de compras" subtitulo={`${totalItems} unidad(es) en el carrito`}>
              <Button variante="secundario" onClick={vaciarCarrito}>
                Vaciar carrito
              </Button>
            </PageHeader>

            <div className="tarjeta">
              <ul className="divide-y divide-slate-100">
                {carrito.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onAumentar={aumentar}
                    onDisminuir={disminuir}
                    onQuitar={quitarDelCarrito}
                  />
                ))}
              </ul>

              <div className="mt-4 flex flex-col items-end gap-3 border-t border-slate-200 pt-4">
                <p className="text-lg">
                  Total: <span className="text-2xl font-bold text-marca-primario">{formatPrice(total)}</span>
                </p>
                <Button onClick={handleFinalizar}>Finalizar compra</Button>
              </div>
            </div>
          </>
        )}
      </LoadingState>
    </section>
  );
}

export default Cart;
