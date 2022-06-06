import { Language, Status } from '@shared/enum';

export interface CreateLiteraryWorkDTO {
  name: string;
  bagShape: string;
  language: Language;
  publisher: string;
  dimensions: string;
  imageUrl: string;
  status: Status;
  country: string;
  categories: string;
  adminId: string;
}
