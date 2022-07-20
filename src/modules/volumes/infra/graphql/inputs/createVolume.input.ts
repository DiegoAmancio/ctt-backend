import { Field, InputType, Int } from '@nestjs/graphql';
import { Coin, Language, PaperType } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVolumeInput {
  @Field({ nullable: true })
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

  @Field(() => Int)
  @IsNotEmpty()
  pagesNumber: number;

  @Field(() => PaperType, { nullable: true })
  paperType: PaperType;

  @Field()
  @IsNotEmpty()
  literaryWork: string;
}
