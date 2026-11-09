// Indicador visual del stock: verde (normal), ámbar (pocas unidades) y rojo (agotado).
function StockBadge({ stock }) {
  let estilos = "bg-green-100 text-green-800";
  let texto = `${stock} disponibles`;

  if (stock === 0) {
    estilos = "bg-red-100 text-red-800";
    texto = "Agotado";
  } else if (stock <= 5) {
    estilos = "bg-amber-100 text-amber-900";
    texto = `Quedan ${stock}`;
  }

  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilos}`}>{texto}</span>;
}

export default StockBadge;
