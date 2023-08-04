import logger from '@logger';
import { DataEvent } from '@models/events-model';
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
    const dataAggregationDao = FactoryService.getDataAggregationDao();
    return await dataAggregationDao.pushEvent(event);
  }
}
