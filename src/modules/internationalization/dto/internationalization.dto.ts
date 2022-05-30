import { CreateInternationalizationDTO } from '.';

export interface InternationalizationDto extends CreateInternationalizationDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
