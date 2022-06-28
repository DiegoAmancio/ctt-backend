import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  imageUrl: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field()
  registeredBy: string;

  @Field()
  updatedBy: string;
}
