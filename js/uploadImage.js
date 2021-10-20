/* eslint-disable no-template-curly-in-string */
const formImage = document.querySelector('.img-upload__form');
const imgLoad = document.querySelector('.img-upload__overlay');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const scaleImage = document.querySelector('.img-upload__scale');
const filter = document.querySelector('.img-upload__effects');
const sizeImg = formImage.querySelector('img');

formImage.addEventListener('change',() =>{
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
});

const onClickcloseButton = closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
  closeButton.removeEventListener('click', onClickcloseButton);
});

closeButton.addEventListener('click', onClickcloseButton);


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
    scaleSize=`${scaleSize - 25}%`;
    scaleImage.querySelector('.scale__control--value').value = scaleSize;
    /*if (scaleSize === '100%' ) {
      sizeImg.style.transform = 'scale(1)';}
    if (scaleSize === '75%' ) {
      sizeImg.style.transform = 'scale(0.75)';}
    if (scaleSize === '50%' ) {
      sizeImg.style.transform = 'scale(0.5)';}
    if (scaleSize === '25%' ) {
      sizeImg.style.transform = 'scale(0.25)';}
  }*/
    scaleSize = parseFloat(scaleSize) *0.01;
    console.log(scaleSize);
    if (scaleSize >=1 ) {
      sizeImg.style.transform = `scale(${scaleSize})`;
    }
  }
});
scaleImage.querySelector('.scale__control--bigger').addEventListener('click',() =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize < 100) {
    scaleSize=`${scaleSize + 25}%`;
    scaleImage.querySelector('.scale__control--value').value = scaleSize;
    if (scaleSize === '100%' ) {
      sizeImg.style.transform = 'scale(1)';}
    if (scaleSize === '75%' ) {
      sizeImg.style.transform = 'scale(0.75)';}
    if (scaleSize === '50%' ) {
      sizeImg.style.transform = 'scale(0.5)';}
    if (scaleSize === '25%' ) {
      sizeImg.style.transform = 'scale(0.25)';}
  }

});

const onFilterChange = (evt) =>{
  if (evt.target.matches('input[type="radio"]')) {
    const filterName = evt.target.value;
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
formImage.addEventListener('change', onFilterChange);

formImage.addEventListener('submit', (e) => {
  // Отключаем событие по умолчанию
  e.prevent.Default();
  // Очищаем поля формы
  e.target.reset();
});
