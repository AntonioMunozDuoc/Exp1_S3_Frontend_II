// Encabezado común de las páginas: título, subtítulo opcional y contenido extra a la derecha (children).
function PageHeader({ titulo, subtitulo, children }) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl text-slate-800 sm:text-3xl">{titulo}</h1>
        {subtitulo && <p className="mt-1 text-slate-500">{subtitulo}</p>}
      </div>
      {children}
    </header>
  );
}

export default PageHeader;
