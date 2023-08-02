import { Context } from 'koa';
import logger from '../logger';
import { FactoryService } from '../services/factory-service';
import { GenericError } from '../errors/CustomErrors';
import { Project } from '../models/projects-models';
import { CommonUtils } from '../utils/common-utils';
import { Deployment } from '../models/deployments-models';

const LOG_PREFIX = 'ProjectsController | ';
export class ProjectsController {
  public static async getProjects(ctx: Context) {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getProjects |';
    const page = parseInt(ctx.query.page as string);
    logger.info(`${LOG_FUNCTION_PREFIX} page requested: ${page}`);
    if (page < 1) {
      throw new GenericError("The 'page' parameter must be greater than zero", 400);
    }
    const data: Project[] = await FactoryService.getProjectsService().getProjects(page); 
    CommonUtils.successResponse(ctx, data);
  }

  public static async getProjectById(ctx: Context) {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getProjectById |';
    const projectId = parseInt(ctx.params.id);
    logger.info(`${LOG_FUNCTION_PREFIX} project id: ${projectId}`);

    if (projectId === undefined || Number.isNaN(projectId)) {
      throw new GenericError("the 'id' parameter must be valid", 400);
    }
    const data: Project = await FactoryService.getProjectsService().getProjectById(projectId);
    CommonUtils.successResponse(ctx, data);
  }

  public static async createDeployment(ctx: Context) {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'createDeployment |';
    const projectId = parseInt(ctx.params.id);
    logger.info(`${LOG_FUNCTION_PREFIX} project id: ${projectId}`);
    if (projectId === undefined || Number.isNaN(projectId)) {
      throw new GenericError("the 'project-id' parameter must be valid", 400);
    } 
    const data: Deployment = await FactoryService.getProjectsService().createDeploymnet(projectId);
    CommonUtils.successResponse(ctx, data);
  }
}
