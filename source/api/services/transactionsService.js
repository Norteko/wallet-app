
module.exports = (repositories, ApplicationError) => {
  const { transactionRepository, cardRepository } = repositories;

  const getTransactionsByCardId = id => (transactionRepository.getAllByCardId(id));

  const getAllTransactions = () => (transactionRepository.getAll());

  const createTransaction = async (transactionData) => {
    const { cardId } = transactionData;
    const card = await cardRepository.getById(cardId);
    if (!card) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    return transactionRepository.add(transactionData);
  };
  return {
    getTransactionsByCardId,
    createTransaction,
    getAllTransactions,
  };
};

