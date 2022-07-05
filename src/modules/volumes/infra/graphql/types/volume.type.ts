import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coin, Edition, Language, PaperType } from '@shared/enum';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class VolumeType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

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

  @Field({ nullable: true })
  haveVolume?: boolean;

  @Field({ nullable: true })
  purchasedPrice?: string;

  @Field({ nullable: true })
  purchasedDate?: Date;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
