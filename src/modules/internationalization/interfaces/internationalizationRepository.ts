import { CreateInternationalizationDTO, InternationalizationDto } from '../dto';
import { Internationalization } from '../infra/database';

export interface InternationalizationRepositoryInterface {
  createAndSaveInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<Internationalization>;
  updateInternationalization(data: InternationalizationDto): Promise<boolean>;
  deleteInternationalization(id: string): Promise<boolean>;
  getInternationalization(id: string): Promise<Internationalization>;
}
