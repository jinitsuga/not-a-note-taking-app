const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "wrong format id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(400).send({ error: "JWT IS WRONG" });
  }
  if (error) {
    return res.status(400).send({ error: "some error" });
  }
  next(error);
};

module.exports = {
  errorHandler,
  requestLogger,
};
