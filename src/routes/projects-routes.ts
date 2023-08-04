import Router from "koa-router";
import { ProjectsController } from "@controllers/projects-controller";
import jwt from "koa-jwt";
import { CONSTANTS } from "../config";

const router = new Router();

router.get(`/projects`, jwt({ secret: CONSTANTS.JWT_SECRET }), ProjectsController.getProjects);
router.get(`/projects/:id`, jwt({ secret: CONSTANTS.JWT_SECRET }), ProjectsController.getProjectById);
router.post(`/projects/:id/deployment`, jwt({ secret: CONSTANTS.JWT_SECRET }), ProjectsController.createDeployment);

export default router;