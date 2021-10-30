
import {similarImages} from './data.js';
import {showBigPicture, renderBigPicture} from './showBigViewport.js';

const randomPicture = document.querySelector('.pictures');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export let currentChosenIndex;

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
export const updatePictureData = () => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')){
      const pictureElement = evt.target.closest('.picture');
      let index = pictureElement.querySelector('img').getAttribute('src').slice(7, 9);
      if (index.endsWith('.')){
        index=index.replace('.','');
      }
      currentChosenIndex = index-1;
      showBigPicture();
      renderBigPicture(similarImages[currentChosenIndex]);
    }
  });
};
updatePictureData(similarImages);
