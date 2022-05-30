import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Internationalization {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  language: string;

  @Field()
  @IsNotEmpty()
  value: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
