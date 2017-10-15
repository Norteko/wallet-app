
function updateCardBalance(card, diffrence) {
  const currentCard = Object.assign({}, card);
  const balance = parseInt(currentCard.balance, 10);
  currentCard.balance = balance + diffrence;
  return currentCard;
}


module.exports = (repositories, ApplicationError) => {
  const { cardRepository, transactionRepository } = repositories;

  const pay = async (cardId, paymentDetail) => {
    const type = 'paymentMobile';
    const { sum, phoneNumber } = paymentDetail;
    const currentCard = await cardRepository.getById(cardId);

    if (!currentCard) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    const diffrence = -1 * sum;
    const updatedCard = updateCardBalance(currentCard, diffrence);

    if (updatedCard.balance < 0) {
      throw new ApplicationError('Not sufficient funds for the payment', 404);
    }

    await cardRepository.update(updatedCard);

    const transaction = await transactionRepository.add({
      cardId,
      type,
      data: { phoneNumber },
      time: new Date().toISOString(),
      sum,
    });

    return transaction;
  };


  const fill = async (cardId, paymentDetail) => {
    const type = 'prepaidCard';
    const { sum, phoneNumber } = paymentDetail;
    const currentCard = await cardRepository.getById(cardId);

    if (!currentCard) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    const diffrence = sum;
    const updatedCard = updateCardBalance(currentCard, diffrence);

    await cardRepository.update(updatedCard);

    const transaction = await transactionRepository.add({
      cardId,
      type,
      data: { phoneNumber },
      time: new Date().toISOString(),
      sum,
    });

    return transaction;
  };

  return {
    pay,
    fill,
  };
};
