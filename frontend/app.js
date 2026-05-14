const API_PATH = window.API_BASE_URL || '/api/classes';

const statusEl = document.getElementById('status');
const listEl = document.getElementById('topicList');
const loadButton = document.getElementById('loadButton');

async function loadTopics() {
  statusEl.textContent = 'Cargando topics...';
  listEl.innerHTML = '';

  try {
    const response = await fetch(API_PATH);
    if (!response.ok) {
      throw new Error(Error ${response.status});
    }

    const topics = await response.json();
    if (!Array.isArray(topics) || topics.length === 0) {
      statusEl.textContent = 'No hay topics disponibles.';
      return;
    }

    statusEl.textContent = Encontrados ${topics.length} topics;
    topics.forEach((topic) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <p class="topic-title">${topic.title}</p>
        <p class="topic-description">${topic.description}</p>
      `;
      listEl.appendChild(item);
    });
  } catch (error) {
    statusEl.textContent = 'Error al cargar topics.';
    console.error(error);
  }
}

loadButton.addEventListener('click', loadTopics);