# 1. Crear un Dockerfile para el backend (para .NET para o Node.js)
```Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

ENV MONGO_URI=mongodb://mongodb:27017/tu_base_datos
ENV PORT=5000

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

# 2. Construir la imagen del backend
```bash
docker build -t mi-backend-node:latest .
```

![Captura de pantalla](../Capturas/Screenshot_1.png)

# 3. Ejecutar el backend en un contenedor en la red Docker que creaste en el Reto 1

```bash
docker run -d `
  --name backend-node `
  --network lemoncode-network `
  -e DATABASE_URL=mongodb://root:admin123@mongodb:27017 `
  -e HOST=0.0.0.0 `
  -p 5000:5000 `
  mi-backend-node:latest

```
![Captura de pantalla](../Capturas/Screenshot_4.png)

# 4. Verificar que se conecta correctamente a MongoDB

```bash
docker logs backend-node
```
![Captura de pantalla](../Capturas/Screenshot_5.png)