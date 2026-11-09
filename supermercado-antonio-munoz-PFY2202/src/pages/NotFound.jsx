import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="tarjeta text-center">
      <h1 className="text-3xl text-slate-800">404</h1>
      <p className="mt-2 text-slate-600">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primario mt-4">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
