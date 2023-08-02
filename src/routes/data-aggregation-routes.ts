import Router from 'koa-router';
import { CONSTANTS} from '../config';
import jwt from 'koa-jwt';
import { DataAggregationController } from '../controllers/data-aggregation-controller';

const router = new Router();

router.get(`/data/aggregation/:id`, jwt({ secret: CONSTANTS.JWT_SECRET }), DataAggregationController.getFeedByProjectId);

export default router;
