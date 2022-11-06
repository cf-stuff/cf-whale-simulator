const Utils = {};

Utils.deepClone = object => JSON.parse(JSON.stringify(object));
Utils.testProbability = probablilty => Math.random() < probablilty;
Utils.randomIndex = array => Math.floor(Math.random() * array.length);
Utils.randomElement = array => array[Utils.randomIndex(array)];
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

export default Utils;
