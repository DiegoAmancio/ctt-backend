import { TokenPayloadDTO } from '../dto';

export interface AuthServiceImpl {
  generateToken(reqTokenId: string): Promise<TokenPayloadDTO>;
}
