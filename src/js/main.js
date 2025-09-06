import { BASE_URL, KEY } from "./base-api.js";

const countryList = document.getElementById("countries");
const eventsContainer = document.getElementById("events"); 

let events = [];


fetch(`${BASE_URL}events.json?apikey=${KEY}`)
  .then(response => response.json())
  .then(data => {
    events = data._embedded.events; 
    renderCountries(events);
  })
  .catch(err => console.error(err));


function renderCountries(events) {
  const countries = [...new Set(events.map(e => e._embedded.venues[0].country.name))];

  countries.forEach(country => {
    const li = document.createElement("li");
    li.textContent = country;
    li.addEventListener("click", () => renderEventsByCountry(country));
    countryList.appendChild(li);
  });
}


function renderEventsByCountry(country) {
  eventsContainer.innerHTML = "";
  const filtered = events.filter(e => e._embedded.venues[0].country.name === country);

  filtered.forEach(ev => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${ev.name}</h3>
      <p>${ev.dates.start.localDate}</p>
      <p>${ev._embedded.venues[0].name} – ${ev._embedded.venues[0].city.name}</p>
    `;
    eventsContainer.appendChild(card);
  });
}
