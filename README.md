# Resource Center Interview Environment

Entorno reducido y ejecutable para la prueba tecnica frontend sobre stack ASP.NET Core MVC + Razor + jQuery + SCSS.

## Requisitos

- .NET SDK 8
- Node.js 16+ y npm

## Arranque rapido

1. Restaurar paquetes .NET:

```bash
dotnet restore --configfile NuGet.config
```

2. Instalar herramientas frontend (solo primera vez):

```bash
npm install
```

3. Compilar SCSS a CSS:

```bash
npm run scss:build
```

4. Ejecutar la aplicacion:

```bash
dotnet run
```

# Resource Center - Resumen breve de lo realizado

En esta prueba he intentado mantenerme dentro del stack y de la base ya preparada, haciendo cambios concretos en lugar de rehacer la pantalla.

Habian fallos por consola con los datos que venian por parte del MOCK:
- Había casos con `summary` vacío o `null`, y categorías fuera del select.
- También he ajustado una validación para evitar el error de consola en `escapeHtml` cuando llegaban valores no string.

despues he completado la parte de filtros:
- He añadido la búsqueda por texto en título y resumen.
- He corregido la lógica de categoría para que filtre correctamente.
- He completado el botón `Limpiar` para dejar búsqueda y categoría en su estado inicial.
- Normalmente para busquedas, aplicaria un debounce para evitar series de llamadas al back por cada letra, al ser local en el front y con una mock sencilla, no lo he añadido.

En el modal he completado el comportamiento de teclado:
- Cierre con `Esc`.
- Foco inicial dentro del modal al abrir.
- Trap de `Tab` y `Shift+Tab` para no salir del diálogo mientras está abierto.
- Al cerrar, el foco vuelve al botón que abrió el modal.

En estilos, he terminado el responsive pendiente:
- En tablet el grid pasa a 2 columnas.
- En mobile, filtros en columna y tarjetas en 1 columna.

Como bonus de accesibilidad:
- He añadido `aria-label` en las acciones principales.
- He añadido `aria-modal="true"` al diálogo.
- He incorporado estilos de `:focus-visible` para que la navegación por teclado sea clara.

Como bonus de persistencia:
- He optado por query string en lugar de `sessionStorage`, por usabilidad y por facilidad para validar.
- Los filtros se guardan en la URL con `search` y `category`.
- Al cargar la pantalla, leo esos parámetros y restauro el estado, al final lo he relacionado a una aplicacion web y es el flujo natural al compartir URLs.
- Al cambiar filtros o limpiar, actualizo la URL sin recargar.
