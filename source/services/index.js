const cards = require('./cardsService');
const paymentService = require('./paymentService');
const transactions = require('./transactionsService');
const errors = require('./errors');

module.exports = (repositories, ApplicationError) => {
  return {
    cards: cards(repositories),
    payments: paymentService(repositories, ApplicationError),
    transactions: transactions(repositories, ApplicationError),
    errors,
  };
};
