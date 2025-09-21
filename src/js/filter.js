import { renderEvents, getEvents, getVisibleEvents } from './main.js';

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
    const allEvents = getEvents(); 

    if (!query) {
      // показуємо всі події
      visibleEvents = [...allEvents];
      currentPage = 1;
      renderEvents(visibleEvents);
      return;
    }

    const filtered = allEvents.filter(ev =>
      ev.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      document.getElementById('events').innerHTML = `<p class="no-events">Події не знайдено</p>`;
      return;
    }

    visibleEvents = filtered;
    currentPage = 1;
    renderEvents(visibleEvents);
  }, 800);

  searchInput.addEventListener('input', handleSearch);
}
