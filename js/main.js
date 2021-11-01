// eslint-disable-next-line no-unused-vars
import {similarImages} from './data.js';
import {showImages,updatePictureData} from './createImage.js';
import './uploadImage.js';
import {getData} from './api.js';

getData((picture) => {
  showImages(picture);
  updatePictureData(picture);
});
