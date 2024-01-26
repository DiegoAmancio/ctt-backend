import { Language } from '@shared/enum';

export class GetAllVolumeDTO {
  offset: number;
  limit: number;
  language: Language;
  literaryWork?: string;
}
