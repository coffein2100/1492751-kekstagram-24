function getRandomNumber (min, max) {
  if(min<max && min>=0){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

// eslint-disable-next-line no-unused-vars
const chekComment = (comment, maxLength) => comment.length <= maxLength;

const usedIndexes = new Set();
function getUniqueRandomNumber (max, min) {
  const newNumber = Math.floor (Math.random() * (max - min) + min);
  if (usedIndexes.has(newNumber)) {
    return this.getUniqueRandomNumber(max, min);
  } else {
    usedIndexes.add(newNumber);
    return newNumber;
  }
}

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
];
const DESKRIPTIONS = [
  'красивый вид',
  'прекрасный закат',
  'на краю света',
  'закат на берегу моря',
  'Новый рекорд по бегу',
  'за секунду до',

];
const SIMILAR_IMAGES_COUNT = 5;
const SIMILAR_COMMENTS_COUNT = 3;

const createComments = () => {
  const randomNameIndex = _.random(0, NAMES.length - 1);
  const randomCommentIndex = _.random(0, COMMENTS.length - 1);
  const SomeAvatar = `img/avatar-${  getRandomNumber(1, 7)  }.svg`;
  const uniqueIdComennts = getUniqueRandomNumber (500, 1);
  return {
    id: uniqueIdComennts,
    avatar: SomeAvatar,
    message: COMMENTS[randomCommentIndex],
    name: NAMES[randomNameIndex],
  };
};
const similarComments = Array.from({length:SIMILAR_COMMENTS_COUNT}, createComments);

const createImege = () => {
  const randomDeskriptionIndex = _.random(0, DESKRIPTIONS.length - 1);
  const someLikes = getRandomNumber(15, 201);
  const unique = getUniqueRandomNumber (25, 1);
  return {
    id:unique,
    url:`photos/${ unique  }.jpg`,
    description:DESKRIPTIONS[randomDeskriptionIndex],
    likes: someLikes,
    comments:similarComments,
  };
};

const similarImages = Array.from({length: SIMILAR_IMAGES_COUNT}, createImege);

console.log(similarImages);
