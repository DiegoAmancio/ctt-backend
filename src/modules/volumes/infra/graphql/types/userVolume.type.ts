import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Coin } from '@shared/enum';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class UserVolumeType {
  @Field(() => ID)
  @IsNotEmpty()
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
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
