
import {similarImages} from './data.js';
const randomPicture = document.querySelector('.pictures');

const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const imageElements = similarImages;

const similarImageFragment = document.createDocumentFragment();

imageElements.forEach((image) => {
  const imageElement = similarImageTemplate.cloneNode(true);
  imageElement.querySelector('.picture__comments').textContent = image.comments.length;
  imageElement.querySelector('.picture__likes').textContent = image.likes;
  imageElement.querySelector('.picture__img').removeAttribute('src');
  imageElement.querySelector('.picture__img').setAttribute('src', image.url);
  similarImageFragment.appendChild(imageElement);
});
randomPicture.appendChild(similarImageFragment);
