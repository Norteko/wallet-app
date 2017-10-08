const cardRepository = require('./cardRepository.js');
const transactionRepository = require('./transactionRepository');

module.exports = (models) => {
  const cardModel = models.card;
  return {
    cardRepository: cardRepository(cardModel),
  };
};

//transactionRepository: transactionRepository(transactionModel),
