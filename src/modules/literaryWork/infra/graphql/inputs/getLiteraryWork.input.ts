import { Field, ID, InputType } from '@nestjs/graphql';
import { Language } from '@shared/enum/language.enum';

@InputType()
export class GetLiteraryWorkInput {
  @Field(() => ID)
  id: string;

  @Field(() => Language)
  language: Language;
}
