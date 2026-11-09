import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ACCIONES, estadoInicial, inventarioReducer } from "./inventarioReducer.js";

const InventoryContext = createContext(null);

// Valida cada registro del JSON para que un dato incompleto no rompa el renderizado.
function articuloEsValido(item) {
  return (
    item &&
    typeof item.id === "number" &&
    typeof item.nombre === "string" &&
    typeof item.marca === "string" &&
    typeof item.categoria === "string" &&
    typeof item.precio === "number" &&
    typeof item.stock === "number"
  );
}

// Provee el inventario y el carrito a toda la aplicación (estado global con useReducer + Context).
export function InventoryProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, estadoInicial);
  // Estado de la petición: loading | success | error
  const [estadoCarga, setEstadoCarga] = useState("loading");
  const [errorMensaje, setErrorMensaje] = useState("");

  // Carga el inventario una sola vez al montar; la limpieza evita actualizar el estado si el componente se desmonta.
  useEffect(() => {
    const controller = new AbortController();
    let activo = true;

    async function cargarInventario() {
      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/inventario.json`, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("El archivo de inventario no tiene el formato esperado.");
        }

        if (activo) {
          dispatch({ type: ACCIONES.CARGAR, payload: datos.filter(articuloEsValido) });
          setEstadoCarga("success");
        }
      } catch (error) {
        if (activo && error.name !== "AbortError") {
          console.error("No se pudo cargar el inventario:", error);
          setErrorMensaje("No se pudo cargar el inventario en este momento. Intenta nuevamente más tarde.");
          setEstadoCarga("error");
        }
      }
    }

    cargarInventario();

    return () => {
      activo = false;
      controller.abort();
    };
  }, []);

  const value = useMemo(() => {
    // Cada línea del carrito se enriquece con los datos del artículo y su subtotal.
    const carrito = estado.carrito
      .map((linea) => {
        const item = estado.items.find((articulo) => articulo.id === linea.id);
        return item ? { ...item, cantidad: linea.cantidad, subtotal: item.precio * linea.cantidad } : null;
      })
      .filter(Boolean);

    return {
      items: estado.items,
      carrito,
      totalItems: carrito.reduce((suma, linea) => suma + linea.cantidad, 0),
      total: carrito.reduce((suma, linea) => suma + linea.subtotal, 0),
      estadoCarga,
      errorMensaje,
      agregarArticulo: (datos) => dispatch({ type: ACCIONES.AGREGAR_ARTICULO, payload: datos }),
      agregarAlCarrito: (id, cantidad) => dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id, cantidad } }),
      aumentar: (id) => dispatch({ type: ACCIONES.AUMENTAR, payload: { id } }),
      disminuir: (id) => dispatch({ type: ACCIONES.DISMINUIR, payload: { id } }),
      quitarDelCarrito: (id) => dispatch({ type: ACCIONES.QUITAR, payload: { id } }),
      vaciarCarrito: () => dispatch({ type: ACCIONES.VACIAR }),
      finalizarCompra: () => dispatch({ type: ACCIONES.FINALIZAR }),
    };
  }, [estado, estadoCarga, errorMensaje]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const contexto = useContext(InventoryContext);
  if (!contexto) {
    throw new Error("useInventory debe usarse dentro de <InventoryProvider>");
  }
  return contexto;
}
