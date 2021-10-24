import {similarImages} from './data.js';
const ESCAPE_BUTTON = 'Escape';
export const bigPicture = document.querySelector('.big-picture');
const description =  bigPicture.querySelector('.social__caption');
const comments = bigPicture.querySelector('.comments-count');
const likes = bigPicture.querySelector('.likes-count');
const largeImage = bigPicture.querySelector('img');
const socialComents = document.querySelector('.social__comment-count');
let quantity=5;
const comentsbutton = document.querySelector('.comments-loader');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPicturecomment= document.querySelector('.social__comments');
bigPicture.classList.remove('hidden');
modalView.classList.add('modal-open');

closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

const renderBigPicture = (bigImage) => {
  bigPicturecomment.innerHTML = '';
  description.textContent = bigImage.description;
  comments.textContent = bigImage.comments.length;
  likes.textContent = bigImage.likes;
  largeImage.src = bigImage.url;
  const arrayComments = bigImage.comments.slice(0, quantity);
  const bigImageFragment = document.createDocumentFragment();


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

renderBigPicture(similarImages[0]);

window.addEventListener('keydown', (evt) => {
  if (evt.code === ESCAPE_BUTTON) {
    evt.preventDefault();
    modalView.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});
const showMoreComments = () => {
  quantity+=5;
  if (quantity> comments.textContent){
    quantity=comments.textContent;
    comentsbutton.classList.add('hidden');
  }
  socialComents.textContent = `${quantity} из ${ comments.textContent} комментариев`;
  renderBigPicture(similarImages[0]);
};
comentsbutton.addEventListener('click', showMoreComments);
