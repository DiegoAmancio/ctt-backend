export interface JWTServiceImp {
  generateToken(payload: any): Promise<string>;
}
