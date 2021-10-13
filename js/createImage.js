
import {similarImages} from './data.js';
import {bigPicture} from './showBigViewport.js';
const randomPicture = document.querySelector('.pictures');
const bigImageSocial = document.querySelector('.big-picture__social');
const bigImageComents = document.querySelector('.social__comment-count');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


function showImages (images) {
  const similarImageFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const imageElement = similarImageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__comments').textContent = image.comments.length;
    imageElement.querySelector('.picture__likes').textContent = image.likes;
    imageElement.querySelector('.picture__img').src = image.url;
    bigPicture.querySelector('.big-picture__img img').src = image.url;
    bigImageSocial.querySelector('.social__caption').textContent = image.description;
    bigImageSocial.querySelector('.likes-count').textContent = image.likes;
    bigImageComents.querySelector('.comments-count').textContent = image.comments.length;
    similarImageFragment.appendChild(imageElement);
  });
  randomPicture.appendChild(similarImageFragment);
}
showImages(similarImages);

