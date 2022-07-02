import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Edition, Language, PaperType, Status, Type } from '@shared/enum';
import { IsDate, IsNotEmpty } from 'class-validator';

@ObjectType()
export class LiteraryWorkCollectionType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Edition)
  edition: Edition;

  @Field(() => Int)
  adquiredVolumes: number;

  @Field(() => Int)
  totalVolumes: number;
}
