const cardRepository = require('./cardRepository.js');
const transactionRepository = require('./transactionRepository.js');

module.exports = (models, ApplicationError) => {
  const cardModel = models.card;
  const transactionModel = models.transaction;
  return {
    cardRepository: cardRepository(cardModel),
    transactionRepository: transactionRepository(transactionModel, ApplicationError),
  };
};
