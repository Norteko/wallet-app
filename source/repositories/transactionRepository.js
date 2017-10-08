module.exports = (cardModel) => {
    async function add(cardNumber, balance) {
      const cardData = {
        cardNumber,
        balance,
      };
      const createdCard = await cardModel.create(cardData);
      return createdCard;
    }
  
    async function getAll() {
      const allCards = await cardModel.getAll();
      return allCards;
    }
  
    const cardRepository = {
      getAll,
      add,
    };
  
    return cardRepository;
  };
  