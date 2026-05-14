### 1. Crear Red
docker network create lemoncode-network

### 2. Levantar Mongo con persistencia

docker volume create lemoncode-mongo-data

docker run -d --name lemoncode-mongo --network lemoncode-network -p 27017:27017 -v lemoncode-mongo-data:/data/db -e MONGO_INITDB_DATABASE=topics mongo:7

## 3. Ejecutar backend local apuntando a Mongo contenedor


cd C:\Users\frang\Documents\bootcamp-devops\backend
$env:MONGODB_URI="mongodb://localhost:27017/topics"
$env:PORT="5000"
npm run start


## 4. Verificar CRUD

1. GET http://localhost:5000/topics

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"
Date: Thu, 14 May 2026 09:42:46 GMT
Connection: close

[]


2. POST http://localhost:5000/topics
Content-Type: application/json

{
  "title": "Ejemplo de topic",
  "description": "Descripción del topic de prueba"
}

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 196
ETag: W/"c4-WzP0ndf3ZJ21RtBhITPOmn12dtk"
Date: Thu, 14 May 2026 09:45:57 GMT
Connection: close

{
  "title": "Ejemplo de topic",
  "description": "Descripción del topic de prueba",
  "_id": "6a0599d510c537cc4f852e13",
  "createdAt": "2026-05-14T09:45:57.701Z",
  "updatedAt": "2026-05-14T09:45:57.701Z",
  "__v": 0
}

3. GET http://localhost:5000/topics/6a0599d510c537cc4f852e13

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 196
ETag: W/"c4-5x8mvvBPnbG3Z8rS+gfmTX82BA8"
Date: Thu, 14 May 2026 09:46:37 GMT
Connection: close

{
  "_id": "6a0599d510c537cc4f852e13",
  "title": "Ejemplo de topic",
  "description": "Descripción del topic de prueba",
  "createdAt": "2026-05-14T09:45:57.701Z",
  "updatedAt": "2026-05-14T09:45:57.701Z",
  "__v": 0
}

4. PUT http://localhost:5000/topics/6a0599d510c537cc4f852e13
Content-Type: application/json

{
  "title": "Topic actualizado",
  "description": "Descripción actualizada"
}

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 189
ETag: W/"bd-Vxl4sJTdcsITOzsW5Uw8Nngtg8E"
Date: Thu, 14 May 2026 09:47:02 GMT
Connection: close

{
  "_id": "6a0599d510c537cc4f852e13",
  "title": "Topic actualizado",
  "description": "Descripción actualizada",
  "createdAt": "2026-05-14T09:45:57.701Z",
  "updatedAt": "2026-05-14T09:47:02.520Z",
  "__v": 0
}

5. DELETE http://localhost:5000/topics/6a0599d510c537cc4f852e13

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-pLGuT4RYSlkpR7TSUps3hSY/+8c"
Date: Thu, 14 May 2026 09:47:34 GMT
Connection: close

{
  "ok": true,
  "message": "Topic eliminado"
}