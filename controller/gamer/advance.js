const { PROPERTIES, players } = require("../../utils/constants");

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

module.exports = advance;
