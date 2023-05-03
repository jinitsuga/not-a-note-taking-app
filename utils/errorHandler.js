const { response } = require("express");
const logger = require("./logger");

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "wrong format id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(400).send({ error: error.message });
  }
};
