import { getEvents, setVisibleEvents } from './main.js';

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
      setVisibleEvents([...allEvents]);
      return;
    }

    const filtered = allEvents.filter(ev =>
      ev.name.toLowerCase().includes(query)
    );

    setVisibleEvents(filtered);
  }, 500);

  searchInput.addEventListener('input', handleSearch);
}
