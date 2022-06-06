import { Edition, Language, PaperType, Type } from '@shared/enum';

export interface CreateInternationalizationDTO {
  language: Language;

  synopsis: string;

  edition: Edition;

  type: Type;

  paperType: PaperType;

  country: string;
}
