import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Edition, Language, PaperType, Status, Type } from '@shared/enum';
import { IsDate } from 'class-validator';

@ObjectType()
export class LiteraryWorkType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

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

  @Field(() => Language)
  language: Language;

  @Field()
  synopsis: string;

  @Field()
  country: string;

  @Field()
  bagShape: string;

  @Field()
  publisher: string;

  @Field()
  dimensions: string;

  @Field()
  imageUrl: string;

  @Field(() => Status)
  status: Status;

  @Field()
  categories: string;

  @Field(() => Edition)
  edition: Edition;

  @Field(() => Type)
  type: Type;

  @Field(() => PaperType)
  paperType: PaperType;
}
