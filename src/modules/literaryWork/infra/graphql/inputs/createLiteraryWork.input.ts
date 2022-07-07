import { Field, InputType } from '@nestjs/graphql';
import {
  Categories,
  Edition,
  Language,
  PaperType,
  Status,
  Type,
} from '@shared/enum';
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
  originalPublisher: string;

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

  @Field(() => [Categories])
  @IsNotEmpty()
  categories: Categories[];

  @Field(() => Edition)
  @IsNotEmpty()
  edition: Edition;

  @Field(() => Type)
  @IsNotEmpty()
  type: Type;

  @Field(() => PaperType)
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  ilustratorBy: string;

  @Field()
  @IsNotEmpty()
  writterBy: string;

  @Field()
  @IsNotEmpty()
  releaseFrequency: string;

  @Field()
  @IsNotEmpty()
  startOfPublication: Date;

  @Field({ nullable: true })
  endOfPublication: Date;
}
