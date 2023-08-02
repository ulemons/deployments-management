import jsonwebtoken from 'jsonwebtoken';
import { Token } from '../models/token-models';
import { CONSTANTS } from '../config';


export class TokenService {
  public async getToken(): Promise<Token> {
    return {
      authorization: `Bearer ${jsonwebtoken.sign({}, CONSTANTS.JWT_SECRET)}`,
    };
  }
}
