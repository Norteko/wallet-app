
class ApplicationError extends Error {
  constructor(message, statusRes = 500) {
    super(message);
    this._status = statusRes;
  }
  /**
  * Возвращает статус ошибки
  * @returns {*}
  */
  get status() {
    return this._status;
  }
}

module.exports = ApplicationError;
