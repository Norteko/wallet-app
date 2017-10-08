
const ApplicationError = require('../../../libs/application-error');

const FileModel = require('../common/fileModel');

class Card extends FileModel {
  constructor() {
    super('cards.json');
  }

  /**
  * Добавляет карту
  *
  * @param {Object} card описание карты
  * @returns {Promise.<Object>}
  */
  async create(card) {
    const isDataValid = card && card.hasOwnProperty('cardNumber') && card.hasOwnProperty('balance');

    if (!isDataValid) {
      throw new ApplicationError('Card data is invalid', 400);
    }

    let isCardFound = false;

    this.dataSource.forEach((item) => {
      if (item.cardNumber === card.cardNumber) {
        isCardFound = true;
      }
    });

    if (isCardFound) {
      throw new ApplicationError('Card is already exists', 400);
    }
    card.id = this.generateId();
    this.dataSource.push(card);
    await this.saveUpdates();
    return card;
  }

  /**
   * Удалет карту
   * @param {Number} id идентификатор карты
   */
  async remove(id) {
    const card = this.dataSource.find((item) => {
      return item.id === id;
    });

    if (!card) {
      throw new ApplicationError(`Card with ID=${id} not found`, 404);
    }
    const cardIndex = this.dataSource.indexOf(card);
    this.dataSource.splice(cardIndex, 1);
    await this.saveUpdates();
    return card;
  }
}

module.exports = Card;
