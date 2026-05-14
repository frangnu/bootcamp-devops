FROM docker.io/library/node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción de forma limpia
RUN npm ci --only=production

# Copiar el resto del código fuente (incluyendo server.js)
COPY . .

# Exponer el puerto en el que escucha tu servidor Express (ajústalo si usa otro)
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["npm", "start"]
