import { Field, InputType } from '@nestjs/graphql';
import { Edition, Language, PaperType, Type } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInternationalizationInput {
  @Field(() => Language)
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  synopsis: string;

  @Field(() => Edition)
  @IsNotEmpty()
  edition: Edition;

  @Field(() => Type)
  @IsNotEmpty()
  type: Type;

  @Field(() => PaperType)
  @IsNotEmpty()
  paperType: PaperType;

  @Field({ nullable: true })
  literaryWork?: string;
}
