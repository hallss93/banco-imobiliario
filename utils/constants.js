const OPENING_BALANCE = 300;
const PROPERTIES = [
  { id: 0, owner: null, saleValue: 50, rentValue: 30 },
  { id: 1, owner: null, saleValue: 110, rentValue: 40 },
  { id: 2, owner: null, saleValue: 70, rentValue: 25 },
  { id: 3, owner: null, saleValue: 130, rentValue: 30 },
  { id: 4, owner: null, saleValue: 100, rentValue: 15 },
  { id: 5, owner: null, saleValue: 250, rentValue: 25 },
  { id: 6, owner: null, saleValue: 110, rentValue: 30 },
  { id: 7, owner: null, saleValue: 80, rentValue: 65 },
  { id: 8, owner: null, saleValue: 130, rentValue: 55 },
  { id: 9, owner: null, saleValue: 100, rentValue: 65 },
  { id: 10, owner: null, saleValue: 250, rentValue: 45 },
  { id: 11, owner: null, saleValue: 100, rentValue: 60 },
  { id: 12, owner: null, saleValue: 80, rentValue: 20 },
  { id: 13, owner: null, saleValue: 110, rentValue: 20 },
  { id: 14, owner: null, saleValue: 100, rentValue: 35 },
  { id: 15, owner: null, saleValue: 130, rentValue: 60 },
  { id: 16, owner: null, saleValue: 100, rentValue: 25 },
  { id: 17, owner: null, saleValue: 250, rentValue: 10 },
  { id: 18, owner: null, saleValue: 35, rentValue: 35 },
  { id: 19, owner: null, saleValue: 80, rentValue: 20 },
];
/**
 * Cada Jogador recebe o saldo inicial
 *  */
const players = [
  {
    order: 0,
    gameOver: false,
    position: 0,
    name: "impulsive",
    balance: OPENING_BALANCE,
  },
  {
    order: 1,
    gameOver: false,
    position: 0,
    name: "demanding",
    balance: OPENING_BALANCE,
  },
  {
    order: 2,
    gameOver: false,
    position: 0,
    name: "cautious",
    balance: OPENING_BALANCE,
  },
  {
    order: 3,
    gameOver: false,
    position: 0,
    name: "randomer",
    balance: OPENING_BALANCE,
  },
];
module.exports = {
  OPENING_BALANCE,
  PROPERTIES,
  players,
};
