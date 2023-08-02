import { Context } from 'koa';
import logger from '../logger';
import { FactoryService } from '../services/factory-service';
import { GenericError } from '../errors/CustomErrors';
import { CommonUtils } from '../utils/common-utils';
import { DataEvent } from '../models/events-model';

const LOG_PREFIX = 'DataAggregationController | ';

export class DataAggregationController {

  public static async getFeedByProjectId(ctx: Context): Promise<void> {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'getFeed |';
    const page = parseInt(ctx.query.page as string);
    const projectId = parseInt(ctx.params.id);
    logger.info(`${LOG_FUNCTION_PREFIX} page requested: ${page}`);
    if (page < 1) {
      throw new GenericError("The 'page' parameter must be greater than zero", 400);
    } 
    if (projectId === undefined || Number.isNaN(projectId)) {
      throw new GenericError("the 'id' parameter must be valid", 400);
    }
    const data: DataEvent[] = await FactoryService.getDataAggregationService().getFeedByProjectId(projectId, page);
    CommonUtils.successResponse(ctx, data);
  }
}
