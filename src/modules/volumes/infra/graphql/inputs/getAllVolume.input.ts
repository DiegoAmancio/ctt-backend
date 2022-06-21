import { Field, InputType, Int } from '@nestjs/graphql';
import { Language } from '@shared/enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetAllVolumeInput {
  @Field(() => Int)
  @IsNotEmpty()
  limit: string;

  @Field(() => Int)
  @IsNotEmpty()
  offset: number;

  @Field(() => Language)
  @IsNotEmpty()
  language: Language;
}
