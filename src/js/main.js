import { BASE_URL, KEY } from "./base-api.js";
fetch(`${BASE_URL}events.json?apikey=${KEY}`)
.then(response => response.json())
  .then(data => console.log(data))
