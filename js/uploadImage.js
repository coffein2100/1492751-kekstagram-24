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

const cheсkHashtags = () => {
  let  arrayHashtag = hashtags.value.toLowerCase();
  const usedHashtag = new Set();
  arrayHashtag=arrayHashtag.split(' ');
  const newArrayHashtag = arrayHashtag.filter((element) => element !== '');
  //console.log(newArrayHashtag);
  if (newArrayHashtag.length >5){
    hashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }
  else {
    hashtags.setCustomValidity('');
  }
  newArrayHashtag.forEach((value) => {
    if (usedHashtag.has(value)){hashtags.setCustomValidity('хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. Oдин и тот же хэш-тег не может быть использован дважды');}
    else {usedHashtag.add(value);}
  });

  for (let i=0;i<newArrayHashtag.length;i++){
    const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    newArrayHashtag[i].split('');

    if (!newArrayHashtag[i].startsWith('#')){
      hashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
    }
    else if (newArrayHashtag[i].length>20 ){
      hashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
    }
    else if (newArrayHashtag[i].length < 2 ) {
      hashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    }
    newArrayHashtag[i]= newArrayHashtag[i].substr(1);
    if (format.test(newArrayHashtag[i])) {
      hashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    }

  }
  hashtags.reportValidity();


};

const cheсkComment = () => {
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
const onFilterChange = (evt) =>{
  if (evt.target.matches('input[type="radio"]')) {
    const filterName = evt.target.value;
    sizeImg.className = `effects__preview--${  filterName}`;
  }
};
const clearForm = () => {
  formImage.querySelector('input').value = '';
  sizeImg.style.transform = 'scale(1)';
  sizeImg.className = 'effects__preview--none';
};

const onCloseClick = () => {
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseClick);
  littleButton.removeEventListener('click', reduceSize);
  bigButton.removeEventListener('click', increaseSize);
  formImage.removeEventListener('change', onFilterChange);
  comment.removeEventListener('input', cheсkComment);
  hashtags.removeEventListener('input', cheсkHashtags);
  clearForm();
};
const keyDownFormImage = (event) => {
  if (event.key === ESCAPE_BUTTON && document.activeElement !== comment && document.activeElement !== hashtags) {
    event.preventDefault();
    imgLoad.classList.add('hidden');
    modalView.classList.remove('modal-open');
    formImage.addEventListener('keyup', keyDownFormImage);
    closeButton.removeEventListener('click', onCloseClick);
    formImage.removeEventListener('keydown', keyDownFormImage);
    littleButton.removeEventListener('click', reduceSize);
    bigButton.removeEventListener('click', increaseSize);
    comment.removeEventListener('input', cheсkComment);
    hashtags.removeEventListener('input', cheсkHashtags);
    clearForm();
  }
};
const openUploadForm = () => {
  closeButton.addEventListener('click', onCloseClick);
  formImage.addEventListener('keyup', keyDownFormImage);
  littleButton.addEventListener('click', reduceSize);
  bigButton.addEventListener('click', increaseSize);
  formImage.addEventListener('change', onFilterChange);
  comment.addEventListener('input', cheсkComment);
  hashtags.addEventListener('input', cheсkHashtags);
};
const formChange = () => {
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
  openUploadForm();
};

formImage.addEventListener('change', formChange);
