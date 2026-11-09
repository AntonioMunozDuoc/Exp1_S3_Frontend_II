import { describe, expect, test } from "vitest";
import { ACCIONES, estadoInicial, inventarioReducer } from "./inventarioReducer.js";

const ARTICULOS = [
  { id: 1, nombre: "Leche", marca: "Soprole", categoria: "lacteos", precio: 1000, stock: 10, descripcion: "Leche entera" },
  { id: 2, nombre: "Arroz", marca: "Tucapel", categoria: "abarrotes", precio: 1800, stock: 5, descripcion: "Arroz grado 1" },
];

const base = inventarioReducer(estadoInicial, { type: ACCIONES.CARGAR, payload: ARTICULOS });
const stockDe = (estado, id) => estado.items.find((item) => item.id === id).stock;

describe("inventarioReducer", () => {
  test("AGREGAR_ARTICULO asigna un id nuevo", () => {
    const estado = inventarioReducer(base, {
      type: ACCIONES.AGREGAR_ARTICULO,
      payload: { nombre: "Té", marca: "Lipton", categoria: "bebidas", precio: 900, stock: 3, descripcion: "Té negro" },
    });
    expect(estado.items).toHaveLength(3);
    expect(estado.items[2].id).toBe(3);
  });

  test("AGREGAR_AL_CARRITO descuenta el stock y crea la línea", () => {
    const estado = inventarioReducer(base, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 3 } });
    expect(stockDe(estado, 1)).toBe(7);
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 3 }]);
  });

  test("AGREGAR_AL_CARRITO no supera el stock disponible", () => {
    const estado = inventarioReducer(base, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 2, cantidad: 99 } });
    expect(stockDe(estado, 2)).toBe(0);
    expect(estado.carrito[0].cantidad).toBe(5);
  });

  test("AUMENTAR y DISMINUIR mantienen sincronizado el inventario", () => {
    let estado = inventarioReducer(base, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 1 } });
    estado = inventarioReducer(estado, { type: ACCIONES.AUMENTAR, payload: { id: 1 } });
    expect(stockDe(estado, 1)).toBe(8);
    estado = inventarioReducer(estado, { type: ACCIONES.DISMINUIR, payload: { id: 1 } });
    estado = inventarioReducer(estado, { type: ACCIONES.DISMINUIR, payload: { id: 1 } });
    expect(stockDe(estado, 1)).toBe(10);
    expect(estado.carrito).toHaveLength(0);
  });

  test("QUITAR y VACIAR devuelven las unidades al inventario", () => {
    let estado = inventarioReducer(base, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 4 } });
    estado = inventarioReducer(estado, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 2, cantidad: 2 } });
    estado = inventarioReducer(estado, { type: ACCIONES.QUITAR, payload: { id: 1 } });
    expect(stockDe(estado, 1)).toBe(10);
    estado = inventarioReducer(estado, { type: ACCIONES.VACIAR });
    expect(estado.items).toEqual(ARTICULOS);
    expect(estado.carrito).toEqual([]);
  });

  test("FINALIZAR vacía el carrito y deja el stock descontado", () => {
    let estado = inventarioReducer(base, { type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 4 } });
    estado = inventarioReducer(estado, { type: ACCIONES.FINALIZAR });
    expect(estado.carrito).toEqual([]);
    expect(stockDe(estado, 1)).toBe(6);
  });
});
