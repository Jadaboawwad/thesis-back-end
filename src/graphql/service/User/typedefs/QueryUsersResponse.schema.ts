import { Field, ObjectType } from 'type-graphql'

import { User } from './User'

@ObjectType({ description: 'Response data for users' })
export class QueryUsersResponse {
  @Field((_type) => [User], { nullable: true })
  users?: User[]
}
