/* eslint-disable no-template-curly-in-string */
const formImage = document.querySelector('.img-upload__form');
const imgLoad = document.querySelector('.img-upload__overlay');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const scaleImage = document.querySelector('.img-upload__scale');
const sizeImg = formImage.querySelector('img');
const comment = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');
const MIN_COMMENT_LENGTH = 0;
const MAX_COMMENT_LENGTH = 140;

const chekHashtags = () => {
  let  arrayHashtag = hashtags.value.toLowerCase();
  const usedHashtag = new Set();
  arrayHashtag=arrayHashtag.split(' ');
  if (arrayHashtag.length >5){
    hashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }
  else {
    hashtags.setCustomValidity('');
  }
  arrayHashtag.forEach((value) => {
    if (usedHashtag.has(value)){hashtags.setCustomValidity('хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Oдин и тот же хэш-тег не может быть использован дважды');}
    else {usedHashtag.add(value);}
  });

  for (let i=0;i<arrayHashtag.length;i++){
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    arrayHashtag[i].split('');
    if (!arrayHashtag[i].startsWith('#')){hashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');}
    else if (arrayHashtag[i].length>20 ){hashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');}
    else if (arrayHashtag[i].length < 2 ) {hashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');}
    arrayHashtag[i]= arrayHashtag[i].substr(1);
    if (format.test(arrayHashtag[i])) {hashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');}
  }
  hashtags.reportValidity();
};

const chekComment = () => {
  const commentLength = comment.value.length;
  if (commentLength <MIN_COMMENT_LENGTH) {
    comment.setCustomValidity(`Ещё ${  MIN_COMMENT_LENGTH - commentLength}симв.`);
  } else if (commentLength > MAX_COMMENT_LENGTH) {
    comment.setCustomValidity(`Удалите лишние ${  commentLength - MAX_COMMENT_LENGTH} симв.`);
  } else {
    comment.setCustomValidity('');
  }
  comment.reportValidity();
};


const reduceSize = () =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize > 25) {
    scaleSize -=25;
    scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
    sizeImg.style.transform = `scale(${scaleSize/100})`;
  }
};
const increaseSize = () =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize < 100) {
    scaleSize +=25;
    scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
    sizeImg.style.transform = `scale(${scaleSize/100})`;
  }
};
const onFilterChange = (evt) =>{
  if (evt.target.matches('input[type="radio"]')) {
    const filterName = evt.target.value;
    // eslint-disable-next-line no-useless-concat
    sizeImg.className = 'effects__preview--' + `${filterName}`;
  }
};
const clearForm = () => {
  formImage.querySelector('input').value = '';
  sizeImg.style.transform = 'scale(1)';
  sizeImg.className = 'effects__preview--none';
};

const keyDownFormImage = (evt) => {
  if (evt.keyCode === 27) {
    if (document.activeElement === formImage.querySelector('.text__hashtags') ||
    // eslint-disable-next-line no-empty
    document.activeElement === formImage.querySelector('.text__description')) {
    } else {
      modalView.classList.remove('modal-open');
      imgLoad.classList.add('hidden');
      // eslint-disable-next-line no-use-before-define
      closeButton.removeEventListener('click', onCloseClick);
      formImage.removeEventListener('keydown', keyDownFormImage);
      scaleImage.querySelector('.scale__control--smaller').removeEventListener('click', reduceSize);
      scaleImage.querySelector('.scale__control--bigger').removeEventListener('click', increaseSize);
      comment.removeEventListener('input', chekComment);
      hashtags.removeEventListener('input', chekHashtags);
      clearForm();
    }
  }
};

const onCloseClick = () => {
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseClick);
  formImage.removeEventListener('keydown', keyDownFormImage);
  scaleImage.querySelector('.scale__control--smaller').removeEventListener('click', reduceSize);
  scaleImage.querySelector('.scale__control--bigger').removeEventListener('click', increaseSize);
  formImage.removeEventListener('change', onFilterChange);
  comment.removeEventListener('input', chekComment);
  hashtags.removeEventListener('input', chekHashtags);
  clearForm();
};

const openUploadForm = () => {
  closeButton.addEventListener('click', onCloseClick);
  formImage.addEventListener('keydown', keyDownFormImage);
  scaleImage.querySelector('.scale__control--smaller').addEventListener('click', reduceSize);
  scaleImage.querySelector('.scale__control--bigger').addEventListener('click', increaseSize);
  formImage.addEventListener('change', onFilterChange);
  comment.addEventListener('input', chekComment);
  hashtags.addEventListener('input', chekHashtags);
};
const formChange = () => {
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
  openUploadForm();
};

formImage.addEventListener('change', formChange);
