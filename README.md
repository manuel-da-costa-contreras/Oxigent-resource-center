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

5. Abrir en navegador la URL mostrada por consola (ruta por defecto: `/TechnicalTest/ResourceCenter`).

## Modo entrevista

- Archivos que debe tocar la persona candidata:
  - `Views/TechnicalTest/ResourceCenter.cshtml`
  - `wwwroot/technical-test/resource-center.js`
  - `wwwroot/technical-test/resource-center.scss`
- Datos mock:
  - `Data/resources.mock.json`

## Atajos utiles

- Recompilar SCSS en caliente:

```bash
npm run scss:watch
```

- Si hay que resetear el ejercicio rapidamente:
  - Restablece solo los 3 archivos de trabajo y vuelve a ejecutar `npm run scss:build`.
