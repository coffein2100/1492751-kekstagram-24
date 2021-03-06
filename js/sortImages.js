const sortBlock = document.querySelector('.img-filters');
const namesFilter = document.querySelectorAll('.img-filters__button');
const sortInput = sortBlock.querySelector('#sort-input');

const sortButtons = (cb) =>{
  sortBlock.addEventListener('click', (evt) => {
    if (!evt.target.closest('.img-filters__button')){
      return;
    }
    const filterId = evt.target.closest('.img-filters__button').id;
    namesFilter.forEach((i) => i.classList.remove('img-filters__button--active'));
    evt.target.closest('.img-filters__button').classList.add('img-filters__button--active');
    if (filterId === 'filter-random'){
      sortInput.value = 'random';
    }
    if (filterId === 'filter-discussed'){
      sortInput.value = 'discussed';
    }
    if (filterId === 'filter-default'){
      sortInput.value = 'default';
    }
    cb();
  });
};

export {sortBlock, sortInput, sortButtons};
