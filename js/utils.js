const Utils = {};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
Utils.shuffle = array => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

Utils.deepClone = object => JSON.parse(JSON.stringify(object));
Utils.testProbability = probablilty => Math.random() < probablilty;
Utils.randomIndex = array => Math.floor(Math.random() * array.length);
Utils.randomElement = array => array[Utils.randomIndex(array)];
Utils.randomElements = (array, n) => Utils.shuffle([...array]).slice(0, n);
Utils.clamp = (x, min, max) => Math.min(Math.max(x, min), max);
Utils.equalsAny = (x, ...values) => values.some(value => x === value);
Utils.includesAny = (superset, subset) => subset.some(x => superset.includes(x));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Utils.getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Utils.removeElement = function (array, value) {
  const index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

Utils.sum = array => array.reduce((a, b) => a + b, 0);

Utils.randomWeightedIndex = percentages => {
  let random = Utils.getRandomIntInclusive(1, 100);
  for (let i = 0; i < percentages.length; ++i) {
    if (random <= percentages[i]) {
      return i;
    }
    random -= percentages[i];
  }
  console.warn(`invalid percentages ${percentages}`);
  return 0;
}

export default Utils;
