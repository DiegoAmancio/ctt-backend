import { Field, ID, InputType } from '@nestjs/graphql';
import { Language, Status, Edition, PaperType, Type } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateLiteraryWorkInput {
  @Field(() => ID)
  id: string;

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

  @Field()
  @IsNotEmpty()
  categories: string;

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

  @Field()
  @IsNotEmpty()
  endOfPublication: Date;
}
