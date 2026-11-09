# Supermercado - Gestión de inventario (Frontend II)

**Alumno:** Antonio Muñoz
**Asignatura:** Desarrollo Frontend II (PFY2202) - Duoc UC
**Evaluación:** Actividad sumativa, Experiencia 1, Semana 3 - "Desarrollando sitios web con React avanzado"

Sitio web de gestión de inventario para un supermercado. Está construido con **React 18, Vite, React Router v6 y Tailwind CSS**. Permite agregar artículos al inventario, listarlos en una tabla, **filtrarlos por categoría**, ver el **detalle** de cada uno, agregarlo a un **carrito** y modificar las cantidades, con lo que el inventario general se actualiza en tiempo real.

## Enlaces

- **Repositorio:** https://github.com/AntonioMunozDuoc/Exp1_S3_Frontend_II
- **Sitio publicado:** https://antoniomunozduoc.github.io/Exp1_S3_Frontend_II/

## Tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| React 18 + Vite | Componentes, `props`, hooks (`useState`, `useEffect`, `useMemo`, `useReducer`, `useContext`) y hook propio (`useDebounce`). |
| React Router v6 | Enrutamiento centralizado en `AppRoutes.jsx`, ruta padre con `Layout` y `Outlet`, ruta dinámica `/inventario/:id` (`useParams`), `NavLink`, `lazy` y `Suspense`. |
| Context API + `useReducer` | Estado global del inventario y del carrito (`InventoryContext.jsx` e `inventarioReducer.js`). |
| Tailwind CSS 3 | Clases utilitarias, tema propio en `tailwind.config.js`, clases reutilizables con `@apply` en `index.css` y diseño responsive (`sm:`). |
| JavaScript (ES6+) | `fetch` asíncrono, `filter`/`map`/`reduce`, validaciones con expresiones regulares. |
| Vitest + Testing Library | Pruebas del reducer y del flujo completo filtro, detalle y carrito. |

## Cumplimiento de los requerimientos

| Requerimiento del caso | Dónde se implementa |
| --- | --- |
| Pantalla de listado con todos los artículos del inventario | `pages/Inventory.jsx` y `components/InventoryTable.jsx` (nombre, marca, tipo de producto, precio y stock). |
| Filtro por categoría que actualiza dinámicamente el estado sin perder los datos originales | `Inventory.jsx` guarda la categoría en un estado local y calcula `itemsFiltrados` con `useMemo`. El arreglo `items` del estado global nunca se modifica; al elegir "Todas" se recupera la lista completa. También hay búsqueda por nombre o marca con *debounce*. |
| Detalle del artículo al hacer clic y opción de agregarlo al carrito | `pages/ArticleDetail.jsx`, en la ruta `/inventario/:id`. Agrega la cantidad elegida sin superar el stock disponible. |
| Los artículos agregados al carrito restan la cantidad del inventario | La acción `AGREGAR_AL_CARRITO` del reducer descuenta el stock del artículo. |
| Pantalla de carrito donde se aumenta o disminuye la cantidad y se actualiza el inventario | `pages/Cart.jsx` y `components/CartItem.jsx`. Las acciones `AUMENTAR` y `DISMINUIR` modifican el carrito y el stock a la vez. |
| Pantalla para agregar nuevos artículos y estado global con nombre, marca y tipo de producto | `pages/AddArticle.jsx` y `components/ArticleForm.jsx`, con validaciones en `utils/validaciones.js`. El artículo se guarda con la acción `AGREGAR_ARTICULO`. |
| Navegación con React Router (menú inferior y menú superior) | `components/BottomNav.jsx` (Inicio, Quiénes somos, Contáctanos) y `components/Navbar.jsx` (Inventario, Agregar artículo, Carrito). |
| Framework CSS con diseño responsive | Tailwind CSS en todos los componentes; la tabla hace scroll horizontal en pantallas pequeñas y el menú superior se colapsa. |
| Código modular y reutilizable | Componentes reutilizables (`Button`, `PageHeader`, `StockBadge`, `LoadingState`, `CategoryFilter`), `utils/` para categorías, precios y validaciones, y un único archivo de rutas. |
| Repositorio en GitHub con README y publicación en gh-pages | Este archivo y la rama `gh-pages` (ver "Publicar en gh-pages"). |

## Estructura del proyecto

```
supermercado-antonio-munoz-PFY2202/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── data/inventario.json
└── src/
    ├── components/
    │   ├── ArticleForm.jsx
    │   ├── BottomNav.jsx
    │   ├── Button.jsx
    │   ├── CartItem.jsx
    │   ├── CategoryFilter.jsx
    │   ├── ContactForm.jsx
    │   ├── InventoryTable.jsx
    │   ├── Layout.jsx
    │   ├── LoadingState.jsx
    │   ├── Navbar.jsx
    │   ├── PageHeader.jsx
    │   └── StockBadge.jsx
    ├── context/
    │   ├── InventoryContext.jsx
    │   ├── inventarioReducer.js
    │   └── inventarioReducer.test.js
    ├── hooks/
    │   └── useDebounce.js
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Inventory.jsx
    │   ├── AddArticle.jsx
    │   ├── ArticleDetail.jsx
    │   ├── Cart.jsx
    │   └── NotFound.jsx
    ├── routes/
    │   └── AppRoutes.jsx
    ├── utils/
    │   ├── categorias.js
    │   ├── precios.js
    │   └── validaciones.js
    ├── App.jsx
    ├── App.test.jsx
    ├── main.jsx
    └── index.css
```

## Rutas

| Ruta | Página | Menú |
| --- | --- | --- |
| `/` | Inicio, con un resumen del inventario | Inferior |
| `/quienes-somos` | Quiénes somos | Inferior |
| `/contacto` | Contáctanos, con formulario validado | Inferior |
| `/inventario` | Listado con filtro y búsqueda | Superior |
| `/inventario/:id` | Detalle del artículo | (desde la tabla) |
| `/agregar` | Formulario para agregar artículos | Superior |
| `/carrito` | Carrito de compras | Superior |

## Estado global y reglas del inventario

`InventoryProvider` (en `main.jsx`) envuelve la aplicación y expone el estado mediante el hook `useInventory()`. El estado tiene dos partes: `items` (el inventario, con el stock disponible) y `carrito` (solo `{ id, cantidad }`), de modo que el stock tiene una única fuente de verdad.

| Acción | Efecto en el inventario | Efecto en el carrito |
| --- | --- | --- |
| Agregar al carrito (detalle) | Resta la cantidad del stock (máximo el stock disponible) | Crea o suma la línea |
| Aumentar (+) | Resta 1 al stock (deshabilitado si el stock es 0) | Suma 1 |
| Disminuir (−) | Devuelve 1 al stock | Resta 1; si llega a 0 se quita la línea |
| Quitar | Devuelve todas las unidades de la línea | Elimina la línea |
| Vaciar carrito | Devuelve todas las unidades | Queda vacío |
| Finalizar compra | El stock queda descontado | Queda vacío |

## Funcionalidades

- **Inventario dinámico:** se carga con `fetch` desde `public/data/inventario.json` dentro de un `useEffect`, con `AbortController`, validación de cada registro, spinner de carga y mensaje de error.
- **Filtro y búsqueda:** el filtro por categoría y la búsqueda (con *debounce* de 300 ms) generan una lista derivada; los datos originales no se tocan.
- **Alta de artículos:** formulario con validación (nombre, marca, tipo de producto, precio entero positivo, cantidad entera y descripción).
- **Carrito:** subtotales, total en pesos chilenos y contador de unidades en el menú.
- **Código de stock:** verde (disponible), ámbar (quedan 5 o menos) y rojo (agotado).
- **Contacto:** formulario con validación de nombre, correo y mensaje.

> Los cambios al inventario y al carrito viven en el estado de React: al recargar la página se vuelve a cargar el inventario original desde `inventario.json`.
