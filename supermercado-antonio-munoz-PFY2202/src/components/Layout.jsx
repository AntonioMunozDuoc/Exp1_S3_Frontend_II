import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BottomNav from "./BottomNav.jsx";

// Plantilla común de todas las páginas: menú superior + contenido (Outlet) + menú inferior.
function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header>
        <Navbar />
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;
