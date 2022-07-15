const { PROPERTIES, players } = require("./../../utils/constants");

const buyOrRent = (playerIndex, propertyIndex) => {
  const player = players[playerIndex];
  const property = PROPERTIES[propertyIndex];

  // Compra ou aluga o imóvel;
  if (property.owner) {
    if (player.balance >= property.rentValue) {
      players[property.owner].balance = property.rentValue;
      player.balance = player.balance - property.rentValue;
    }
  } else {
    if (player.balance >= property.saleValue) {
      property.owner = playerIndex;
      player.balance = player.balance - property.saleValue;
    }
  }
  if (player.balance <= 0) {
    player.gameOver = true;
  }
};

module.exports = buyOrRent;
