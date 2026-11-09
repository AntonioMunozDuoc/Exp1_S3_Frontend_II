import { CATEGORIAS_FILTRO } from "../utils/categorias.js";

// Select controlado: el componente padre decide qué hacer con la categoría elegida.
function CategoryFilter({ valor, onChange }) {
  return (
    <div className="w-full sm:w-60">
      <label htmlFor="filtro-categoria" className="mb-1 block text-sm font-medium text-slate-700">
        Filtrar por categoría
      </label>
      <select id="filtro-categoria" className="campo" value={valor} onChange={(event) => onChange(event.target.value)}>
        {CATEGORIAS_FILTRO.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
