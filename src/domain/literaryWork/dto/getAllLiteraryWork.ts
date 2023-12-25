import { Language } from '@shared/enum';

export class getAllLiteraryWorkDTO {
  offset: number;
  limit: number;
  language: Language;
  name?: Language;
}
