import { PaperType } from '@shared/enum';

export interface CreateVolumeDTO {
  dimensions: string;
  coverPrice: number;
  number: number;
  imageUrl: string;
  publication: Date;
  paperType: PaperType;
  literaryWork: string;
  adminId: string;
}
