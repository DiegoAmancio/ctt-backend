import { TokenDataDTO } from '../dto/tokendata.dto';
import { TokenDataInputDTO } from '../dto/tokenDataInput.dto';

export interface IAuthService {
  generateToken(data: TokenDataInputDTO): Promise<TokenDataDTO>;
}
