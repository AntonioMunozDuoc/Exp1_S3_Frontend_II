// Reducer del estado global: `items` es el inventario general (con el stock disponible)
// y `carrito` guarda solo { id, cantidad }, para que el stock tenga una única fuente de verdad.

export const ACCIONES = {
  CARGAR: "CARGAR",
  AGREGAR_ARTICULO: "AGREGAR_ARTICULO",
  AGREGAR_AL_CARRITO: "AGREGAR_AL_CARRITO",
  AUMENTAR: "AUMENTAR",
  DISMINUIR: "DISMINUIR",
  QUITAR: "QUITAR",
  VACIAR: "VACIAR",
  FINALIZAR: "FINALIZAR",
};

export const estadoInicial = { items: [], carrito: [] };

// Mueve `cantidad` unidades del inventario al carrito, sin superar el stock disponible.
function moverAlCarrito(estado, id, cantidad) {
  const item = estado.items.find((articulo) => articulo.id === id);
  if (!item) return estado;

  const unidades = Math.min(Math.floor(cantidad), item.stock);
  if (unidades <= 0) return estado;

  const items = estado.items.map((articulo) =>
    articulo.id === id ? { ...articulo, stock: articulo.stock - unidades } : articulo
  );

  const enCarrito = estado.carrito.find((linea) => linea.id === id);
  const carrito = enCarrito
    ? estado.carrito.map((linea) => (linea.id === id ? { ...linea, cantidad: linea.cantidad + unidades } : linea))
    : [...estado.carrito, { id, cantidad: unidades }];

  return { ...estado, items, carrito };
}

export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case ACCIONES.CARGAR:
      return { items: accion.payload, carrito: [] };

    // El id nuevo es el mayor existente + 1.
    case ACCIONES.AGREGAR_ARTICULO: {
      const nuevoId = estado.items.reduce((mayor, item) => Math.max(mayor, item.id), 0) + 1;
      return { ...estado, items: [...estado.items, { ...accion.payload, id: nuevoId }] };
    }

    case ACCIONES.AGREGAR_AL_CARRITO:
      return moverAlCarrito(estado, accion.payload.id, accion.payload.cantidad);

    case ACCIONES.AUMENTAR:
      return moverAlCarrito(estado, accion.payload.id, 1);

    // Devuelve una unidad al inventario; si la línea llega a 0 se elimina del carrito.
    case ACCIONES.DISMINUIR: {
      const linea = estado.carrito.find((item) => item.id === accion.payload.id);
      if (!linea) return estado;

      const items = estado.items.map((articulo) =>
        articulo.id === linea.id ? { ...articulo, stock: articulo.stock + 1 } : articulo
      );
      const carrito =
        linea.cantidad === 1
          ? estado.carrito.filter((item) => item.id !== linea.id)
          : estado.carrito.map((item) => (item.id === linea.id ? { ...item, cantidad: item.cantidad - 1 } : item));

      return { ...estado, items, carrito };
    }

    // Quitar una línea completa: todas sus unidades vuelven al inventario.
    case ACCIONES.QUITAR: {
      const linea = estado.carrito.find((item) => item.id === accion.payload.id);
      if (!linea) return estado;

      return {
        ...estado,
        items: estado.items.map((articulo) =>
          articulo.id === linea.id ? { ...articulo, stock: articulo.stock + linea.cantidad } : articulo
        ),
        carrito: estado.carrito.filter((item) => item.id !== linea.id),
      };
    }

    // Vaciar el carrito: todas las unidades vuelven al inventario.
    case ACCIONES.VACIAR:
      return {
        ...estado,
        items: estado.items.map((articulo) => {
          const linea = estado.carrito.find((item) => item.id === articulo.id);
          return linea ? { ...articulo, stock: articulo.stock + linea.cantidad } : articulo;
        }),
        carrito: [],
      };

    // Finalizar la compra: el carrito se vacía y el stock queda descontado definitivamente.
    case ACCIONES.FINALIZAR:
      return { ...estado, carrito: [] };

    default:
      return estado;
  }
}
