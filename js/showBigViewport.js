import {showMoreComments} from './createImage.js';
const ESCAPE_BUTTON = 'Escape';
export const bigPicture = document.querySelector('.big-picture');
const socialComentsView = document.querySelector('.comments-countview');
let quantity=5;
export const comentsbutton = document.querySelector('.comments-loader');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');

/*
export const renderBigPicture = (bigImage) => {
  bigPicturecomment.innerHTML = '';
  description.textContent = bigImage.description;
  comments.textContent = bigImage.comments.length;
  likes.textContent = bigImage.likes;
  largeImage.src = bigImage.url;
  const arrayComments = bigImage.comments.slice(0, quantity);
  const bigImageFragment = document.createDocumentFragment();
  if (quantity>=comments.textContent){
    quantity=comments.textContent;
    socialComentsView.textContent = `${quantity}`;
    comentsbutton.classList.add('hidden');
  }
  arrayComments.forEach((comment) => {

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
const showMoreComments = () => {
  quantity+=5;
  if (quantity> comments.textContent){
    quantity=comments.textContent;
    comentsbutton.classList.add('hidden');
  }
  renderBigPicture(currentPictureData[currentChosenIndex]);
  socialComentsView.textContent = `${quantity}`;
};*/
export const closeBigPicture = () => {
  modalView.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  quantity=5;
  socialComentsView.textContent = `${quantity}`;
  comentsbutton.classList.remove('hidden');
  comentsbutton.removeEventListener('click', showMoreComments);
  closeButton.removeEventListener('click', closeBigPicture);
};
export const escCloseBigPicture = (evt) => {
  if (evt.code === ESCAPE_BUTTON) {
    closeBigPicture();
    window.removeEventListener('keydown',escCloseBigPicture);
    closeButton.removeEventListener('click', closeBigPicture);
  }
};
export const showBigPicture = () => {

  bigPicture.classList.remove('hidden');
  modalView.classList.add('modal-open');
  comentsbutton.addEventListener('click', showMoreComments);
  closeButton.addEventListener('click', closeBigPicture);
  window.addEventListener('keydown',escCloseBigPicture);
};

