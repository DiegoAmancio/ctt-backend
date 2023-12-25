import { Language, Edition, PaperType, Type } from '@shared/enum';
import { LiteraryWork } from '@infrastructure/database/model';

export interface LiteraryWorkDTO
  extends Omit<
    LiteraryWork,
    | 'registeredBy'
    | 'updatedBy'
    | 'internationalization'
    | 'ilustratorBy'
    | 'writterBy'
  > {
  registeredBy: string;
  updatedBy: string;
  language: Language;
  synopsis: string;
  edition: Edition;
  type: Type;
  paperType: PaperType;
  country: string;
  ilustratorBy: string;
  writterBy: string;
}
