import { Field, ArgsType } from 'type-graphql'

@ArgsType()
export class DeleteProductArgs {
  @Field((_type) => String, { nullable: true })
  public id: string
}
