const formImage = document.querySelector('.img-upload__form');
const imgLoad = document.querySelector('.img-upload__overlay');


formImage.addEventListener('change',() =>{
  imgLoad.classList.remove('hidden');
});
