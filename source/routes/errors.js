const error = service => async () => {
  console.log('errors');
  const data = await service.errors.error();
  //ctx.body(data);
};
module.exports = error;
