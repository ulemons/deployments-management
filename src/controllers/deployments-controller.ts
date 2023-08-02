import { Context } from 'koa';
import logger from '../logger';
import { Deployment, DeploymentStats, DeploymentUpdateRequest, DeploymnetUpdateResponse } from '../models/deployments-models';
import { UploadDeploymentSchema } from '../schema/deployment-schema';
import { ValidationError, validate } from 'class-validator';
import { FactoryService } from '../services/factory-service';
import { GenericError } from '../errors/CustomErrors';
import { CommonUtils } from '../utils/common-utils';

const LOG_PREFIX = 'DeploymentsController | ';

export class DeploymentsController {
  public static async deleteDeployment(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'deleteDeployment |';
    const deploymentId = parseInt(ctx.params.id);
    logger.info(`${LOG_FUNCTION_PREFIX} deployment id: ${deploymentId}`);
    if (deploymentId === undefined || Number.isNaN(deploymentId)) {
      throw new GenericError("the 'id' parameter must be valid", 400);
    }
    const data: Deployment = await FactoryService.getDeploymentsService().deleteDeployment(deploymentId);
    CommonUtils.successResponse(ctx, data);
  }

  public static async getDeploymentById(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getDeploymentById |';
    const deploymentId = parseInt(ctx.params.id);
    logger.info(`${LOG_FUNCTION_PREFIX} deployment id: ${deploymentId}`);
    if (deploymentId === undefined || Number.isNaN(deploymentId)) {
      throw new GenericError("the 'id' parameter must be valid", 400);
    }
    const data: Deployment = await FactoryService.getDeploymentsService().getDeploymentById(deploymentId);
    CommonUtils.successResponse(ctx, data);
  }

  public static async getDeployments(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getDeployments |';
    const page = parseInt(ctx.query.page as string);
    logger.info(`${LOG_FUNCTION_PREFIX} page requested: ${page}`);
    if (page < 1) {
      throw new GenericError("The 'page' parameter must be greater than zero", 400);
    }
    const data: Deployment[] = await FactoryService.getDeploymentsService().getDeployments(page); 
    CommonUtils.successResponse(ctx, data); 
  }

  public static async getDeploymentStats(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getDeployments |';
    const userId = parseInt(ctx.params.id);
    if (userId === undefined || Number.isNaN(userId)) {
      throw new GenericError("the 'id' parameter must be valid", 400);
    }
    const data: DeploymentStats = await FactoryService.getDeploymentsService().getDeploymentStats(userId);
    CommonUtils.successResponse(ctx, data);
  }

  public static async updateStatus(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'updateStatus |';
    const requestBody = ctx.request.body as DeploymentUpdateRequest;
    const uploadDeployment = new UploadDeploymentSchema();
    uploadDeployment.id = requestBody.id;
    uploadDeployment.status = requestBody.status;
    const errors: ValidationError[] = await validate(uploadDeployment);
    logger.info(`${LOG_FUNCTION_PREFIX} deployment body: ${JSON.stringify(uploadDeployment)}`);
    if (errors.length > 0) {
      throw new GenericError(JSON.stringify(errors), 400);
    }
    const data: DeploymnetUpdateResponse = await FactoryService.getDeploymentsService().updateDeployment(uploadDeployment); 
    CommonUtils.successResponse(ctx, data);
  }
}
