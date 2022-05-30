import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateInternationalizationInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  language: string;

  @Field()
  @IsNotEmpty()
  value: string;
}
