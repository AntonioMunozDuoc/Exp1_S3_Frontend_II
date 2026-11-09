// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import inventario from "../public/data/inventario.json";

// Prueba de integración: recorre el flujo completo (filtro -> detalle -> carrito) con el inventario real.
function renderizarApp(ruta = "/inventario") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(inventario) })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Flujo del inventario", () => {
  test("el listado muestra todos los artículos", async () => {
    renderizarApp();
    expect(await screen.findByText(`Mostrando ${inventario.length} de ${inventario.length} artículos`)).toBeTruthy();
  });

  test("el filtro por categoría no altera el inventario original", async () => {
    const user = userEvent.setup();
    renderizarApp();
    const total = inventario.length;
    const lacteos = inventario.filter((item) => item.categoria === "lacteos").length;
    await screen.findByText(`Mostrando ${total} de ${total} artículos`);

    await user.selectOptions(screen.getByLabelText("Filtrar por categoría"), "lacteos");
    expect(await screen.findByText(`Mostrando ${lacteos} de ${total} artículos`)).toBeTruthy();

    await user.selectOptions(screen.getByLabelText("Filtrar por categoría"), "todas");
    expect(await screen.findByText(`Mostrando ${total} de ${total} artículos`)).toBeTruthy();
  });

  test("agregar al carrito descuenta stock y el carrito permite aumentar y disminuir", async () => {
    const user = userEvent.setup();
    renderizarApp("/inventario/1");

    // Detalle: Leche entera con 24 disponibles
    expect(await screen.findByText("24 disponibles")).toBeTruthy();
    await user.clear(screen.getByLabelText("Cantidad"));
    await user.type(screen.getByLabelText("Cantidad"), "4");
    await user.click(screen.getByRole("button", { name: /Agregar al carrito/ }));
    expect(await screen.findByText("20 disponibles")).toBeTruthy();

    // Carrito
    await user.click(screen.getByRole("link", { name: /Ir al carrito/ }));
    const grupo = await screen.findByRole("group", { name: /Cantidad de Leche entera 1 L/ });
    expect(within(grupo).getByText("4")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /Aumentar cantidad de Leche/ }));
    expect(within(grupo).getByText("5")).toBeTruthy();
    expect(screen.getByText(/Disponibles en inventario: 19/)).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /Disminuir cantidad de Leche/ }));
    expect(screen.getByText(/Disponibles en inventario: 20/)).toBeTruthy();
  });

  test("muestra un mensaje de error si falla la carga del inventario", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderizarApp();
    expect(await screen.findByRole("alert")).toBeTruthy();
  });
});
