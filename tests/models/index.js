const config = require('config/model.json');
const models = require('../../source/models');

const testModels = models(config.fileSource);
