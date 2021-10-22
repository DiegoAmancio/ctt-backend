import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID_VERSION } from '@shared/utils/constants';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID(UUID_VERSION)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  password: string;
}
