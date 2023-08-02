import Router from 'koa-router';
import { DeploymentsController } from '../controllers/deployments-controller';
import { CONSTANTS } from '../config';
import jwt from 'koa-jwt';

const router = new Router();

router.get(`/deployments`, jwt({ secret: CONSTANTS.JWT_SECRET }), DeploymentsController.getDeployments);
router.post(`/deployment/webhook`, jwt({ secret: CONSTANTS.JWT_SECRET }), DeploymentsController.updateStatus);
router.get(`/deployments/:id`, jwt({ secret: CONSTANTS.JWT_SECRET }), DeploymentsController.getDeploymentById);
router.post(`/deployments/:id/cancel`, jwt({ secret: CONSTANTS.JWT_SECRET }), DeploymentsController.deleteDeployment);
router.get(`/deployments/:id/stats`, jwt({ secret: CONSTANTS.JWT_SECRET }), DeploymentsController.getDeploymentStats);

export default router;
