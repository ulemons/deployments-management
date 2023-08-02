import { DataEvent } from '../../models/events-model';
import { DAO_CONSTANTS } from '../../config';

import db from '../db';

export class DataAggregationDao {
  public async getFeedByProjectId(
    projectId: number,
    page?: number,
    pageSize?: number
  ): Promise<DataEvent[]> {
    if (page !== undefined && pageSize !== undefined) {
      const offset = (page - 1) * pageSize;
      return await db
        .select('name as name', 'payload as payload', 'created_at as createdAt')
        .limit(pageSize)
        .offset(offset)
        .where('project_id', projectId)
        .from(DAO_CONSTANTS.DATA_AGGREGATION_TABLE);
    } else {
      return await db
        .select('name as name', 'payload as payload', 'created_at as createdAt')
        .where('project_id', projectId)
        .from(DAO_CONSTANTS.DATA_AGGREGATION_TABLE);
    }
  }
}
