const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const log = require("./logging");

log.info("Setting up API middleware");
const apiSpecPath = path.resolve(__dirname, "..", "api-spec.yaml"); //eslint-disable-line no-undef
const swaggerDocument = YAML.load(apiSpecPath);

const setMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(
    "/api/v1/api-specs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  morgan.token("time", () => new Date().toISOString());
  app.use(
    morgan(
      "[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"
    )
  );
};

module.exports = {
  setMiddleware,
};
