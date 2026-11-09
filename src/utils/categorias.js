// Categorías (tipos de producto) del inventario; las usan el filtro, el formulario y la tabla.
export const CATEGORIAS = [
  { id: "lacteos", label: "Lácteos", icono: "🥛" },
  { id: "panaderia", label: "Panadería", icono: "🥖" },
  { id: "bebidas", label: "Bebidas", icono: "🥤" },
  { id: "abarrotes", label: "Abarrotes", icono: "🍝" },
  { id: "frutas-verduras", label: "Frutas y verduras", icono: "🥑" },
  { id: "limpieza", label: "Limpieza", icono: "🧴" },
];

// Opción extra del filtro: "todas" desactiva el filtrado por categoría.
export const CATEGORIAS_FILTRO = [{ id: "todas", label: "Todas" }, ...CATEGORIAS];

// Devuelve la categoría completa a partir de su id (o undefined si no existe).
export function buscarCategoria(id) {
  return CATEGORIAS.find((categoria) => categoria.id === id);
}
