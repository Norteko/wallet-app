
class ApplicationError extends Error {
  constructor(message, statusRes = 500) {
    super(message);
    this.status = statusRes;
  }
  /**
  * Возвращает статус ошибки
  * @returns {*}
  */
  get status() {
    return this.status;
  }
}

module.exports = ApplicationError;
