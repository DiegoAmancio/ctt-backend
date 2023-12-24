import { Language } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

export class CreateInternationalizationBody {
  @IsNotEmpty()
  language: Language;
  @IsNotEmpty()
  synopsis: string;
  literaryWork?: string;
  volume?: string;
}
