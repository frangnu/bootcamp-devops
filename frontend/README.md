# Frontend Topics

Este frontend es una aplicación simple que muestra los topics desde el backend.

## Estructura

- `index.html`: interfaz principal.
- `app.js`: lógica para cargar topics desde la API del backend.
- `style.css`: estilos básicos.
- `server.js`: servidor Express que expone el frontend en el puerto 3000 y proxya la API.
- `Dockerfile`: imagen Docker para ejecutar el frontend en contenedor.

## Ejecutar localmente

Desde la carpeta `frontend`:

```powershell
cd c:\Users\frang\Documents\bootcamp-devops\frontend
npm install
npm start
```

Luego abre `http://localhost:3000`.

## Construir la imagen Docker

Desde la carpeta `frontend`:

```powershell
cd c:\Users\frang\Documents\bootcamp-devops\frontend
docker build -t topics-web:1.0 .
```

## Ejecutar el frontend en Docker

```powershell
docker run -d --name topics-web --network lemoncode-network -p 3000:3000 \
  -e API_BASE_URL=http://topics-api:5000/api/classes \
  topics-web:1.0
```

Luego abre `http://localhost:3000`.

## Nota sobre la API

El frontend usa un proxy local en `http://localhost:3000/api/classes`, y ese proxy reenvía las solicitudes al backend usando la variable de entorno `API_BASE_URL`.

En Docker, el backend debe estar en la red `lemoncode-network` y disponible como `http://topics-api:5000/api/classes`.
