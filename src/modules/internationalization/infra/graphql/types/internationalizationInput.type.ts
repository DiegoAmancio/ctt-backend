import { Field, ID, InputType } from '@nestjs/graphql';
import { Edition, Language, PaperType, Type } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateInternationalizationInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  synopsis: string;

  @Field()
  @IsNotEmpty()
  edition: Edition;

  @Field()
  @IsNotEmpty()
  type: Type;

  @Field()
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  country: string;
}
