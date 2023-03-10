import { Field, ObjectType } from 'type-graphql'

import { Product } from './Product'

@ObjectType({ description: 'Response data for products data' })
export class QueryProductsResponse {
  @Field((_type) => [Product], { nullable: true })
  products?: Product[]
}
