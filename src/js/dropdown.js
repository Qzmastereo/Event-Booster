import countries from './countries.js';
import { renderEventsByCountry } from './main.js';

export function initDropdown() {
  const dropdownBtn = document.getElementById('select-country-btn');
  const dropdownList = document.querySelector('.js-dropdown');


  Object.entries(countries).forEach(([code, name]) => {
    if (!code) return;
    const li = document.createElement('li');
    li.textContent = name;
    li.dataset.code = code;
    li.classList.add('country-item');
    dropdownList.appendChild(li);
  });


  dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('open');
  });


  dropdownList.addEventListener('click', e => {
    if (e.target.classList.contains('country-item')) {
      const code = e.target.dataset.code;
      const name = e.target.textContent;

      dropdownBtn.textContent = name; 
      dropdownList.classList.remove('open'); 

      renderEventsByCountry(code); 
    }
  });
}
