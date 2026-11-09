const VARIANTES = {
  primario: "btn btn-primario",
  secundario: "btn btn-secundario",
  peligro: "btn btn-peligro",
};

// Botón reutilizable: la prop `variante` elige el estilo (primario, secundario o peligro).
function Button({ variante = "primario", className = "", type = "button", children, ...props }) {
  return (
    <button type={type} className={`${VARIANTES[variante]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
