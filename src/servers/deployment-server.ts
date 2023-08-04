import { register } from 'tsconfig-paths';
register();
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import projectsRoutes from '@routes/projects-routes';
import tokenRoutes from '@routes/token-routes';
import dataAggregationRoutes from '@routes/data-aggregation-routes';
import deploymentRoutes from '@routes/deployments-routes';
import { CONSTANTS } from '../config';
import { ErrorHandler } from '@errors/ErrorHandler';

const app = new Koa();
const PORT = CONSTANTS.PROJECT_SERVER_PORT;

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(logger());

// Custom error handling for the controllers
app.use(ErrorHandler.handle);

app.use(projectsRoutes.routes());
app.use(dataAggregationRoutes.routes());
app.use(deploymentRoutes.routes());
app.use(tokenRoutes.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', err => {
    console.error(err);
  });

export default server;
