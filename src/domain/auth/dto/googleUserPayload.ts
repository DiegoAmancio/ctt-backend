export class GoogleUserPayloadDTO {
  id: string;
  email: string;
  name: string;
  constructor(params: { id: string; email: string; name: string }) {
    Object.assign(this, params);
  }
}
