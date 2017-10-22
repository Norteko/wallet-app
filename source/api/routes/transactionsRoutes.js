
const getCardTransactions = service => async (ctx) => {
  const CardId = Number(ctx.params.id);
  const data = await service.transactions.getTransactionsByCardId(CardId);
  ctx.body = data;
};

const getTransactions = service => async (ctx) => {
  const data = await service.transactions.getAllTransactions();
  ctx.body = data;
};

const createTransaction = service => async (ctx) => {
  const transactionData = ctx.request.body;
  const cardId = Number(ctx.params.id);
  transactionData.cardId = cardId;
  const newTransaction = await service.transactions.createTransaction(transactionData);
  ctx.status = 201;
  ctx.body = newTransaction;
};

module.exports = {
  getCardTransactions,
  createTransaction,
  getTransactions,
};
