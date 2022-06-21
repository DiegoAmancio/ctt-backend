import { Field, ID, InputType } from '@nestjs/graphql';
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

  @Field()
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  literaryWork: string;
}
