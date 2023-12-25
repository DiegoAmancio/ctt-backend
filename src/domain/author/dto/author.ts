import { LiteraryWork } from '@infrastructure/database/model';

export class AuthorDTO {
  id: string;
  name: string;
  imageUrl: string;
  registeredBy: string;
  updatedBy: string;
  literaryWorksIllustrated: LiteraryWork[];
  literaryWorksWritten: LiteraryWork[];
}
