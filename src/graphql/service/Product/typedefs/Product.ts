import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Response for the product data' })
export class Product {
  @Field((_type) => String!)
  public id: string

  @Field((_type) => String!)
  public name: string

  @Field((_type) => String!)
  public description: string

  @Field((_type) => String!)
  public imageUrl: string
}
