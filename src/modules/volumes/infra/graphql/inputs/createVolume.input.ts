import { Field, InputType } from '@nestjs/graphql';
import { Coin, Language, PaperType } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVolumeInput {
  @Field(() => Language)
  @IsNotEmpty()
  language: Language;

  @Field()
  @IsNotEmpty()
  dimensions: string;

  @Field(() => Coin)
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

  @Field(() => PaperType)
  @IsNotEmpty()
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  literaryWork: string;
}
