const cards = require('./cards');
const transactions = require('./transactions');
const errors = require('./errors');

module.exports = repositories => ({
  cards: cards(repositories.cardRepository),
  transactions: transactions(repositories.transactionsRepository),
  errors,
});
