// Utilidades de precios compartidas por la tabla, el detalle y el carrito.

export function formatPrice(value) {
  return "$" + value.toLocaleString("es-CL");
}
