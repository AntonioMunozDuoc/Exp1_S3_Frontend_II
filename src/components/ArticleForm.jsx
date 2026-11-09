import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias.js";
import { validarArticulo } from "../utils/validaciones.js";
import Button from "./Button.jsx";

const VALORES_INICIALES = { nombre: "", marca: "", categoria: "", precio: "", stock: "", descripcion: "" };

// Campo del formulario: agrupa la etiqueta, el control (children) y el mensaje de error.
function Campo({ id, label, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Formulario para agregar un artículo: valida y entrega el artículo nuevo al padre mediante `onAgregar`.
function ArticleForm({ onAgregar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValores((prev) => ({ ...prev, [name]: value }));

    // Quita el error del campo apenas el usuario empieza a corregirlo.
    if (errores[name]) {
      setErrores((prev) => {
        const siguiente = { ...prev };
        delete siguiente[name];
        return siguiente;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const erroresEncontrados = validarArticulo(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    onAgregar({
      nombre: valores.nombre.trim(),
      marca: valores.marca.trim(),
      categoria: valores.categoria,
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      descripcion: valores.descripcion.trim(),
    });

    setValores(VALORES_INICIALES);
  }

  // Props comunes de accesibilidad y estilo de cada control.
  const propsCampo = (nombre) => ({
    id: `art-${nombre}`,
    name: nombre,
    value: valores[nombre],
    onChange: handleChange,
    "aria-invalid": errores[nombre] ? "true" : "false",
    "aria-describedby": errores[nombre] ? `art-${nombre}-error` : undefined,
    className: `campo ${errores[nombre] ? "campo-invalido" : ""}`,
  });

  return (
    <form className="tarjeta grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
      <Campo id="art-nombre" label="Nombre" error={errores.nombre}>
        <input type="text" placeholder="Ej: Aceite vegetal 1 L" {...propsCampo("nombre")} />
      </Campo>

      <Campo id="art-marca" label="Marca" error={errores.marca}>
        <input type="text" placeholder="Ej: Chef" {...propsCampo("marca")} />
      </Campo>

      <Campo id="art-categoria" label="Tipo de producto" error={errores.categoria}>
        <select {...propsCampo("categoria")}>
          <option value="">Selecciona...</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.label}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="art-precio" label="Precio (CLP)" error={errores.precio}>
        <input type="number" min="1" placeholder="Ej: 2490" {...propsCampo("precio")} />
      </Campo>

      <Campo id="art-stock" label="Cantidad disponible" error={errores.stock}>
        <input type="number" min="1" step="1" placeholder="Ej: 20" {...propsCampo("stock")} />
      </Campo>

      <Campo id="art-descripcion" label="Descripción" error={errores.descripcion} className="sm:col-span-2">
        <textarea rows="3" placeholder="Describe brevemente el producto" {...propsCampo("descripcion")}></textarea>
      </Campo>

      <div className="sm:col-span-2">
        <Button type="submit">Agregar al inventario</Button>
      </div>
    </form>
  );
}

export default ArticleForm;
