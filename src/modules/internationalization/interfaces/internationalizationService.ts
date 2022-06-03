import { InternationalizationDto, CreateInternationalizationDTO } from '../dto';
import { UpdateInternationalizationDto } from '../dto/updateInternationalization.dto';

export interface InternationalizationServiceInterface {
  createInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDto>;
  getInternationalization(id: string): Promise<InternationalizationDto>;
  updateInternationalization(
    data: UpdateInternationalizationDto,
  ): Promise<string>;
  deleteInternationalization(data: string): Promise<boolean>;
}
