import { Coin, Language, PaperType } from '@shared/enum';

export interface CreateVolumeDTO {
  language: Language;
  coverPriceUnit: Coin;
  coverPrice: number;
  number: number;
  imageUrl: string;
  publication: Date;
  paperType: PaperType;
  literaryWork: string;
  adminId: string;
}
