require("dotenv").config();
const {
  restartGame,
  sortPlayers,
  playersSortByBalance,
  setPropertiesValue,
} = require("../../models/gamer/gamer.model");
const {
  PROPERTIES,
  players,
  OPENING_BALANCE,
} = require("./../../utils/constants");
const random = require("./../../utils/random");
const {
  impulsiveMode,
  randomerMode,
  demandingMode,
  cautiousMode,
} = require("./modes");

const gameOver = () => {
  return players.filter((p) => p.balance > 0).length === 1;
};

module.exports = {
  simulate: () => {
    restartGame();
    sortPlayers();
    setPropertiesValue();
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

    const sorts = playersSortByBalance();

    return {
      vencedor: sorts[0],
      jogadores: sorts,
    };
  },
};
