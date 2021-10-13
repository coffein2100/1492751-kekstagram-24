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
