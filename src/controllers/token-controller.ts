import { Context } from 'koa';
import { FactoryService } from '@services/factory-service';
import { Token } from '@models/token-models';
import { CommonUtils } from '@utils/common-utils';

export class TokenController {
  public static async getToken(ctx: Context) {
    const data: Token = await FactoryService.getTokenService().getToken();
    CommonUtils.successResponse(ctx, data);
  }
}
