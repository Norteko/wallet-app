
const { getCards, createCard, deleteCard } = require('./cards');
// const { getTransactions, createTransactions } = require('./transactions');
const error = require('./errors');

module.exports = (service, router) => {
  // Сохраним параметр id в ctx.params.id
  router.param('id', (id, ctx, next) => next());

  router.get('/cards/', getCards(service));
  router.post('/cards/', createCard(service));
  router.delete('/cards/:id', deleteCard(service));

  //router.get('/cards/:id/transactions/', getTransactions(service));
  //router.post('/cards/:id/transactions/', createTransactions(service));

  router.all('/error', error(service));

  return router;
};
