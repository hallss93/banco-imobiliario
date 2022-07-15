const buyOrRent = require("./buyOrRent");
const advance = require("./advance");
const { PROPERTIES, players } = require("./../../utils/constants");
const random = require("./../../utils/random");

/**
 * Compra a qualquer propriedade desde que ele tenha uma reserva de 80
 * saldo sobrando depois de realizada a compra.
 */
const cautiousMode = (playerIndex, toAdvance) => {
  const propertyIndex = advance(playerIndex, toAdvance);
  const player = players[playerIndex];
  if (player.balance >= 80) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra a propriedade que ele parar em cima com probabilidade de 50%
 */
const randomerMode = (playerIndex, toAdvance) => {
  const propertyIndex = advance(playerIndex, toAdvance);
  if (random(0, 1) === 0) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra a qualquer propriedade, desde que o valor do aluguel
 * dela seja maior do que 50.
 */
const demandingMode = (playerIndex, toAdvance) => {
  const propertyIndex = advance(playerIndex, toAdvance);
  const property = PROPERTIES[propertyIndex];
  if (property.rentValue > 50) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra qualquer propriedade sobre a qual ele parar
 */
const impulsiveMode = (playerIndex, toAdvance) => {
  const propertyIndex = advance(playerIndex, toAdvance);
  buyOrRent(playerIndex, propertyIndex);
};
module.exports = {
  impulsiveMode,
  randomerMode,
  demandingMode,
  cautiousMode,
};
