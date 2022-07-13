import { Field, InputType, Int } from '@nestjs/graphql';
import { Language } from '@shared/enum';

@InputType()
export class getAllAuthorLiteraryWork {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Language)
  language: Language;

  @Field({ nullable: true })
  author: string;
}
