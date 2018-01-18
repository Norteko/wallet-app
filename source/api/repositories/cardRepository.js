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

  async function update(card, updatedData) {
    const updatedCard = await cardModel.update(card, updatedData);
    return updatedCard;
  }

  async function getByCardNumber(cardNumber) {
    if (cardModel.getBy !== undefined) {
      return cardModel.getBy({cardNumber});
    }

    const cards = await getAll();
    let foundCard;
    cards.forEach((card) => {
      if (card.cardNumber === cardNumber) {
        foundCard = card;
      }
    });

    return foundCard;
  }

  async function getById(id) {
    if (cardModel.get !== undefined) {
      return cardModel.get(id);
    }

    const cards = await getAll();
    let foundCard;
    cards.forEach((card) => {
      if (card.id === id) {
        foundCard = card;
      }
    });
    return foundCard;
  }

  const cardRepository = {
    getAll,
    add,
    update,
    remove,
    getByCardNumber,
    getById,
  };

  return cardRepository;
};
