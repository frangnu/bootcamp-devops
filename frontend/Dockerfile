# Etapa 1: Servidor web ligero con Nginx
FROM nginx:alpine

# Copiamos todos los archivos estáticos de la carpeta local al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto estándar de Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
