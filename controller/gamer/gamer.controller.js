const { OPENING_BALANCE, PROPERTIES } = require("./../../utils/constants");
const random = require("./../../utils/random");

const gameOver = (players) => {
  return players.filter((p) => p.balance > 0).length === 1;
};
module.exports = {
  simulate: () => {
    /**
     * Cada Propriedade recebe um valor de venda e aluguel aleatório
     *  */
    PROPERTIES.map((prop) => {
      prop.saleValue = random(1, OPENING_BALANCE / 2);
      prop.rentValue = random(1, OPENING_BALANCE / 4);
    });

    /**
     * Cada Jogador recebe o saldo inicial
     *  */
    const players = [
      { order: 0, name: "impulsive", balance: OPENING_BALANCE },
      { order: 1, name: "demanding", balance: OPENING_BALANCE },
      { order: 2, name: "cautious", balance: OPENING_BALANCE },
      { order: 3, name: "randomer", balance: OPENING_BALANCE },
    ];

    const plays = 0;
    const playerIndex = 0;
    while (plays < 1000) {
      // Quantidade de casas para avançar aleatória simulando o DADO de 6 lados
      const toAdvance = random();

      plays++;
      playerIndex++;

      const player = players[playerIndex];

      // Zera o index do array de jogadores para recomeçar pela ordem;
      if (playerIndex > 3) {
        playerIndex = 0;
      }

      // Se restar somente um jogador finaliza o jogo
      if (gameOver(players)) {
        plays = 1000;
      }
    }
  },
};
