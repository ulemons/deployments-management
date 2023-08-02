import { faker } from '@faker-js/faker';
import logger from '../logger';
import { Context } from 'koa';
import { SuccessResponsePayload } from '../models/common-models';

const LOG_PREFIX = 'DataAggregationController | ';

export class CommonUtils {
  public static getRandomUrl() {
    return `https://www.${faker.company.name()}.${faker.location.countryCode()}`
      .replace(/\s/g, '')
      .toLowerCase();
  }

  public static successResponse(ctx: Context, data: SuccessResponsePayload): void {
    const LOG_FUNCTION_PREFIX = LOG_PREFIX + 'successResponse |';
    ctx.status = 200;
    ctx.body = data
    logger.info(`${LOG_FUNCTION_PREFIX} controller response: ${JSON.stringify(ctx.body)}`);
  }
}
