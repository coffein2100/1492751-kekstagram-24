
import {showImages,updatePictureData,showImegesFilter} from './createImage.js';
import './uploadImage.js';
import {getData} from './api.js';


getData((pictures) => {
  showImages(pictures);
  updatePictureData(pictures);
  showImegesFilter(pictures);
});

