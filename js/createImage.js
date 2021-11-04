import {showBigPicture, renderBigPicture} from './showBigViewport.js';
const randomPicture = document.querySelector('.pictures');
const imegesFilter = document.querySelector('.img-filters');
const namesFilter = document.querySelectorAll('.img-filters__button');
const similarImageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export let currentChosenIndex;
export let currectPictureData;

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

export const updatePictureData = (data) => {
  currectPictureData = data;
};

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


const discussed = (a, b) => {
  {return a.comments.length - b.comments.length;}
};

const showImegesFilter = () => {
  imegesFilter.classList.remove('img-filters--inactive');
};
imegesFilter.addEventListener('click', (evt) => {
  if (!evt.target.closest('.img-filters')){
    return;
  }
  const filterId = evt.target.closest('.img-filters__button').id;
  namesFilter.forEach((i) => i.classList.remove('img-filters__button--active'));
  evt.target.closest('.img-filters__button').classList.add('img-filters__button--active');
  if (filterId === 'filter-random'){

  }
  if (filterId === 'filter-discussed'){

  }

});
export {showImages,showImegesFilter};
