# Bootcamp Backend

Este es un backend mínimo para conectar con MongoDB y probar el reto de contenedores.

## Pasos para ejecutar

1. Asegúrate de que Docker esté corriendo.
2. Crea la red y el volumen de Docker:

```powershell
cd C:\Users\frang\Documents\bootcamp-devops

docker network create lemoncode-network
docker volume create lemoncode-mongo-data
```

3. Levanta el contenedor de MongoDB:

```powershell
docker run -d --name lemoncode-mongo --network lemoncode-network -p 27017:27017 -v lemoncode-mongo-data:/data/db -e MONGO_INITDB_DATABASE=topics mongo:7
```

4. Ve a la carpeta del backend, instala dependencias y arranca el servidor:

```powershell
cd C:\Users\frang\Documents\bootcamp-devops\backend
npm install
$env:MONGODB_URI="mongodb://localhost:27017/topics"
$env:PORT="5000"
npm run start
```

5. Abre `http://localhost:5000` para comprobar que el backend está corriendo.

## Archivos

- `package.json`: dependencias y script de inicio.
- `index.js`: servidor Express y conexión a MongoDB.
