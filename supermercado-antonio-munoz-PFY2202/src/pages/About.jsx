import PageHeader from "../components/PageHeader.jsx";

function About() {
  return (
    <section>
      <PageHeader titulo="Quiénes somos" subtitulo="Un supermercado cercano, con el inventario siempre al día." />
      <div className="tarjeta space-y-3 text-slate-600">
        <p>
          Somos un supermercado de barrio comprometido con ofrecer productos frescos y de calidad a precios justos. Este
          sistema nos permite controlar el inventario, evitar quiebres de stock y agilizar la preparación de pedidos.
        </p>
        <p>
          Nuestro equipo trabaja cada día para que encuentres lo que necesitas, con atención cercana y procesos cada vez
          más digitales.
        </p>
      </div>
    </section>
  );
}

export default About;
