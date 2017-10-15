
const pay = service => async (ctx) => {
  const cardId = Number(ctx.params.id);
  const paymentDetail = ctx.request.body;
  const data = await service.payments.pay(cardId, paymentDetail);
  ctx.status = 200;
  ctx.body = data;
};

const fill = service => async (ctx) => {
  const cardId = Number(ctx.params.id);
  const paymentDetail = ctx.request.body;
  const data = await service.payments.fill(cardId, paymentDetail);
  ctx.status = 200;
  ctx.body = data;
};

module.exports = {
  pay,
  fill,
};
