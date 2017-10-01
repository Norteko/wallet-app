
const Koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const Port = 3000;

const repositoties = require('./repositories');
const services = require('./services');
const routes = require('./routes');


const appService = services(repositoties);
const appRouter = routes(appService, router);

const ApplicationError = require('../libs/application-error');
// const CardsModel = require('source/models/cards');
// const TransactionsModel = require('source/models/transactions');

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
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

// Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
// app.use(async (ctx, next) => {
//   ctx.cardsModel = new CardsModel();
//   ctx.transactionsModel = new TransactionsModel();

//   await Promise.all([
//     ctx.cardsModel.loadFile(),
//     ctx.transactionsModel.loadFile(),
//   ]);

  //await next();
//});


app.use(bodyParser);
app.use(appRouter.routes());
app.use(serve('./public'));

app.listen(Port, () => {
  console.log(`Application started at port ${Port}`);
});
