function getRandomNumber (min, max) {
  if(min<max && min>=0){
    const arr = [];
    for(let shetchik=0; shetchik <=(max-min); shetchik++){
      arr[shetchik]=[Math.random(), shetchik+min];
    }
    return arr.sort()[0][1];
  }

}

function chekComment(comUser, maxLength) {
  const lengthString = comUser.length;
  if(lengthString <= maxLength){return true;}
  return false;
}

getRandomNumber(0, 5); //ссылка на функцию https://efim360.ru/javascript-sluchajnoe-czeloe-chislo-iz-diapazona/
chekComment('first comment', 14);
