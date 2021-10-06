// eslint-disable-next-line no-unused-vars
const chekComment = (comment, maxLength) => comment.length <= maxLength;
// eslint-disable-next-line no-unused-vars
export function getRandomNumber (min, max) {
  if(min<max && min>=0){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
