import { Language } from '@shared/enum';

export interface CreateInternationalizationDTO {
  language: Language;

  synopsis: string;

  literaryWork?: string;

  volume?: string;
}
