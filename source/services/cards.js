module.exports = (cardRepository) => {
  const getCards = () => (cardRepository.getAll());
  const createCard = (cardNumber, balance) => {

    return cardRepository.create(cardNumber, balance)
  };
  return {
    getCards,
    createCard,
  };
};
