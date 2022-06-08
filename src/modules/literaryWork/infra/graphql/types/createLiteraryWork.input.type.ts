import { Field, InputType } from '@nestjs/graphql';
import { Language, Status } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLiteraryWorkInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  bagShape: string;

  @Field(() => Language)
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  publisher: string;

  @Field()
  @IsNotEmpty()
  dimensions: string;

  @Field()
  @IsNotEmpty()
  imageUrl: string;

  @Field(() => Status)
  @IsNotEmpty()
  status: Status;

  @Field()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsNotEmpty()
  categories: string;
}
