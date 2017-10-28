
// const logger = require('libs/logger')('db-model');
// const ApplicationError = require('libs/application-error');

const Model = require('./model');


class DbModel extends Model {
  constructor(dbModel) {
    super();
    this._MongooseModel = dbModel;
  }

  async getAll() {
    const data = await this._MongooseModel
      .find({})
      .lean()
      .exec();
    return data;
  }

  async get(id) {
    const data = await this._MongooseModel
      .findOne({id})
      .lean()
      .exec();
    return data;
  }

  async getBy(cond) {
    const data = await this._MongooseModel
      .findOne(cond)
      .lean()
      .exec();
    return data;
  }

  /**
	 * Генерирует новый id для записи
	 * @return {Number}
	 * @private
	 */
  async _generateId() {
    const data = await this._MongooseModel
      .find({})
      .sort({id: -1})
      .limit(1)
      .lean()
      .exec();
    return data[0].id + 1;
  }

  async create(item) {
    await this._MongooseModel
      .create(item);
  }

  async remove(id) {
    await this._MongooseModel
      .remove({id});
  }

  async update(cond, set) {
    await this._MongooseModel
      .update(cond, {$set: set});
  }
}

module.exports = DbModel;
