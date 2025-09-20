import { BASE_URL, KEY } from './base-api.js';
import { initSearch } from './filter.js';

const eventsContainer = document.getElementById('events');
let events = [];

let currentPage = 1;
const perPage = 20;

export function getEvents() {
  return events;
}

function fetchEvents(countryCode = 'US') {
  const url = `${BASE_URL}events.json?countryCode=${countryCode}&apikey=${KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      events = data._embedded?.events || [];
      currentPage = 1;
      renderEvents(events);
      initSearch(events); 
      setupPagination();
    })
    .catch(err => console.error(err));
}

export function renderEvents() {
  eventsContainer.innerHTML = '';
  if (!events || events.length === 0) {
    eventsContainer.innerHTML = `<p class="no-events">Подій не знайдено</p>`;
    return;
  }

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = events.slice(start, end);

  pageItems.forEach((ev, i) => {
    const venue = ev._embedded?.venues?.[0];
    const image = ev.images?.[0]?.url;

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${image}" alt="Event image" class="event-img">
      <h3 class="title">${ev.name}</h3>
      <p class="data">${ev.dates.start.localDate}</p>
      <p class="place">${venue?.city?.name || '-'}, ${venue?.name || '-'}</p>
    `;

    eventsContainer.appendChild(card);

    setTimeout(() => card.classList.add('show'), i * 50);
  });
}

function setupPagination() {
  const buttons = document.querySelectorAll('.pagination-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.textContent.trim();
      if (page === '...') return;

      const totalPages = Math.ceil(events.length / perPage);
      let newPage = Number(page);

      if (newPage > totalPages) newPage = totalPages;
      if (newPage < 1) newPage = 1;

      currentPage = newPage;
      renderEvents(events);
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

export function renderEventsByCountry(code) {
  fetchEvents(code);
}

fetchEvents();