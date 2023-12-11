import { LiteraryWork } from '@modules/literaryWork/infra/database';

export class AuthorDto {
  id: string;
  name: string;
  imageUrl: string;
  registeredBy: string;
  updatedBy: string;
  literaryWorksIllustrated: LiteraryWork[];
  literaryWorksWritten: LiteraryWork[];
}
