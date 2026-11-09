import { useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ArticleForm from "../components/ArticleForm.jsx";

function AddArticle() {
  const { agregarArticulo, estadoCarga, errorMensaje } = useInventory();
  const [ultimoAgregado, setUltimoAgregado] = useState("");

  function handleAgregar(articulo) {
    agregarArticulo(articulo);
    setUltimoAgregado(articulo.nombre);
  }

  return (
    <section>
      <PageHeader titulo="Agregar artículo" subtitulo="Ingresa un nuevo producto al inventario." />

      <LoadingState estado={estadoCarga} errorMensaje={errorMensaje}>
        {ultimoAgregado && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-800" role="status">
            «{ultimoAgregado}» se agregó al inventario.{" "}
            <Link to="/inventario" className="font-semibold underline">
              Ver inventario
            </Link>
          </div>
        )}

        <ArticleForm onAgregar={handleAgregar} />
      </LoadingState>
    </section>
  );
}

export default AddArticle;
