import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@ObjectType()
export class MyCollectionType {
  @Field(() => ID)
  id: string;

  @Field()
  totalLiteraryWorks: number;

  @Field()
  completeLiteraryWorks: number;

  @Field()
  collectionValue: number;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
