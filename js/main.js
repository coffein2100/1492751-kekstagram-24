function getRandomNumber (min, max) {
  if(min<max && min>=0){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const chekComment = (comment, maxLength) => comment.length <= maxLength;

getRandomNumber(0, 5);
chekComment('volvo', 5);

/*Должно быть что-то типа такого объекта для 1 поста:
*/

const SOMEIDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,20,22,23,24,25];
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
const SIMILAR_IMAGES_COUNT = 25;

const createImege = () => {
  const randomNameIndex = _.random(0, NAMES.length - 1);
  const randomSomeIndex = _.random(0, SOMEIDS.length - 1);
  const randomDeskriptionIndex = _.random(0, DESKRIPTIONS.length - 1);
  const SomeUrl = `photos/${  _.random(0, SOMEIDS.length - 1)  }.jpg`;
  const SomeAvatar = `img/avatar-${  getRandomNumber(1, 6)  }.svg`;
  const someLikes = getRandomNumber(15, 200);
  const randomCommentIndex = _.random(0, COMMENTS.length - 1);
  const someComment1Id = getRandomNumber (1, 1000000);
  const someComment2Id = getRandomNumber (1, 1000000);
  return {
    id:SOMEIDS[randomSomeIndex],
    url:SomeUrl,
    description:DESKRIPTIONS[randomDeskriptionIndex],
    likes: someLikes,
    comments: [{
      id: someComment1Id, // это id 1го коммента для этого поста
      avatar: SomeAvatar,
      message: COMMENTS[randomCommentIndex],
      name: NAMES[randomNameIndex],
    }, {
      id: someComment2Id, // это id 2го коммента для этого поста
      avatar: SomeAvatar,
      message: COMMENTS[randomCommentIndex],
      name: NAMES[randomNameIndex],
    }],
  };
};
const similarImages = Array.from({length: SIMILAR_IMAGES_COUNT}, createImege);
