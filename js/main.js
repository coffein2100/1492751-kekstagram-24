
import {showImages,updatePictureData,showImegesFilter} from './createImage.js';
import './sortImages.js';
import {sortButtons} from './sortImages.js';
import './uploadImage.js';
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';
import './loadUserPicture.js';
const RERENDER_DELAY = 500;

getData((pictures) => {
  showImages(pictures);
  updatePictureData(pictures);
  showImegesFilter();

  sortButtons(debounce(
    () => showImages(pictures),
    RERENDER_DELAY,
  ));
});

