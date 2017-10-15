
const { getCards, createCard, deleteCard } = require('./cardsRoutes');
const { getCardTransactions, createTransaction, getTransactions } = require('./transactionsRoutes');
const { pay, fill } = require('./paymentsRoutes');
const error = require('./errors');

module.exports = (service, router) => {
  // Сохраним параметр id в ctx.params.id
  router.param('id', (id, ctx, next) => next());

  router.get('/cards/', getCards(service));
  router.post('/cards/', createCard(service));
  router.delete('/cards/:id', deleteCard(service));

  router.get('/cards/:id/transactions/', getCardTransactions(service));
  router.post('/cards/:id/transactions/', createTransaction(service));

  router.post('/cards/:id/pay', pay(service));
  // router.post('/cards/:id/transfer', transfer(service));
  router.post('/cards/:id/fill', fill(service));

  router.get('/transactions/', getTransactions(service));


  router.all('/error', error(service));

  return router;
};
