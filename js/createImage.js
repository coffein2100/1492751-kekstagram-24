
import {similarImages} from './data.js';
import {showBigPicture, renderBigPicture} from './showBigViewport.js';

const randomPicture = document.querySelector('.pictures');
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
    similarImageFragment.appendChild(imageElement);
  });
  randomPicture.appendChild(similarImageFragment);
}
showImages(similarImages);
const smallPictures = document.querySelectorAll('.picture');

smallPictures.forEach((picture, i)=> {
  picture.addEventListener('click', () => {
    const pictureIndex = i;
    showBigPicture();
    renderBigPicture(similarImages[pictureIndex]);
  });
});
