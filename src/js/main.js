import { BASE_URL, KEY } from "./base-api.js";
import { COUNTRIES } from "./countries.js";

const countryList = document.getElementById("countries");
const eventsContainer = document.getElementById("events");

let events = []; 

fetch(`${BASE_URL}events.json?apikey=${KEY}`)
  .then(response => response.json())
  .then(data => {
    events = data._embedded.events;
    console.log("Отримав події:", events);
  })
  .catch(err => console.error(err));

Object.entries(COUNTRIES).forEach(([code, name]) => {
  const li = document.createElement("li");
  li.textContent = name;
  li.addEventListener("click", () => renderEventsByCountry(code));
  countryList.appendChild(li);
});

function renderEventsByCountry(code) {
  eventsContainer.innerHTML = ""; 
  const filtered = events.filter(e => e._embedded.venues[0].country.countryCode === code);

  if (filtered.length === 0) {
    eventsContainer.innerHTML = `<p>Немає подій у цій країні</p>`;
    return;
  }

  filtered.forEach(ev => {
    const venue = ev._embedded.venues[0];
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>📅 ${ev.dates.start.localDate}</p>
      <p>📍 ${venue.name}, ${venue.city.name}</p>
    `;
    eventsContainer.appendChild(card);
  });
}
