
//import {similarImages} from './data.js';
import {showBigPicture, renderBigPicture} from './showBigViewport.js';

const randomPicture = document.querySelector('.pictures');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export let currentChosenIndex;
let currectPictureData;
export const updatePicture = (data) => {
  currectPictureData = data;
};
const showImages = (images) => {
  const similarImageFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const imageElement = similarImageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__comments').textContent = image.comments.length;
    imageElement.querySelector('.picture__likes').textContent = image.likes;
    imageElement.querySelector('.picture__img').src = image.url;
    similarImageFragment.appendChild(imageElement);
  });
  randomPicture.appendChild(similarImageFragment);
};

export const updatePictureData = () => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    if (!evt.target.closest('.picture')){
      return;
    }
    const photos = Array.from(document.querySelectorAll('.picture'));
    const index = photos.indexOf(evt.target.closest('.picture'));
    currentChosenIndex = index;
    showBigPicture();
    renderBigPicture(currectPictureData[currentChosenIndex]);

  });
};
//updatePictureData(similarImages);
export {showImages};
