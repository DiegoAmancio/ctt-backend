import { Field, InputType } from '@nestjs/graphql';
import { Language } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInternationalizationInput {
  @Field(() => Language)
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  synopsis: string;

  @Field({ nullable: true })
  literaryWork?: string;

  @Field({ nullable: true })
  volume?: string;
}
