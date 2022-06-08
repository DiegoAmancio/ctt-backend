import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LiteraryWorkInternationalizationType {
  @Field()
  synopsis: string;
}
