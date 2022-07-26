import { TokenDataDTO } from '../dto/tokenData.dto';
import { TokenDataInputDTO } from '../dto/tokenDataInput.dto';

export interface IAuthService {
  generateToken(data: TokenDataInputDTO): Promise<TokenDataDTO>;
}
