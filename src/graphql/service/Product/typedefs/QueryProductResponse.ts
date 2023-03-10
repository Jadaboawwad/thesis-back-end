import { Field, ObjectType } from 'type-graphql'

import { Product } from './Product'

@ObjectType({ description: 'Response data for product by id' })
export class QueryProductResponse {
  @Field((_type) => Product, { nullable: true })
  product?: Product
}
