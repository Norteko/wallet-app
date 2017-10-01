const fs = require('fs');
const path = require('path');

const Repository = require('./repository');
const ApplicationError = require('../../../libs/application-error');

class FileRepository extends Repository {
  constructor(sourceFileName) {
    super();
    this.dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
    this.dataSource = null;
  }

  async loadFile() {
    if (!this.dataSource) {
      await new Promise((resolve, reject) => {
        fs.readFile(this.dataSourceFile, (err, data) => {
          if (err) {
            return reject(err);
          }
          try {
            this.dataSource = JSON.parse(data);
            return resolve();
          } catch (error) {
            return reject(error);
          }
        });
      });
    }
    return this.dataSource;
  }

  async getAll() {
    return this.loadFile();
  }

  async get(id) {
    return this.dataSource.find(item => item.id === id);
  }

  /**
    * Генерирует новый id для записи
    * @return {Number}
    * @private
    */
  generateId() {
    return this.dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  /**
  * Сохраняет изменения
  * @private
  */
  async saveUpdates() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.dataSourceFile, JSON.stringify(this.dataSource, null, 4), (err) => {
        if (err) {
          console.error(`Save model ${this.dataSourceFile} error`, err);
          return reject(err);
        }
        return resolve();
      });
    }).catch(() => {
      throw new ApplicationError('Save model error', 500);
    });
  }
}

module.exports = FileRepository;
