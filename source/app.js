
const Koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const Port = 3000;

const modelConfig = require('../config/model.json');
const models = require('./models');
const repositories = require('./repositories');
const services = require('./services');
const routes = require('./routes');

const ApplicationError = require('../libs/application-error');


async function start() {
  const appModels = await models(modelConfig.fileSource);
  const appRepositories = await repositories(appModels, ApplicationError);
  const appService = await services(appRepositories, ApplicationError);
  const appRouter = await routes(appService, router);

  const app = new Koa();

  // logger
  app.use(async (ctx, next) => {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
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
  app.use(appRouter.routes());

  app.listen(Port, () => {
    console.log(`Application started at port ${Port}`);
  });
}

start();
