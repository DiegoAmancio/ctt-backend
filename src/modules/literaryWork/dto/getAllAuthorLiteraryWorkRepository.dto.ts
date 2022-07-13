import { Author } from '@modules/author/infra/database';
import { Language } from '@shared/enum';

export class getAllAuthorLiteraryWorkRepository {
  offset: number;

  limit: number;

  language: Language;

  author: Author;
}
