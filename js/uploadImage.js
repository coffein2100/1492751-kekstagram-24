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
  let  hashtagsLength = hashtags.value;
  console.log(hashtagsLength);
  hashtags.setCustomValidity(`хэш-тег начинается с символа # (решётка);
  строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  хеш-тег не может состоять только из одной решётки;
  максимальная длина одного хэш-тега 20 символов, включая решётку;
  хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  хэш-теги разделяются пробелами;
  один и тот же хэш-тег не может быть использован дважды;
  нельзя указать больше пяти хэш-тегов;`);
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


const minSize = () =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize > 25) {
    scaleSize -=25;
    scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
    sizeImg.style.transform = `scale(${scaleSize/100})`;
  }
};
const maxSize = () =>{
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

const sendForm = (evt) => {
  evt.prevent.Default();
  // Очищаем поля формы
  sizeImg.style.transform = 'scale(1)';
  evt.target.reset();
};
const keyDownFormImage = (evt) => {
  if (evt.keyCode === 27) {
    if (document.activeElement === formImage.querySelector('.text__hashtags') ||
    // eslint-disable-next-line no-empty
    document.activeElement === formImage.querySelector('.text__description')) {
    } else {
      modalView.classList.remove('modal-open');
      imgLoad.classList.add('hidden');
    }
  }
};

const onCloseClick = () => {
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
  closeButton.removeEventListener('click', onCloseClick);
  formImage.removeEventListener('keydown', keyDownFormImage);
  scaleImage.querySelector('.scale__control--smaller').removeEventListener('click', minSize);
  scaleImage.querySelector('.scale__control--bigger').removeEventListener('click', maxSize);
  formImage.removeEventListener('change', onFilterChange);
  formImage.removeEventListener('submit', sendForm);
  comment.removeEventListener('input', chekComment);
  clearForm();
};

const openUploadForm = () => {
  closeButton.addEventListener('click', onCloseClick);
  formImage.addEventListener('keydown', keyDownFormImage);
  scaleImage.querySelector('.scale__control--smaller').addEventListener('click', minSize);
  scaleImage.querySelector('.scale__control--bigger').addEventListener('click', maxSize);
  formImage.addEventListener('change', onFilterChange);
  formImage.addEventListener('submit', sendForm);
  comment.addEventListener('input', chekComment);
  hashtags.addEventListener('input', chekHashtags);
};
const formChange = () => {
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
  openUploadForm();
};

formImage.addEventListener('change', formChange);

/*const formChange = formImage.addEventListener('change',() =>{
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
});

const onClickcloseButton = closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
});

const keyDownFormImage = formImage.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (document.activeElement === formImage.querySelector('.text__hashtags') ||
    document.activeElement === formImage.querySelector('.text__description')){
      return; } else {
      modalView.classList.remove('modal-open');
      imgLoad.classList.add('hidden');
      formImage.removeEventListener('click', keyDownFormImage);
    }
  }
});
closeButton.addEventListener('keydown', keyDownFormImage);

scaleImage.querySelector('.scale__control--smaller').addEventListener('click',() =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize > 25) {
    scaleSize -=25;
    scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
    sizeImg.style.transform = `scale(${scaleSize/100})`;
  }
});
scaleImage.querySelector('.scale__control--bigger').addEventListener('click',() =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize < 100) {
    scaleSize +=25;
    scaleImage.querySelector('.scale__control--value').value = `${scaleSize}%`;
    sizeImg.style.transform = `scale(${scaleSize/100})`;
  }
});

const onFilterChange = (evt) =>{
  if (evt.target.matches('input[type="radio"]')) {
    const filterName = evt.target.value;
    console.log(filterName);
    // eslint-disable-next-line no-useless-concat
    sizeImg.className = 'effects__preview--' + `${filterName}`;
    if (formImage.querySelector('img').classList.contains('effects__preview--chrome')) {formImage.querySelector('img').classList.remove('effects__preview--chrome');}
    if  (formImage.querySelector('img').classList.contains('effects__preview--sepia')) {formImage.querySelector('img').classList.remove('effects__preview--sepia');}
    if  (formImage.querySelector('img').classList.contains('effects__preview--marvin')) {formImage.querySelector('img').classList.remove('effects__preview--marvin');}
    if  (formImage.querySelector('img').classList.contains('effects__preview--phobos')) {formImage.querySelector('img').classList.remove('effects__preview--phobos');}
    if  (formImage.querySelector('img').classList.contains('effects__preview--heat'))  {formImage.querySelector('img').classList.remove('effects__preview--heat');}

    if (filterName === 'chrome'){
      formImage.querySelector('img').classList.add('effects__preview--chrome');
    }
    if (filterName === 'sepia'){
      formImage.querySelector('img').classList.add('effects__preview--sepia');
    }
    if (filterName === 'marvin'){
      formImage.querySelector('img').classList.add('effects__preview--marvin');
    }
    if (filterName === 'phobos'){
      formImage.querySelector('img').classList.add('effects__preview--phobos');
    }
    if (filterName === 'heat'){
      formImage.querySelector('img').classList.add('effects__preview--heat');
    }
    if (filterName === 'none'){
      formImage.querySelector('img').classList.remove();
    }

  }
};


formImage.addEventListener('submit', (e) => {
  // Отключаем событие по умолчанию
  e.prevent.Default();
  // Очищаем поля формы
  e.target.reset();
});*/
