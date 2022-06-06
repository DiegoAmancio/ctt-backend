import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LiteraryWorkInternationalizationType {
  @Field()
  synopsis?: string;

  @Field()
  edition?: string;

  @Field()
  type?: string;

  @Field()
  paperType?: string;

  @Field()
  country?: string;
}
