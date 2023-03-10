import { Field, ArgsType } from 'type-graphql'

@ArgsType()
export class CreateProductArgs {
  @Field((_type) => String, { nullable: true })
  public id: string

  @Field((_type) => String, { nullable: true })
  public name: string

  @Field((_type) => String, { nullable: true })
  public description: string

  @Field((_type) => String, { nullable: true })
  public imageUrl: string
}
