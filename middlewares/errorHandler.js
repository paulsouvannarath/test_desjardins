import Boom from "@hapi/boom";

// error handler with boom
// boomifying all errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const _err = err;
  if (_err.code === "invalid_token") {
    _err.statusCode = 403;
  }
  const boomError = _err.isBoom
    ? _err
    : Boom.boomify(_err, { statusCode: _err.statusCode });
  const { output } = boomError;
  res.status(output.statusCode).json(output.payload);
};

export default errorHandler;
