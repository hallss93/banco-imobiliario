require("dotenv").config();
const {
  PROPERTIES,
  players,
  OPENING_BALANCE,
} = require("./../../utils/constants");
const random = require("./../../utils/random");

const gameOver = () => {
  return players.filter((p) => p.balance > 0).length === 1;
};

const restartGame = () => {
  return players.map((p) => {
    p.balance = OPENING_BALANCE;
    p.position = 0;
    return p;
  });
};

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

/**
 * Avança casas
 */
const advance = (playerIndex, toAdvance) => {
  const player = players[playerIndex];

  if (player.position + toAdvance <= PROPERTIES.length - 1) {
    player.position = player.position + toAdvance;
    return player.position;
  } else {
    /**
     * Ao completar uma volta no tabuleiro, o jogador ganha 100 de saldo
     */
    player.position = player.position + toAdvance - (PROPERTIES.length - 1);
    player.balance = player.balance + 100;
    return 0;
  }
};

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
module.exports = {
  simulate: () => {
    restartGame();
    // Ordena os jogadores
    players.sort((a, b) => a.order - b.order);

    /* *
     * Cada Propriedade recebe um valor de venda e aluguel aleatório
     *  */
    if (process.env.PROPERTY_VALUE_RANDOM === "true") {
      PROPERTIES.map((prop) => {
        prop.saleValue = random(1, OPENING_BALANCE / 2);
        prop.rentValue = random(1, OPENING_BALANCE / 4);
      });
    }

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
    const playersNames = [];
    players
      .sort((a, b) => b.balance - a.balance)
      .map((e) => {
        playersNames.push(e.name);
      });

    return {
      vencedor: players.sort((a, b) => b.balance - a.balance)[0].name,
      jogadores: playersNames,
    };
  },
};
