import "module-alias/register";

import config from "./environment";

import express from "express";

import logger from "./util/logger";

const { port } = config.server;

async function startApp() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(port, () => {
    logger.info(`
      #################################################
      🛡️ App listening on port: ${port} 🛡️ 
      #################################################
    `);
  });
}

startApp();
