import { useState } from "react";
import { validarContacto } from "../utils/validaciones.js";
import Button from "./Button.jsx";

const VALORES_INICIALES = { nombre: "", email: "", mensaje: "" };
const MAX_MENSAJE = 500;

// Formulario de contacto controlado por estado: valida al enviar y vuelve a validar mientras se corrige.
function ContactForm() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const nuevosValores = { ...valores, [name]: value };
    setValores(nuevosValores);
    setEnviado(false);

    // Una vez que el usuario vio un error en el campo, se revalida en vivo para que lo vea desaparecer.
    if (errores[name]) {
      const revalidado = validarContacto(nuevosValores);
      setErrores((prev) => {
        const siguiente = { ...prev };
        if (revalidado[name]) {
          siguiente[name] = revalidado[name];
        } else {
          delete siguiente[name];
        }
        return siguiente;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const erroresEncontrados = validarContacto(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      setEnviado(false);
      return;
    }

    setEnviado(true);
    setValores(VALORES_INICIALES);
  }

  const propsCampo = (nombre) => ({
    id: `contacto-${nombre}`,
    name: nombre,
    value: valores[nombre],
    onChange: handleChange,
    "aria-invalid": errores[nombre] ? "true" : "false",
    "aria-describedby": errores[nombre] ? `contacto-${nombre}-error` : undefined,
    className: `campo ${errores[nombre] ? "campo-invalido" : ""}`,
  });

  const mensajeError = (nombre) =>
    errores[nombre] && (
      <p id={`contacto-${nombre}-error`} className="mt-1 text-xs text-red-700" role="alert">
        {errores[nombre]}
      </p>
    );

  return (
    <form className="tarjeta max-w-xl space-y-4" onSubmit={handleSubmit} noValidate>
      {enviado && (
        <div className="rounded-lg bg-green-100 p-3 text-sm text-green-800" role="status">
          ✅ ¡Gracias por escribirnos! Responderemos tu mensaje a la brevedad.
        </div>
      )}

      <div>
        <label htmlFor="contacto-nombre" className="mb-1 block text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input type="text" placeholder="Tu nombre" {...propsCampo("nombre")} />
        {mensajeError("nombre")}
      </div>

      <div>
        <label htmlFor="contacto-email" className="mb-1 block text-sm font-medium text-slate-700">
          Correo electrónico
        </label>
        <input type="email" placeholder="nombre@dominio.cl" {...propsCampo("email")} />
        {mensajeError("email")}
      </div>

      <div>
        <label htmlFor="contacto-mensaje" className="mb-1 block text-sm font-medium text-slate-700">
          Mensaje
        </label>
        <textarea rows="4" placeholder="¿En qué podemos ayudarte?" {...propsCampo("mensaje")}></textarea>
        <p className="mt-1 text-xs text-slate-500">
          {valores.mensaje.length}/{MAX_MENSAJE} caracteres
        </p>
        {mensajeError("mensaje")}
      </div>

      <Button type="submit">Enviar mensaje</Button>
    </form>
  );
}

export default ContactForm;
