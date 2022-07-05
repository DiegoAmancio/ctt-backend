import { Language } from '@shared/enum';

export class getAllUserVolumeDTO {
  offset: number;

  limit: number;

  language: Language;

  user: string;
}
