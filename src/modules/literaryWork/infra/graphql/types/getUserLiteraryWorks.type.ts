import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LiteraryWorkCollectionType } from './literaryWorkCollection.type';

@ObjectType()
export class GetUserLiteraryWorksType {
  @Field(() => [LiteraryWorkCollectionType])
  literaryWorks: LiteraryWorkCollectionType[];

  @Field(() => Int)
  totalLiteraryWorks: number;

  @Field(() => Int)
  completeLiteraryWorks: number;

  @Field(() => Int)
  totalVolumes: number;

  @Field()
  memberSince: Date;
}
