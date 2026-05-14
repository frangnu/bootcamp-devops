# Bootcamp DevOps - Reto 1: MongoDB en Contenedor

Documentación completa de los pasos seguidos para completar el reto de MongoDB en Docker con backend Node.js/Express.

---

## 1. Crear Red Docker

```powershell
docker network create lemoncode-network
```

**Resultado esperado:**
```
lemoncode-network
```

---

## 2. Crear Volumen para Persistencia

```powershell
docker volume create lemoncode-mongo-data
```

**Resultado esperado:**
```
lemoncode-mongo-data
```

---

## 3. Levantar MongoDB en Contenedor

```powershell
docker run -d --name lemoncode-mongo --network lemoncode-network -p 27017:27017 -v lemoncode-mongo-data:/data/db -e MONGO_INITDB_DATABASE=topics mongo:7
```

**Parámetros:**
- `-d`: Ejecutar en segundo plano
- `--name lemoncode-mongo`: Nombre del contenedor
- `--network lemoncode-network`: Conectar a la red creada
- `-p 27017:27017`: Mapear puerto 27017 (MongoDB)
- `-v lemoncode-mongo-data:/data/db`: Usar volumen para persistencia
- `-e MONGO_INITDB_DATABASE=topics`: Base de datos inicial
- `mongo:7`: Imagen oficial de MongoDB versión 7

**Verificar que está corriendo:**
```powershell
docker ps
```

---

## 4. Crear y Configurar el Backend

### 4.1 Estructura de carpetas

```
bootcamp-devops/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.js
│   ├── client.http
│   └── README.md
├── 01-contenedores/
│   └── Los 4 retos/
│       └── reto1_mongoDBcontenedor.md
└── 00-fundamentos-linux/
```

### 4.2 Archivo: backend/package.json

```json
{
  "name": "bootcamp-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0"
  }
}
```

### 4.3 Archivo: backend/index.js

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/topics';
const port = process.env.PORT || 5000;

app.use(express.json());

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Topic = mongoose.model('Topic', topicSchema);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend conectado a MongoDB' });
});

app.get('/topics', async (req, res) => {
  const topics = await Topic.find().sort({ createdAt: -1 });
  res.json(topics);
});

app.get('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ ok: false, message: 'Topic no encontrado' });
    res.json(topic);
  } catch (error) {
    res.status(400).json({ ok: false, message: 'ID inválido' });
  }
});

app.post('/topics', async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.put('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!topic) return res.status(404).json({ ok: false, message: 'Topic no encontrado' });
    res.json(topic);
  } catch (error) {
    res.status(400).json({ ok: false, message: 'ID inválido o datos inválidos' });
  }
});

app.delete('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ ok: false, message: 'Topic no encontrado' });
    res.json({ ok: true, message: 'Topic eliminado' });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'ID inválido' });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Conectado a MongoDB:', mongoUri);
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });
```

---

## 5. Instalar Dependencias del Backend

```powershell
cd C:\Users\frang\Documents\bootcamp-devops\backend
npm install
```

**Resultado esperado:**
```
added XX packages in XXs
```

---

## 6. Ejecutar el Backend

```powershell
cd C:\Users\frang\Documents\bootcamp-devops\backend
$env:MONGODB_URI="mongodb://localhost:27017/topics"
$env:PORT="5000"
npm run start
```

**Resultado esperado:**
```
Conectado a MongoDB: mongodb://localhost:27017/topics
Servidor escuchando en http://localhost:5000
```

> El servidor seguirá corriendo en esta terminal. Abre otra terminal para ejecutar peticiones.

---

## 7. Pruebas del CRUD con REST Client

### 7.1 Instalar Extensión REST Client en VS Code

1. Ve a **Extensions** (Ctrl+Shift+X)
2. Busca `REST Client`
3. Instala la versión de **Huachao Mao**
4. Recarga VS Code (Ctrl+Shift+P > `Reload Window`)

### 7.2 Archivo: backend/client.http

```http
### Obtener todos los topics
GET http://localhost:5000/topics

###
POST http://localhost:5000/topics
Content-Type: application/json

{
  "title": "Ejemplo de topic",
  "description": "Descripción del topic de prueba"
}

###
GET http://localhost:5000/topics/{{topicId}}

###
PUT http://localhost:5000/topics/{{topicId}}
Content-Type: application/json

{
  "title": "Topic actualizado",
  "description": "Descripción actualizada"
}

###
DELETE http://localhost:5000/topics/{{topicId}}
```

### 7.3 Ejecución de Peticiones

1. **Abre** `backend/client.http` en VS Code
2. **Ejecuta el primer GET:**
   - Busca la línea `GET http://localhost:5000/topics`
   - Haz clic en `Send Request` (debe aparecer encima)
   - Verás la respuesta en una nueva pestaña (probablemente `[]` vacío)

3. **Ejecuta el POST:**
   - Busca `POST http://localhost:5000/topics`
   - Haz clic en `Send Request`
   - Verás una respuesta como:
   ```json
   {
     "_id": "665a1b2c3d4e5f6g7h8i9j0k1",
     "title": "Ejemplo de topic",
     "description": "Descripción del topic de prueba",
     "createdAt": "2026-05-14T09:44:16.000Z",
     "updatedAt": "2026-05-14T09:44:16.000Z"
   }
   ```

4. **Copia el `_id`** (ejemplo: `665a1b2c3d4e5f6g7h8i9j0k1`)

5. **Reemplaza `{{topicId}}`** en el archivo con ese ID:
   ```http
   GET http://localhost:5000/topics/665a1b2c3d4e5f6g7h8i9j0k1
   PUT http://localhost:5000/topics/665a1b2c3d4e5f6g7h8i9j0k1
   DELETE http://localhost:5000/topics/665a1b2c3d4e5f6g7h8i9j0k1
   ```

6. **Ejecuta cada petición:**
   - `GET` para recuperar el topic
   - `PUT` para actualizarlo
   - `DELETE` para eliminarlo

---

## 8. Verificar Peticiones Exitosas

### GET /topics - Código 200
```json
[]
```
o lista de topics

### POST /topics - Código 201
```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### GET /topics/:id - Código 200
```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### PUT /topics/:id - Código 200
```json
{
  "_id": "...",
  "title": "Topic actualizado",
  "description": "Descripción actualizada",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### DELETE /topics/:id - Código 200
```json
{
  "ok": true,
  "message": "Topic eliminado"
}
```

---

## 9. Limpiar Recursos

Si quieres detener el reto:

```powershell
# Detener el contenedor MongoDB
docker stop lemoncode-mongo

# Eliminar el contenedor
docker rm lemoncode-mongo

# Eliminar la red
docker network rm lemoncode-network

# Eliminar el volumen (opcional, si quieres perder los datos)
docker volume rm lemoncode-mongo-data
```

---

## Resumen de Tecnologías Usadas

| Componente | Versión | Propósito |
|---|---|---|
| Docker | (instalado) | Orquestación de contenedores |
| MongoDB | 7 | Base de datos NoSQL |
| Node.js | v24+ | Runtime para JavaScript |
| Express | 4.18.2 | Framework web |
| Mongoose | 7.5.0 | ODM para MongoDB |
| REST Client | (extensión) | Pruebas de API en VS Code |

---

## Errores Comunes y Soluciones

### Error: EADDRINUSE: address already in use :::5000
**Causa:** El puerto 5000 ya está ocupado.

**Soluciones:**
```powershell
# Opción 1: Matar el proceso en el puerto 5000
netstat -ano | findstr :5000
taskkill /PID <numero> /F

# Opción 2: Usar otro puerto
$env:PORT="5001"
npm run start
```

### Error: Failed to connect to Docker daemon
**Causa:** Docker Desktop no está corriendo.

**Solución:** Abre Docker Desktop en tu máquina.

### Error: "Send Request" no aparece en REST Client
**Causa:** Archivo no tiene formato correcto o extensión no instalada.

**Soluciones:**
1. Instala la extensión REST Client
2. Verifica que el archivo sea `.http`
3. Usa separadores `###` entre bloques
4. Recarga VS Code (Ctrl+Shift+P > `Reload Window`)

---

## Referencias

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
