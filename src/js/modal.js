import { getEvents, getCurrentPage } from './main.js';

const backDrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal-window');
const closeBtn = document.querySelector('.modal-close-btn');
const modalImg = modal.querySelector('.modal-event-img');
const modalLogo = modal.querySelector('.modal-event-logo');
const modalInfo = modal.querySelector('.card-info');
const modalInfoFull = document.querySelector('.card-info-full');

const modalDate = modal.querySelector('.card-date');
const modalPlace = modal.querySelector('.card-place');
const modalArtists = modal.querySelector('.card-arthour');
const modalPrices = modal.querySelectorAll('.card-price-st, .card-price-vip');

const body = document.body;
const viewFull = document.querySelector('.view-full');
const closeFull = document.querySelector('.close-full');
const infoModal = document.querySelector('.info-modal');
infoModal.style.display = 'none';


export function modalWindow() {
  const eventsContainer = document.getElementById('events');

  eventsContainer.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;

    const index = Array.from(eventsContainer.children).indexOf(card);
    const events = getEvents();
    const currentPage = getCurrentPage();
    const event = events[(index + ((currentPage - 1) * 20))];



    if (!event) return;

    const venue = event._embedded?.venues?.[0];
    const image = event.images?.[0]?.url;
    const name = event.name;
    const date = event.dates?.start?.localDate || '—';
    const city = venue?.city?.name || '—';
    const place = venue?.name || '—';
    const info = event.info || 'No description available';
    const artists = event.promoter?.name || event.classifications?.[0]?.genre?.name || '—';
    const priceRanges = event.priceRanges || [];

    modalImg.src = image;
    modalLogo.src = image;
    if (info.length > 125) {
      viewFull.classList.remove('invisible')
      modalInfo.textContent = info.slice(0, 125) + '...';
 
      viewFull.addEventListener('click', () => {
        modalInfoFull.textContent = info;
        infoModal.classList.remove('is-hidden')
        infoModal.style.display = 'flex';
      });
      closeFull.addEventListener('click', () => {
        infoModal.classList.add('is-hidden');
        setTimeout(() => {
          infoModal.style.display = 'none';
        }, 500);
      })

    } else {
      viewFull.classList.add('invisible')
      modalInfo.textContent = info;
    }


    modalDate.textContent = date;
    modalPlace.textContent = `${city}, ${place}`;
    modalArtists.textContent = artists;

    // if (priceRanges.length > 0) {
    //   modalPrices[0].textContent = `🎟 ${priceRanges[0].type} ${priceRanges[0].min}–${priceRanges[0].max} ${priceRanges[0].currency}`;
    //   modalPrices[1].textContent = priceRanges[1]
    //     ? `🎟 ${priceRanges[1].type} ${priceRanges[1].min}–${priceRanges[1].max} ${priceRanges[1].currency}`
    //     : '';
    // } else {
    //   modalPrices[0].textContent = 'Ціни не вказані';
    //   modalPrices[1].textContent = '';
    // }
    modal.classList.remove('closed')
    modal.classList.add('open');
    backDrop.classList.remove('is-hidden')

    body.classList.add('no-scroll')
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('closed');
    modal.classList.remove('open');
    backDrop.classList.add('is-hidden');
    body.classList.remove('no-scroll')
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      backDrop.classList.add('is-hidden');
      modal.classList.remove('open')
      modal.classList.add('closed')
      body.classList.remove('no-scroll')
    };
  });
}