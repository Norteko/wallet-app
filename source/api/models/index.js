const modelConfig = require('config/model.json');
const FileCard = require('./fileModels/card.js');
const FileTransaction = require('./fileModels/transaction.js');

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

module.exports = async (source) => {
  let initializedModels;
  switch (source) {
    case modelConfig.fileSource:
      initializedModels = await initFileModels();
      break;
    default:
      throw new Error('не указан вид источника модели');
  }

  return initializedModels;
};
