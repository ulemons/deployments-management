import logger from '../logger';
import db from '../database/db';
import { DataEvent } from '../models/events-model';
import { FactoryService } from './factory-service';
import { CONSTANTS } from '../config';

const LOG_PREFIX = 'DataAggregationService | ';

export class DataAggregationService {
  public async getFeedByProjectId(projectId: number, page: number): Promise<DataEvent[]> {
    const dataAggregationDao = FactoryService.getDataAggregationDao();
    return await dataAggregationDao.getFeedByProjectId(projectId, page, CONSTANTS.PAGE_SIZE);
  }
  public async pushEvent(event: DataEvent) {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'pushEvent |';
    logger.debug(`${LOG_FUNCTION_PREFIX} logging event: ${JSON.stringify(event)}`);
    await db('data_events').insert({
      payload: event.payload,
      name: event.name,
      project_id: event.projectId,
    });
  }
}
