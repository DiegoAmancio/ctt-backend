import { InternationalizationType } from '@modules/internationalization/infra/graphql/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Language } from '@shared/enum';
import { IsDate } from 'class-validator';
import { CreateLiteraryWorkInput } from './createLiteraryWork.input.type';

@ObjectType()
export class LiteraryWorkType extends CreateLiteraryWorkInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field()
  registeredBy: string;

  @Field()
  updatedBy: string;

  @Field(() => Language)
  language: Language;

  @Field()
  synopsis: string;

  @Field()
  edition: string;

  @Field()
  type: string;

  @Field()
  paperType: string;

  @Field()
  country: string;
}
