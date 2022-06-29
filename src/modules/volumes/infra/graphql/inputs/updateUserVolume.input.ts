import { Field, ID, InputType } from '@nestjs/graphql';
import { Coin } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserVolumeInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty()
  purchasedPrice: number;

  @Field()
  @IsNotEmpty()
  purchasedDate: Date;

  @Field(() => Coin)
  @IsNotEmpty()
  purchasedPriceUnit: Coin;

  @Field()
  @IsNotEmpty()
  volume: string;
}
