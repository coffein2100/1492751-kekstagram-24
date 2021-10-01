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
