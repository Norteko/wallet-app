
const {renderToStaticMarkup} = require('react-dom/server');
const indexView = require('./presentation.js'); 

module.exports = (service, router) => {
  router.all('react', '*', async (ctx) => {
    const cards = await service.cards.getCards();
    const transactions = await service.transactions.getAllTransactions();

    const DATA = {
      user: {
        login: 'samuel_johnson',
        name: 'Samuel Johnson',
      },
      cards,
      transactions
    };

    const indexViewHtml = renderToStaticMarkup(indexView(DATA));
    ctx.body = indexViewHtml;
  });

  return router;
};
