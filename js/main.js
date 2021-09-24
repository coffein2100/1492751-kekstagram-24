function getRandomNumber (min, max) {
  if(min<max && min>=0){
    const arr = [];
    for(let shetchik=0; shetchik <=(max-min); shetchik++){
      arr[shetchik]=[Math.random(), shetchik+min];
    }
    return arr.sort()[0][1];
  }

}
getRandomNumber(0, 5);
