
import {showImages,updatePictureData,showImegesFilter} from './createImage.js';
import './sortImages.js';
import {sortDefaultClick, sortRandomClick, sortDiscussedClick} from './sortImages.js';
import './uploadImage.js';
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;

getData((pictures) => {
  showImages(pictures);
  updatePictureData(pictures);
  showImegesFilter();

  sortDefaultClick(debounce(
    () => showImages(pictures),
    RERENDER_DELAY,
  ));

  sortRandomClick(debounce(
    () => showImages(pictures),
    RERENDER_DELAY,
  ));

  sortDiscussedClick(debounce(
    () => showImages(pictures),
    RERENDER_DELAY,
  ));
});

