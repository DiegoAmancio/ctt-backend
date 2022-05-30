import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInternationalizationInput {
  @Field()
  @IsNotEmpty()
  language: string;

  @Field()
  @IsNotEmpty()
  value: string;
}
