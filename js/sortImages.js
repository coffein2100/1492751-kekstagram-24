const sortBlock = document.querySelector('.img-filters');

const sortDefault = sortBlock.querySelector('#filter-default');
const sortRandom = sortBlock.querySelector('#filter-random');
const sortDiscussed = sortBlock.querySelector('#filter-discussed');

const sortInput = sortBlock.querySelector('#sort-input');

// По умолчанию — фотографии в изначальном порядке с сервера.
const sortDefaultClick = (cb) => {
  sortDefault.addEventListener('click', () => {
    sortDefault.classList.add('img-filters__button--active');
    sortRandom.classList.remove('img-filters__button--active');
    sortDiscussed.classList.remove('img-filters__button--active');

    sortInput.value = 'default';
    cb();
  });
};


const sortRandomClick = (cb) => {
  sortRandom.addEventListener('click', () => {
    sortDefault.classList.remove('img-filters__button--active');
    sortRandom.classList.add('img-filters__button--active');
    sortDiscussed.classList.remove('img-filters__button--active');

    sortInput.value = 'random';
    cb();
  });
};


const sortDiscussedClick = (cb) => {
  sortDiscussed.addEventListener('click', () => {
    sortDefault.classList.remove('img-filters__button--active');
    sortRandom.classList.remove('img-filters__button--active');
    sortDiscussed.classList.add('img-filters__button--active');

    sortInput.value = 'discussed';
    cb();
  });
};


const comparePicturesIds = (pictureA, pictureB) => {
  const rankIdA = pictureA.id;
  const rankIdB = pictureB.id;

  return rankIdA - rankIdB;
};


const comparePicturesComments = (pictureA, pictureB) => {
  const rankCommentsA = pictureA.comments.length;
  const rankCommentsB = pictureB.comments.length;

  return rankCommentsB - rankCommentsA;
};

export {sortBlock, sortInput, comparePicturesIds, comparePicturesComments, sortDefaultClick, sortRandomClick, sortDiscussedClick};
