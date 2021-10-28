import {getRandomNumber} from './util.js';
const NAMES = [
  'Иван',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];
const DESKRIPTIONS = [
  'красивый вид',
  'прекрасный закат',
  'на краю света',
  'закат на берегу моря',
  'Новый рекорд по бегу',
  'за секунду до',
];
const SIMILAR_IMAGES_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 16;

const createImege = (position) => {
  const randomDeskriptionIndex = _.random(0, DESKRIPTIONS.length - 1);
  const someLikes = getRandomNumber(15, 201);
  const usedIndexes = new Set();
  function getUniqueRandomNumber (max, min) {
    const newNumber = Math.floor (Math.random() * (max - min) + min);
    if (usedIndexes.has(newNumber)) {
      return getUniqueRandomNumber(max, min);
    } else {
      usedIndexes.add(newNumber);
      return newNumber;
    }
  }
  const createComments = () => {
    const randomNameIndex = _.random(0, NAMES.length - 1);
    const randomCommentIndex = _.random(0, COMMENTS.length - 1);
    const someAvatar = `img/avatar-${  getRandomNumber(1, 7)  }.svg`;
    return {
      id: getUniqueRandomNumber(1000,1),
      avatar: someAvatar,
      message: COMMENTS[randomCommentIndex],
      name: NAMES[randomNameIndex],
    };
  };
  const similarComments = Array.from({length: SIMILAR_COMMENTS_COUNT}, createComments);

  return {
    id: position+1,
    url:`photos/${position+1}.jpg`,
    description:DESKRIPTIONS[randomDeskriptionIndex],
    likes: someLikes,
    comments:similarComments,
  };
};

const similarImages = Array.from({length: SIMILAR_IMAGES_COUNT},(_id,position) => createImege(position));
export{similarImages};
