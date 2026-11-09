import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";

// Lazy loading: cada página se descarga solo cuando el usuario la visita.
const Home = lazy(() => import("../pages/Home.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const Inventory = lazy(() => import("../pages/Inventory.jsx"));
const AddArticle = lazy(() => import("../pages/AddArticle.jsx"));
const ArticleDetail = lazy(() => import("../pages/ArticleDetail.jsx"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// Todas las rutas de la aplicación se declaran en este único archivo.
function AppRoutes() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-500">Cargando...</p>}>
      <Routes>
        {/* Layout es la ruta padre: aporta los menús y renderiza la página hija en su <Outlet /> */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/inventario" element={<Inventory />} />
          {/* Ruta dinámica: :id se lee en ArticleDetail con useParams */}
          <Route path="/inventario/:id" element={<ArticleDetail />} />
          <Route path="/agregar" element={<AddArticle />} />
          <Route path="/carrito" element={<Cart />} />
          {/* La ruta comodín va siempre al final */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
