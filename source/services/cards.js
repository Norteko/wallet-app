module.exports = (cardRepository) => {
  const getCards = () => (cardRepository.getAll());
  const createCard = card => (cardRepository.add(card));
  const deleteCard = id => (cardRepository.remove(id));

  return {
    getCards,
    createCard,
    deleteCard,
  };
};
