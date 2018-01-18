
function updateCardBalance(card, diffrence) {
  const currentCard = Object.assign({}, card);
  const currentDiffrence = parseInt(diffrence, 10);
  const balance = parseInt(currentCard.balance, 10);
  currentCard.balance = balance + currentDiffrence;
  return currentCard;
}

// TODO Более четко разделить списание и пополнение и в трансфере использвать вызов только уже этих методов
module.exports = (repositories, ApplicationError) => {
  const {cardRepository, transactionRepository} = repositories;

  const pay = async (cardId, paymentDetail) => {
    const type = 'paymentMobile';
    const {sum, phoneNumber} = paymentDetail;
    const currentCard = await cardRepository.getById(cardId);

    if (!currentCard) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    const diffrence = -1 * sum;
    const updatedCard = updateCardBalance(currentCard, diffrence);

    if (updatedCard.balance < 0) {
      throw new ApplicationError('Not sufficient funds for the payment', 404);
    }

    await cardRepository.update(currentCard, updatedCard);

    const transaction = await transactionRepository.add({
      cardId,
      type,
      data: {phoneNumber},
      time: new Date().toISOString(),
      sum,
    });

    return transaction;
  };


  const fill = async (cardId, paymentDetail) => {
    const type = 'prepaidCard';
    const {sum, phoneNumber} = paymentDetail;
    const currentCard = await cardRepository.getById(cardId);

    if (!currentCard) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    const diffrence = sum;
    const updatedCard = updateCardBalance(currentCard, diffrence);

    await cardRepository.update(currentCard, updatedCard);

    const transaction = await transactionRepository.add({
      cardId,
      type,
      data: {phoneNumber},
      time: new Date().toISOString(),
      sum,
    });

    return transaction;
  };


  const transfer = async (cardId, paymentDetail) => {
    const type = 'card2Card';
    const {sum, target} = paymentDetail;
    const targetCardId = target;
    const currentSum = parseInt(sum, 10);
    const currentCard = await cardRepository.getById(cardId);
    const targetCard = await cardRepository.getById(targetCardId);

    if (!currentCard) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    if (!targetCard) {
      throw new ApplicationError(`No card with id ${targetCardId}`, 404);
    }

    // списание
    const diffrence = -1 * currentSum;
    const updatedCard = updateCardBalance(currentCard, diffrence);

    if (updatedCard.balance < 0) {
      throw new ApplicationError('Not sufficient funds for the payment', 404);
    }

    await cardRepository.update(currentCard, updatedCard);

    const transaction = await transactionRepository.add({
      cardId,
      type,
      data: {cardNumber: targetCard.cardNumber},
      time: new Date().toISOString(),
      sum: diffrence,
    });

    // Пополнение
    const updatedTargetCard = updateCardBalance(targetCard, currentSum);

    await cardRepository.update(targetCard, updatedTargetCard);

    await transactionRepository.add({
      cardId: targetCardId,
      type,
      data: {cardNumber: currentCard.cardNumber},
      time: new Date().toISOString(),
      sum: currentSum,
    });


    return transaction;
  };


  return {
    pay,
    fill,
    transfer,
  };
};
