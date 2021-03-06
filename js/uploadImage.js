import {sendData} from './api.js';
const MIN_COMMENT_LENGTH = 0;
const ESCAPE_BUTTON = 'Escape';
const MAX_COMMENT_LENGTH = 140;
const formImage = document.querySelector('.img-upload__form');
const imgLoad = document.querySelector('.img-upload__overlay');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const scaleImage = document.querySelector('.img-upload__scale');
const sizeImg = formImage.querySelector('img');
const comment = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');
const littleButton = scaleImage.querySelector('.scale__control--smaller');
const bigButton =  scaleImage.querySelector('.scale__control--bigger');
let scaleSize = scaleImage.querySelector('.scale__control--value').value;
const effectLevel = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.img-upload__slider');
const specialElement = document.querySelector('.effects__list');
const sliderView = document.querySelector('.img-upload__effect-level');
const messageSuccessTask = document.querySelector('#success').content;
const messageErrorTask = document.querySelector('#error').content;

const createMessageError = () => {
  document.body.appendChild(messageErrorTask);
  const messageWindowError = document.querySelector('.error');
  messageWindowError.classList.add('hidden');
  const erorrButton = document.querySelector('.error__button');
  const closeMessageErorr = () =>{
    const messageWindow = document.querySelector('.error');
    messageWindow.classList.add('hidden');
  };
  const keyDownSuccessMessage = (evt) => {
    const messageWindow = document.querySelector('.error');
    if (evt.key === ESCAPE_BUTTON || evt.target.closest('.error')) {
      messageWindow.classList.add('hidden');
    }
  };
  window.addEventListener('keyup', keyDownSuccessMessage);
  window.addEventListener('click', keyDownSuccessMessage);
  erorrButton.addEventListener('click',closeMessageErorr);
};
createMessageError();

const createMessageSucces = () => {
  document.body.appendChild(messageSuccessTask);
  const messageWindowSuccess = document.querySelector('.success');
  messageWindowSuccess.classList.add('hidden');
  const successButton = document.querySelector('.success__button');
  const closeMessageSuccess = () =>{
    const messageWindow = document.querySelector('.success');
    messageWindow.classList.add('hidden');
  };
  const keyDownSuccessMessage = (evt) => {
    const messageWindow = document.querySelector('.success');
    if (evt.key === ESCAPE_BUTTON || evt.target.closest('.success')) {
      messageWindow.classList.add('hidden');
    }
  };
  window.addEventListener('keyup', keyDownSuccessMessage);
  window.addEventListener('click', keyDownSuccessMessage);
  successButton.addEventListener('click',closeMessageSuccess);
};
createMessageSucces();
const showMessageSuccess = () => {
  const messageWindowSuccess = document.querySelector('.success');
  messageWindowSuccess.classList.remove('hidden');
};

const checkHashtags = () => {
  let  arrayHashtag = hashtags.value.toLowerCase();
  const usedHashtag = new Set();
  arrayHashtag=arrayHashtag.split(' ');
  const newArrayHashtag = arrayHashtag.filter((element) => element !== '');
  if (newArrayHashtag.length >5){
    hashtags.setCustomValidity('???????????? ?????????????? ???????????? ???????? ??????-??????????');
  }
  else {
    hashtags.setCustomValidity('');
  }
  newArrayHashtag.forEach((value) => {
    if (usedHashtag.has(value)){hashtags.setCustomValidity('??????-???????? ?????????????????????????????? ?? ????????????????: #???????????? ?? #???????????? ?????????????????? ?????????? ?? ?????? ???? ??????????. O?????? ?? ?????? ???? ??????-?????? ???? ?????????? ???????? ?????????????????????? ????????????');}
    else {usedHashtag.add(value);}
  });
  for (let i=0;i<newArrayHashtag.length;i++){
    const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    newArrayHashtag[i].split('');
    if (!newArrayHashtag[i].startsWith('#')){
      hashtags.setCustomValidity('??????-?????? ???????????????????? ?? ?????????????? # (??????????????)');
    }
    else if (newArrayHashtag[i].length>20 ){
      hashtags.setCustomValidity('???????????????????????? ?????????? ???????????? ??????-???????? 20 ????????????????, ?????????????? ??????????????');
    }
    else if (newArrayHashtag[i].length < 2 ) {
      hashtags.setCustomValidity('??????-?????? ???? ?????????? ???????????????? ???????????? ???? ?????????? ??????????????');
    }
    newArrayHashtag[i]= newArrayHashtag[i].substr(1);
    if (format.test(newArrayHashtag[i])) {
      hashtags.setCustomValidity('???????????? ?????????? ?????????????? ???????????? ???????????????? ???? ???????? ?? ?????????? ?? ???? ?????????? ?????????????????? ??????????????, ?????????????????????? (#, @, $ ?? ??. ??.), ?????????????? ???????????????????? (????????, ??????????, ?????????????? ?? ??. ??.), ???????????? ?? ??. ??.;');
    }
  }
  hashtags.reportValidity();
};
const checkComment = () => {
  const commentLength = comment.value.length;
  if (commentLength <MIN_COMMENT_LENGTH) {
    comment.setCustomValidity(`?????? ${  MIN_COMMENT_LENGTH - commentLength}????????.`);
  } else if (commentLength > MAX_COMMENT_LENGTH) {
    comment.setCustomValidity(`?????????????? ???????????? ${  commentLength - MAX_COMMENT_LENGTH} ????????.`);
  } else {
    comment.setCustomValidity('');
  }
  comment.reportValidity();
};
const updateSize = (size) =>{
  scaleSize = parseFloat(scaleSize);
  scaleSize +=size;
  scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
  sizeImg.style.transform = `scale(${scaleSize/100})`;
};
const reduceSize = () =>{
  if (scaleSize !==25)
  {updateSize(-25);}
};
const increaseSize = () =>{
  if (scaleSize <100)
  {updateSize(25);}
};

const changeEffect = () => {
  if (sizeImg.className === 'effects__preview--chrome'){
    sizeImg.style.filter = `grayscale(${effectLevel.value})`;
  }
  if (sizeImg.className === 'effects__preview--sepia'){
    sizeImg.style.filter = `sepia(${effectLevel.value})`;
  }
  if (sizeImg.className === 'effects__preview--marvin'){
    sizeImg.style.filter = `invert(${`${effectLevel.value}%`})`;
  }
  if (sizeImg.className === 'effects__preview--phobos'){
    sizeImg.style.filter = `blur(${`${effectLevel.value}px`})`;
  }
  if (sizeImg.className === 'effects__preview--heat'){
    sizeImg.style.filter = `brightness(${effectLevel.value})`;
  }
};

const onFilterChange = (evt) =>{
  if (evt.target.matches('input[type="radio"]')) {
    const filterName = evt.target.value;
    sizeImg.className = `effects__preview--${filterName}`;
  }
  if (sizeImg.className === 'effects__preview--none'){
    sliderView.classList.add('hidden');
    sliderElement.classList.add('hidden');
    sizeImg.style.setProperty('filter', 'initial');
    effectLevel.value = '';
  }
  if (sizeImg.className !== 'effects__preview--none'){
    sliderElement.classList.remove('hidden');
    sliderView.classList.remove('hidden');
  }
  changeEffect();
};
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  changeEffect();
});
const changeFilter = (evt) => {
  if (evt.target.checked) {
    const filterName = evt.target.value;
    if (filterName === 'chrome' || filterName === 'sepia' ){
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    if (filterName === 'marvin' ){
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    if (filterName === 'phobos' ){
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    if (filterName === 'heat' ){
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    sliderElement.noUiSlider.set(100);
  }
};

const clearForm = () => {
  formImage.querySelector('input').value = '';
  sizeImg.style.transform = 'scale(1)';
  sizeImg.className = 'effects__preview--none';
  sliderView.classList.add('hidden');
  comment.value = '';
  hashtags.value = '';
  formImage.reset();
};
const closeForm = () => {
  imgLoad.classList.add('hidden');
  modalView.classList.remove('modal-open');
  littleButton.removeEventListener('click', reduceSize);
  bigButton.removeEventListener('click', increaseSize);
  comment.removeEventListener('input', checkComment);
  hashtags.removeEventListener('input', checkHashtags);
  sliderView.classList.add('hidden');
  specialElement.removeEventListener('change',changeFilter);

};
const onCloseClick = () => {
  closeForm();
  clearForm();
  sliderView.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseClick);
  specialElement.removeEventListener('change',changeFilter);
};
const keyDownFormImage = (evt) => {
  if (evt.key === ESCAPE_BUTTON && document.activeElement !== comment && document.activeElement !== hashtags) {
    evt.preventDefault();
    closeForm();
    clearForm();
    specialElement.removeEventListener('change',changeFilter);
    sliderView.classList.add('hidden');
    formImage.removeEventListener('keyup', keyDownFormImage);
  }
};
const setUserFormSubmit = (onSuccess) => {
  formImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(showMessageSuccess()),
      () => createMessageError(),
      new FormData(evt.target),
    );
  });
};

const openUploadForm = () => {
  closeButton.addEventListener('click', onCloseClick);
  formImage.addEventListener('keyup', keyDownFormImage);
  littleButton.addEventListener('click', reduceSize);
  bigButton.addEventListener('click', increaseSize);
  formImage.addEventListener('change', onFilterChange);
  comment.addEventListener('input', checkComment);
  hashtags.addEventListener('input', checkHashtags);
  closeButton.addEventListener('click', onCloseClick);
  specialElement.addEventListener('change',changeFilter);
  sliderElement.classList.add('hidden');
  sliderView.classList.add('hidden');

};
const formChange = () => {
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
  openUploadForm();
};
formImage.addEventListener('change', formChange);
formImage.addEventListener('submit', setUserFormSubmit(onCloseClick));
