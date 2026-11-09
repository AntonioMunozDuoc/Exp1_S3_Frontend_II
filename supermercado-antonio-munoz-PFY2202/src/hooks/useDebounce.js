import { useEffect, useState } from "react";

/**
 * Retorna una versión "retrasada" de value, que solo se actualiza
 * cuando el usuario deja de escribir durante `delay` milisegundos.
 */
function useDebounce(value, delay = 400) {
  const [valorRetrasado, setValorRetrasado] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setValorRetrasado(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return valorRetrasado;
}

export default useDebounce;
