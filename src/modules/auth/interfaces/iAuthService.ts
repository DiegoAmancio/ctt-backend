import { TokenDataInputDTO, TokenDataDTO } from '../dto';

export interface IAuthService {
  generateToken(data: TokenDataInputDTO): Promise<TokenDataDTO>;
}
