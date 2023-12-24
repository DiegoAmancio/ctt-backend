import { LiteraryWork } from '@modules/literaryWork/infra/database';

export class AuthorDTO {
  id: string;
  name: string;
  imageUrl: string;
  registeredBy: string;
  updatedBy: string;
  literaryWorksIllustrated: LiteraryWork[];
  literaryWorksWritten: LiteraryWork[];
}
