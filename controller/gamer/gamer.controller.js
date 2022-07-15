const { OPENING_BALANCE, PROPERTIES } = require("./../../utils/constants");
const random = require("./../../utils/random");
module.exports = {
  simulate: () => {
    PROPERTIES.map((prop) => {
      prop.saleValue = random(1, OPENING_BALANCE / 2);
      prop.rentValue = random(1, OPENING_BALANCE / 4);
    });

    const players = [
      { name: "impulsive", balance: OPENING_BALANCE },
      { name: "demanding", balance: OPENING_BALANCE },
      { name: "cautious", balance: OPENING_BALANCE },
      { name: "randomer", balance: OPENING_BALANCE },
    ];

    const toAdvance = random();
  },
};
