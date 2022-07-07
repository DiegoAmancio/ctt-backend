import { Field, InputType } from '@nestjs/graphql';
import { Coin } from '@shared/enum';

@InputType()
export class UpdateUserVolumeInput {
  @Field({ nullable: true })
  purchasedPrice: number;

  @Field({ nullable: true })
  purchasedDate: Date;

  @Field(() => Coin, { nullable: true })
  purchasedPriceUnit: Coin;

  @Field()
  volume: string;
}
