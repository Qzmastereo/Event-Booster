import { renderEvents, getEvents } from './main.js';


function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export function initSearch() {
  const searchInput = document.querySelector('.form-control');


  const handleSearch = debounce(() => {
    const query = searchInput.value.toLowerCase().trim();
    const events = getEvents(); 

    if (!query) {
      renderEvents(events);
      return;
    }

    const filtered = events.filter(ev =>
      ev.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      document.getElementById('events').innerHTML = `<p class="no-events">Події не знайдено</p>`;
      return;
    }

    renderEvents(filtered);
  }, 800);

  searchInput.addEventListener('input', handleSearch);
}
