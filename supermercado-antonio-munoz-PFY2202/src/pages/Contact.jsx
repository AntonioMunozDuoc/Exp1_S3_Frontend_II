import PageHeader from "../components/PageHeader.jsx";
import ContactForm from "../components/ContactForm.jsx";

const DATOS = [
  ["📍 Dirección", "Av. Principal 1234, Santiago"],
  ["📞 Teléfono", "+56 2 2345 6789"],
  ["🕘 Horario", "Lunes a domingo, de 09:00 a 21:00"],
];

function Contact() {
  return (
    <section>
      <PageHeader titulo="Contáctanos" subtitulo="Estamos para ayudarte." />

      <dl className="tarjeta mb-6 grid gap-4 sm:grid-cols-3">
        {DATOS.map(([titulo, valor]) => (
          <div key={titulo}>
            <dt className="text-sm font-semibold text-slate-700">{titulo}</dt>
            <dd className="text-slate-600">{valor}</dd>
          </div>
        ))}
      </dl>

      <ContactForm />
    </section>
  );
}

export default Contact;
