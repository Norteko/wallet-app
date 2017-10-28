const modelConfig = require('config/model.json');
const FileCard = require('./fileModels/card.js');
const FileTransaction = require('./fileModels/transaction.js');
const dbCard = require('./dbModels/card.js');
const dbTransaction = require('./dbModels/transaction.js');
const DbModel = require('./common/dbModel.js');
const mongoose = require('mongoose');

async function initFileModels() {
  const card = new FileCard();
  const transaction = new FileTransaction();
  await card.loadFile();
  await transaction.loadFile();
  console.log('Модели проинициализированы');
  return {
    card,
    transaction,
  };
}

function initDBModels() {
  const card = new DbModel(dbCard);
  const transaction = new DbModel(dbTransaction);
  mongoose.connect('mongodb://localhost/school-wallet', {useMongoClient: true});
  mongoose.Promise = global.Promise;
  console.log('Модели проинициализированы, база данных запущена');
  return {
    card,
    transaction,
  };
}

module.exports = async (source) => {
  let initializedModels;
  switch (source) {
    case modelConfig.fileSource:
      initializedModels = await initFileModels();
      break;
    case modelConfig.dbSource:
      initializedModels = initDBModels();
      break;
    default:
      throw new Error('не указан вид источника модели');
  }

  return initializedModels;
};
