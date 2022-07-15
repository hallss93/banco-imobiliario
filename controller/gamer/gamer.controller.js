const { OPENING_BALANCE, PROPERTIES } = require("./../../utils/constants");
const random = require("./../../utils/random");

/**
 * Cada Jogador recebe o saldo inicial
 *  */
const players = [
  { order: 0, position: 0, name: "impulsive", balance: OPENING_BALANCE },
  { order: 1, position: 0, name: "demanding", balance: OPENING_BALANCE },
  { order: 2, position: 0, name: "cautious", balance: OPENING_BALANCE },
  { order: 3, position: 0, name: "randomer", balance: OPENING_BALANCE },
];

const gameOver = (players) => {
  return players.filter((p) => p.balance > 0).length === 1;
};

/**
 * Compra a qualquer propriedade desde que ele tenha uma reserva de 80
 * saldo sobrando depois de realizada a compra.
 */
const cautiousMode = (playerIndex, propertyIndex) => {
  const player = players[playerIndex];
  if (player.balance >= 80) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra a propriedade que ele parar em cima com probabilidade de 50%
 */
const randomerMode = (playerIndex, propertyIndex) => {
  if (random(0, 1) === 0) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra a qualquer propriedade, desde que o valor do aluguel
 * dela seja maior do que 50.
 */
const demandingMode = (playerIndex, propertyIndex) => {
  const property = PROPERTIES[propertyIndex];
  if (property.rentValue > 50) {
    buyOrRent(playerIndex, propertyIndex);
  }
};

/**
 * Compra qualquer propriedade sobre a qual ele parar
 */
const impulsiveMode = (playerIndex, propertyIndex) => {
  buyOrRent(playerIndex, propertyIndex);
};

const buyOrRent = (playerIndex, propertyIndex) => {
  const player = players[playerIndex];
  const property = PROPERTIES[propertyIndex];

  // Compra ou aluga o imóvel;
  if (property.owner) {
    if (player.balance >= property.rentValue) {
      owner = players[property.owner].balance = property.rentValue;
      player.balance = player.balance - property.rentValue;
    }
  } else {
    if (player.balance >= property.saleValue) {
      property.owner = playerIndex;
      player.balance = player.balance - property.saleValue;
    }
  }
};
module.exports = {
  simulate: () => {
    // Ordena os jogadores
    players.sort((a, b) => a.order - b.order);

    /**
     * Cada Propriedade recebe um valor de venda e aluguel aleatório
     *  */
    /* PROPERTIES.map((prop) => {
      prop.saleValue = random(1, OPENING_BALANCE / 2);
      prop.rentValue = random(1, OPENING_BALANCE / 4);
    }); */

    let plays = 0;
    let playsTotal = 0;
    let playerIndex = 0;
    while (plays < 1000) {
      // Quantidade de casas para avançar aleatória simulando o DADO de 6 lados
      const toAdvance = random();

      const player = players[playerIndex];

      switch (player.name) {
        case "impulsive": {
          impulsiveMode(playerIndex, toAdvance);
          break;
        }
        case "demanding": {
          demandingMode(playerIndex, toAdvance);
          break;
        }
        case "cautious": {
          cautiousMode(playerIndex, toAdvance);
          break;
        }
        case "randomer": {
          randomerMode(playerIndex, toAdvance);
          break;
        }
      }
      plays++;
      playerIndex++;

      // Zera o index do array de jogadores para recomeçar pela ordem;
      if (playerIndex > 3) {
        playerIndex = 0;
      }
      playsTotal++;
      // Se restar somente um jogador finaliza o jogo
      if (gameOver(players)) {
        plays = 1000;
      }
    }
    return {
      playsTotal,
      players,
      PROPERTIES,
    };
  },
};
