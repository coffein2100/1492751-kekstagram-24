import {similarImages} from './data.js';
export const bigPicture = document.querySelector('.big-picture');
const hidenComents = document.querySelector('.social__comment-count');
const hidenComentsbutton = document.querySelector('.comments-loader');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');


bigPicture.classList.remove('hidden');
hidenComents.classList.add('hidden');
hidenComentsbutton.classList.add('hidden');
modalView.classList.add('modal-open');


closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

function renderBigPicture (images) {
  bigPicture.querySelector('.social__caption').textContent = images.description;
  bigPicture.querySelector('.comments-count').textContent = images.comments.length;
  bigPicture.querySelector('.likes-count').textContent = images.likes;
  bigPicture.querySelector('img').src = images.url;


  images.comments.forEach((comment) => {
    bigPicture.querySelector('.social__comments').innerHTML = '';

  });
}

renderBigPicture(similarImages[0]);
