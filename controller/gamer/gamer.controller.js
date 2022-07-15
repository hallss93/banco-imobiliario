const { OPENING_BALANCE, PROPERTIES } = require("./../../utils/constants");
const random = require("./../../utils/random");
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
      { name: "impulsive", balance: OPENING_BALANCE },
      { name: "demanding", balance: OPENING_BALANCE },
      { name: "cautious", balance: OPENING_BALANCE },
      { name: "randomer", balance: OPENING_BALANCE },
    ];

    // Quantidade de casas para avançar aleatória simulando o DADO de 6 lados
    const toAdvance = random();
  },
};
