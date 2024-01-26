import { Language } from '@shared/enum';

export class GetAllUserVolumeDTO {
  offset: number;

  limit: number;

  language: Language;

  user: string;
}
