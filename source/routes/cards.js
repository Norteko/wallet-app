
const getCards = service => async (ctx) => {
  const data = await service.cards.getCards();
  ctx.body = data;
};

const createCard = service => async (ctx) => {
  const data = await service.cards.createCard();
  ctx.body = data;
};

const deleteCard = service => async (ctx) => {
  const data = await service.card.deleteCard();
  ctx.body = data;
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
