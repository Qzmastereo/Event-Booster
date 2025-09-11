import { BASE_URL, KEY } from './base-api.js';
import { initSearch } from './filter.js';

const eventsContainer = document.getElementById('events');
let events = [];

export function getEvents() {
  return events;
}

function fetchEvents(countryCode = 'US') {
  const url = `${BASE_URL}events.json?countryCode=${countryCode}&apikey=${KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      events = data._embedded?.events || [];
      renderEvents(events);
      initSearch(events); 
    })
    .catch(err => console.error(err));
}

export function renderEvents(list) {
  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = '';

  if (!list || list.length === 0) {
    eventsContainer.innerHTML = `<p class="no-events">Подій не знайдено</p>`;
    return;
  }

  const limited = list.slice(0, 20);

  limited.forEach((ev, i) => {
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


export function renderEventsByCountry(code) {
  fetchEvents(code);
}

fetchEvents();
