
const getCards = service => async (ctx) => {
  const data = await service.cards.getCards();
  ctx.body = data;
};

const createCard = service => async (ctx) => {
  const card = ctx.request.body;
  const newCard = await service.cards.createCard(card);
  ctx.status = 201;
  ctx.body = newCard;
};

const deleteCard = service => async (ctx) => {
  const cardId = Number(ctx.params.id);
  const deletedCard = await service.cards.deleteCard(cardId);
  ctx.status = 200;
  ctx.body = deletedCard;
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
