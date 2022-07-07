import { Field, ID, InputType } from '@nestjs/graphql';
import { Coin } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserVolumeInput {
  @Field({ nullable: true })
  purchasedPrice: number;

  @Field()
  @IsNotEmpty()
  purchasedDate: Date;

  @Field(() => Coin, { nullable: true })
  purchasedPriceUnit: Coin;

  @Field()
  @IsNotEmpty()
  volume: string;
}
