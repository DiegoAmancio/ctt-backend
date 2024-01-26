export class TokenPayloadDTO {
  token: string;
  role: string;
  name: string;

  constructor(params: { token: string; role: string; name: string }) {
    Object.assign(this, params);
  }
}
