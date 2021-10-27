
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
    const pictureElement = evt.target.closest('.picture');
    let index = pictureElement.querySelector('img').getAttribute('src').slice(7, 9); // Подумай, как можно находить индекс
    if (index.endsWith('.')){
      index=index.replace('.','');
    }
    //const pictureData = currectPictureData[index];
    currentChosenIndex = index-1;
    // ... далее обработка
    showBigPicture();
    renderBigPicture(similarImages[currentChosenIndex]);
  });
};
updatePictureData(similarImages);
/*
const smallPictures = document.querySelectorAll('.picture');

smallPictures.forEach((picture, i)=> {
  picture.addEventListener('click', () => {
    const pictureIndex = i;
    showBigPicture();
    renderBigPicture(similarImages[pictureIndex]);
  });
});*/
