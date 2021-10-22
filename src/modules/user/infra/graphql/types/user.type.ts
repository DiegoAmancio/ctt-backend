import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID_VERSION } from '@shared/utils/constants';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsUUID(UUID_VERSION)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDate()
  created_at: Date;

  @Field()
  @IsDate()
  updated_at: Date;
}
