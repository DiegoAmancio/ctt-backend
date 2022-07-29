import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Language, PaperType, Coin } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateVolumeInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  dimensions: string;

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

  @Field(() => Int)
  @IsNotEmpty()
  pagesNumber: number;

  @Field()
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  literaryWork: string;
}
