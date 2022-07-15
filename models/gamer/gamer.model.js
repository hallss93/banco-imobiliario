require("dotenv").config();
const {
  PROPERTIES,
  players,
  OPENING_BALANCE,
} = require("./../../utils/constants");
const random = require("./../../utils/random");

module.exports = {
  restartGame: () => {
    players.map((p) => {
      p.balance = OPENING_BALANCE;
      p.position = 0;
      return p;
    });
  },
  sortPlayers: () => {
    // Ordena os jogadores
    players.sort((a, b) => a.order - b.order);
  },
  setPropertiesValue: () => {
    /* *
     * Cada Propriedade recebe um valor de venda e aluguel aleatório
     *  */
    if (process.env.PROPERTY_VALUE_RANDOM === "true") {
      PROPERTIES.map((prop) => {
        prop.saleValue = random(1, OPENING_BALANCE / 2);
        prop.rentValue = random(1, OPENING_BALANCE / 4);
      });
    }
  },
  playersSortByBalance: () => {
    const playersNames = [];
    players
      .sort((a, b) => b.balance - a.balance)
      .map((e) => {
        playersNames.push(e.name);
      });
    return playersNames;
  },
};
