import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import statusMonitor from 'express-status-monitor';
import config from '../environment';
import accountsRoutes from '@accountModule/routes/v1';
import logger from '@util/logger';

export default ({ app }: { app: express.Application }) => {
  const { env } = config;
  const corstOpts = cors({ origin: true });
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.get('/', (_req, res) => {
    res.send('Welcome to the SARWA API Service!');
  });

  app.use(statusMonitor({ title: 'SARWA API Monitor', path: '/app-monitor' }));

  app.set('view engine', 'ejs');

  app.use(corstOpts);

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Useful if you're behind a reverse proxy (Heroku, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // protects app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  // Load routes
  accountsRoutes(app);

  // catch and handle 404 errors
  app.use((req, res, _next) => {
    if (req.accepts('json')) {
      return res.status(404).send({
        success: false,
        message: 'Resource not found',
        data: {},
      });
    }

    return res.end('page not found');
  });

  // error handlers
  app.use(function (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    if (err.httpStatusCode) {
      res.status(err.httpStatusCode).send({
        success: false,
        message:
          err.message ||
          'Something went wrong, it`ll be nice if you report this to us',
        data: err.data || {},
      });
    } else {
      logger.error(`[Unhandled Exception] - `, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, it`ll be nice if you report this to us',
        data: {},
      });
    }
  });
};
