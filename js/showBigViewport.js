import {similarImages} from './data.js';
const ESCAPE_BUTTON = 'Escape';
export const bigPicture = document.querySelector('.big-picture');
const description =  bigPicture.querySelector('.social__caption');
const comments = bigPicture.querySelector('.comments-count');
const likes = bigPicture.querySelector('.likes-count');
const largeImage = bigPicture.querySelector('img');
let socialComents = document.querySelector('.social__comment-count');
const comentsbutton = document.querySelector('.comments-loader');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPicturecomment= document.querySelector('.social__comments');
bigPicture.classList.remove('hidden');
modalView.classList.add('modal-open');
//hidenComents.classList.add('hidden');
//hidenComentsbutton.classList.add('hidden');

closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

const renderBigPicture = (bigImage) => {

  socialComents=socialComents.textContent;
  socialComents=socialComents.charAt(0);
  socialComents=parseFloat(socialComents);
  bigPicturecomment.innerHTML = '';
  description.textContent = bigImage.description;
  comments.textContent = bigImage.comments.length;
  likes.textContent = bigImage.likes;
  largeImage.src = bigImage.url;
  console.log(socialComents);
  const arrayComments = bigImage.comments.slice(0, socialComents);
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
  socialComents+=5;
  if (socialComents> comments.textContent){socialComents=comments.textContent}
  socialComents=`${socialComents} из ${ comments.textContent} комментариев`;
  console.log(socialComents);
};
comentsbutton.addEventListener('click', showMoreComments);
