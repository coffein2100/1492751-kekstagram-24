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

const renderBigPicture = (bigImage) => {
  const bigPicturecomment= document.querySelector('.social__comments');
  bigPicturecomment.innerHTML = '';
  bigPicture.querySelector('.social__caption').textContent = bigImage.description;
  bigPicture.querySelector('.comments-count').textContent = bigImage.comments.length;
  bigPicture.querySelector('.likes-count').textContent = bigImage.likes;
  bigPicture.querySelector('img').src = bigImage.url;
  const bigImageFragment = document.createDocumentFragment();

  bigImage.comments.forEach((comment) => {

    const element = document.createElement('li');
    const image = document.createElement('img');
    const text = document.createElement('p');
    image.classList.add('social__picture');
    element.classList.add('social__comment');
    text.classList.add('social__text');
    image.src = comment.avatar;
    image.alt = comment.name;
    image.width = 35;
    image.height = 35;
    text.textContent = comment.message;
    element.appendChild(image);
    element.appendChild(text);
    bigImageFragment.appendChild(element);
  });
  bigPicturecomment.appendChild(bigImageFragment);
};

renderBigPicture(similarImages[0]);

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modalView.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});
