import { Field, ObjectType } from 'type-graphql'

import { User } from './User'

@ObjectType({ description: 'Response data for user by id' })
export class QueryUserResponse {
  @Field((_type) => User, { nullable: true })
  user?: User
}
