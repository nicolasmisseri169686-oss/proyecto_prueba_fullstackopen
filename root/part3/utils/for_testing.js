// Funciones simples para practicar testing

const reverse = (string) => {
  return string.split('').reverse().join('');
};

const average = (array) => {
  const sum = array.reduce((acc, num) => acc + num, 0);
  return sum / array.length;
};

module.exports = {
  reverse,
  average,
};