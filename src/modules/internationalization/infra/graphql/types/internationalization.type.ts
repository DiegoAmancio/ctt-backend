import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Language } from '@shared/enum';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Internationalization {
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
  edition: string;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  paperType: string;


  @Field()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
