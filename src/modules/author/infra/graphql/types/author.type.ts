import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

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
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;
}
