import {showMoreComments,closeBigPicture} from './createImage.js';
const ESCAPE_BUTTON = 'Escape';
export const bigPicture = document.querySelector('.big-picture');
export const comentsbutton = document.querySelector('.comments-loader');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');

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

