import { Field, InputType, Int } from '@nestjs/graphql';
import { Language } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetAllLiteraryWorkInput {
  @Field(() => Int)
  @IsNotEmpty()
  limit: string;

  @Field(() => Int)
  @IsNotEmpty()
  offset: number;

  @Field(() => Language)
  @IsNotEmpty()
  language: Language;
}
