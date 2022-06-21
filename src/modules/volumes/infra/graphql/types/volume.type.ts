import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coin, Edition, Language, PaperType } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class VolumeType {
  @Field(() => ID)
  id: string;

  @Field()
  synopsis: string;

  @Field()
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  coverPriceUnit: Coin;

  @Field()
  @IsNotEmpty()
  coverPrice: number;

  @Field()
  @IsNotEmpty()
  number: number;

  @Field()
  @IsNotEmpty()
  imageUrl: string;

  @Field()
  @IsNotEmpty()
  publication: Date;

  @Field()
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  dimensions: string;

  @Field()
  @IsNotEmpty()
  edition: Edition;

  @Field()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsNotEmpty()
  categories: string;
}
