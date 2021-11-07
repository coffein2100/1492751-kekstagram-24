import {showBigPicture, renderBigPicture} from './showBigViewport.js';
import {sortInput} from './sortImages.js';
const randomPicture = document.querySelector('.pictures');
const imagesFilter = document.querySelector('.img-filters');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export let currentChosenIndex;
export let currentPictureData;
export const updatePictureData = (data) => {
  currentPictureData = data;
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

  sortedImages.slice(0,size).forEach(({url, comments, likes}) => {
    const imageElement = similarImageTemplate.cloneNode(true);
    imageElement.querySelector('.picture__comments').textContent = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imageElement.querySelector('.picture__img').src = url;
    similarImageFragment.appendChild(imageElement);
    updatePictureData(sortedImages);
  });
  randomPicture.querySelectorAll('.picture').forEach((pic) => pic.remove());
  randomPicture.appendChild(similarImageFragment);
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

export {showImages,showImegesFilter};
