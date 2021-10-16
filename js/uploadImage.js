const formImage = document.querySelector('.img-upload__form');
const imgLoad = document.querySelector('.img-upload__overlay');
const modalView = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const scaleImage = document.querySelector('.img-upload__scale');

formImage.addEventListener('change',() =>{
  imgLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
});

closeButton.addEventListener('click',  (evt) => {
  evt.preventDefault();
  modalView.classList.remove('modal-open');
  imgLoad.classList.add('hidden');
});
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modalView.classList.remove('modal-open');
    imgLoad.classList.add('hidden');
  }
});

scaleImage.querySelector('.scale__control--smaller').addEventListener('click',() =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize > 25) {
    scaleSize=`${scaleSize - 25  }%`;
    scaleImage.querySelector('.scale__control--value').value = scaleSize;
    formImage.querySelector('.img-upload__preview img').classList.add('newSize');
  }

});
scaleImage.querySelector('.scale__control--bigger').addEventListener('click',() =>{
  let scaleSize = scaleImage.querySelector('.scale__control--value').value;
  scaleSize = parseFloat(scaleSize);
  if (scaleSize < 100) {
    scaleSize=`${scaleSize + 25  }%`;
    scaleImage.querySelector('.scale__control--value').value = scaleSize;
  }

});
