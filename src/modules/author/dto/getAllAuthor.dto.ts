import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class getAllAuthor {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;

  @Field({ nullable: true })
  name?: string;
}
