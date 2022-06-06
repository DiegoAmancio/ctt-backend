import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateLiteraryWorkInput } from './createLiteraryWork.input.type';

@InputType()
export class UpdateLiteraryWorkInput extends CreateLiteraryWorkInput {
  @Field(() => ID)
  id: string;
}
