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
