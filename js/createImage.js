import './showBigViewport.js';
import {showBigPicture} from './showBigViewport.js';
import {sortInput} from './sortImages.js';
const randomPicture = document.querySelector('.pictures');
const imagesFilter = document.querySelector('.img-filters');
export const bigPicture = document.querySelector('.big-picture');
const description =  bigPicture.querySelector('.social__caption');
const comments = bigPicture.querySelector('.comments-count');
const likes = bigPicture.querySelector('.likes-count');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const largeImage = bigPicture.querySelector('img');
const bigPicturecomment= document.querySelector('.social__comments');
const socialComentsView = document.querySelector('.comments-countview');
const comentsbutton = document.querySelector('.comments-loader');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export let currentChosenIndex;
export let currentPictureData;
let quantity=5;
export const updatePictureData = (data) => {
  currentPictureData = data;
};

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

const showImages = (images) => {
  const similarImageFragment = document.createDocumentFragment();
  let size = images.length;
  let sortedImages;

  if (sortInput.value === 'default') {
    sortedImages = images;
  }
  else if (sortInput.value === 'random') {
    sortedImages = images.slice().sort(() => Math.random() - 0.5);
    size = 10;
  } else if (sortInput.value === 'discussed') {
    sortedImages = images.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
  }

  sortedImages.slice(0,size).forEach((image) => {
    const imageElement = similarImageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__comments').textContent = image.comments.length;
    imageElement.querySelector('.picture__likes').textContent = image.likes;
    imageElement.querySelector('.picture__img').src = image.url;
    similarImageFragment.appendChild(imageElement);
    updatePictureData(sortedImages);
  });
  randomPicture.querySelectorAll('.picture').forEach((pic) => pic.remove());
  randomPicture.appendChild(similarImageFragment);
};
export const showMoreComments = () => {
  quantity+=5;
  if (quantity> comments.textContent){
    quantity=comments.textContent;
    comentsbutton.classList.add('hidden');
  }
  renderBigPicture(currentPictureData[currentChosenIndex]);
  socialComentsView.textContent = `${quantity}`;
};

document.querySelector('.pictures').addEventListener('click', (evt) => {
  if (!evt.target.closest('.picture')){
    return;
  }
  const photos = Array.from(document.querySelectorAll('.picture'));
  const index = photos.indexOf(evt.target.closest('.picture'));
  currentChosenIndex = index;
  showBigPicture();
  renderBigPicture(currentPictureData[currentChosenIndex]);
});

const showImegesFilter = () => {
  imagesFilter.classList.remove('img-filters--inactive');
};

export const closeBigPicture = () => {
  modalView.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  quantity=5;
  socialComentsView.textContent = `${quantity}`;
  comentsbutton.classList.remove('hidden');
  comentsbutton.removeEventListener('click', showMoreComments);
  closeButton.removeEventListener('click', closeBigPicture);
};
export {showImages,showImegesFilter};
