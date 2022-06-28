import { Language, Edition, PaperType, Type } from '@shared/enum';
import { LiteraryWork } from '../infra/database';

export interface LiteraryWorkDto
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
