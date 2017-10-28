
const Koa = require('koa');
const serve = require('koa-static');
const apiRouter = require('koa-router')();
const presentationalRouter = require('koa-router')();
const logger = require('libs/logger')('app');

const mainRouter = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const Port = 3000;

const modelConfig = require('config/model.json');
const models = require('../api/models');
const repositories = require('../api/repositories');
const services = require('../api/services');
const routes = require('../api/routes');
const viewServerRouter = require('./viewServerRouter');

const ApplicationError = require('libs/application-error');


async function start() {
  const appModels = await models(modelConfig.fileSource);
  const appRepositories = await repositories(appModels, ApplicationError);
  const appService = await services(appRepositories, ApplicationError);
  const appApiRouter = await routes(appService, apiRouter);
  const viewRouter = viewServerRouter(appService, presentationalRouter);

  mainRouter.use('/api/v1', appApiRouter.routes());
  mainRouter.use('/', viewRouter.routes());

  const app = new Koa();

  // logger
  app.use(async (ctx, next) => {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  // error handler
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log('Error detected', err);
      ctx.status = err instanceof ApplicationError ? err.status : 500;
      ctx.body = `Error [${err.message}] :(`;
    }
  });

  app.use(bodyParser);
  app.use(serve('./public'));
  app.use(mainRouter.routes());

  app.listen(Port, () => {
    console.log(`Application started at port ${Port}`);
  });
}

start();
