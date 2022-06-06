import { Field, ID, ObjectType } from '@nestjs/graphql';
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
}
