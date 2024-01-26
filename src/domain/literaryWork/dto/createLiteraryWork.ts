import {
  Categories,
  Edition,
  Language,
  PaperType,
  Status,
  Type,
} from '@shared/enum';

export interface CreateLiteraryWorkDTO {
  name: string;
  bagShape: string;
  language: Language;
  publisher: string;
  originalPublisher: string;
  dimensions: string;
  imageUrl: string;
  status: Status;
  country: string;
  categories: Categories[];
  adminId: string;
  edition: Edition;
  type: Type;
  paperType: PaperType;
  releaseFrequency: string;
  startOfPublication: Date;
  endOfPublication: Date;
  ilustratorBy: string;
  writterBy: string;
}
