import { Field, ArgsType } from 'type-graphql'

@ArgsType()
export class UpdateProductArgs {
  @Field((_type) => String, { nullable: true })
  public selectedId?: string

  @Field((_type) => String, { nullable: true })
  public id?: string

  @Field((_type) => String, { nullable: true })
  public name?: string

  @Field((_type) => String, { nullable: true })
  public description?: string

  @Field((_type) => String, { nullable: true })
  public imageUrl?: string
}
