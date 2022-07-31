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

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  updatedAt?: Date;
}
