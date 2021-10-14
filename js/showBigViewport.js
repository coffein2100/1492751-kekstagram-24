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
  const bigPicturecomment= document.querySelector('.social__comments');
  bigPicturecomment.innerHTML = '';
  bigPicture.querySelector('.social__caption').textContent = images.description;
  bigPicture.querySelector('.comments-count').textContent = images.comments.length;
  bigPicture.querySelector('.likes-count').textContent = images.likes;
  bigPicture.querySelector('img').src = images.url;

  images.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    const commentImg = document.createElement('img');
    const commentText = document.createElement('p');
    commentElement.classList.add('social__comment');
    commentText.classList.add('social__text');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentImg.width = 35;
    commentImg.height = 35;
    commentText.textContent = comment.message;
    bigPicturecomment.appendChild(commentElement);
    commentElement.appendChild(commentImg);
    commentElement.appendChild(commentText);
  });
}

renderBigPicture(similarImages[0]);

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modalView.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});
