
import {showImages,updatePictureData} from './createImage.js';
import './uploadImage.js';
import {getData} from './api.js';


getData((picture) => {
  showImages(picture);
  updatePictureData(picture);
});

