import countries from './countries.js';

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

 
}
