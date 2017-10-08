module.exports = (cardModel) => {
  async function add(cardData) {
    const createdCard = await cardModel.create(cardData);
    return createdCard;
  }

  async function remove(id) {
    const deletedCard = await cardModel.remove(id);
    return deletedCard;
  }

  async function getAll() {
    const allCards = await cardModel.getAll();
    return allCards;
  }

  async function getByCardNumber(cardNumber) {
    const cards = await getAll();
    let foundCard;
    cards.forEach((card) => {
      if (card.cardNumber === cardNumber) {
        foundCard = card;
      }
    });

    return foundCard;
  }

  const cardRepository = {
    getAll,
    add,
    remove,
    getByCardNumber,
  };

  return cardRepository;
};
