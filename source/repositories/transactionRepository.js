
const _ = require('lodash');

const allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];
const requiredFields = ['cardId', 'sum', 'type', 'data'];
const postTransactionFields = ['type', 'time', 'sum', 'data', 'cardId'];


module.exports = (transactionModel, ApplicationError) => {
  async function add(transactionParams) {
    const transactionData = _.pick(transactionParams, postTransactionFields);

    const missingFields = requiredFields
      .filter(field => !Object.prototype.hasOwnProperty.call(transactionData, field));

    if (missingFields.length) {
      throw new ApplicationError(`No required fields: ${missingFields.join()}`, 400);
    }

    if (!allowedTypes.includes(transactionData.type)) {
      throw new ApplicationError(`forbidden transaction type: ${transactionData.type}`, 403);
    }

    if (transactionData.time && !Date.parse(transactionData.time)) {
      throw new ApplicationError('Invalid transaction time', 400);
    }

    if (!transactionData.time) {
      transactionData.time = (new Date()).toISOString();
    }

    const createdTransaction = await transactionModel.create(transactionData);
    return createdTransaction;
  }

  async function getAllByCardId(id) {
    const allTransaction = await transactionModel.getByCard(id);
    return allTransaction;
  }

  async function getAll() {
    const allTransaction = await transactionModel.getAll();
    return allTransaction;
  }

  async function remove() {
    throw new ApplicationError('Transaction can\'t be removed', 400);
  }

  const transactionRepository = {
    getAllByCardId,
    getAll,
    add,
    remove,
  };

  return transactionRepository;
};
