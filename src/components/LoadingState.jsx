// Muestra el spinner o el error mientras el inventario no esté listo; cuando lo está, renderiza el contenido.
function LoadingState({ estado, errorMensaje, children }) {
  if (estado === "loading") {
    return (
      <div className="py-12 text-center" role="status">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-marca-claro border-t-marca-primario"></div>
        <p className="mt-3 text-slate-500">Cargando inventario...</p>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-sm text-red-800" role="alert">
        {errorMensaje}
      </div>
    );
  }

  return children;
}

export default LoadingState;
