const error = service => async () => {
  await service.errors.error();
};
module.exports = error;
