const cards = require('./cards');
// const transactions = require('./transactions');
const errors = require('./errors');

module.exports = (repositories) => {  
  return {
    cards: cards(repositories.cardRepository),
    errors,
  };
};

// transactions: transactions(repositories.transactionsRepository),
