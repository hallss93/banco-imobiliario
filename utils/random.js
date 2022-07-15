const random = (min = 1, max = 6) => {
  return Math.floor(min + max * Math.random());
};
module.exports = random;
