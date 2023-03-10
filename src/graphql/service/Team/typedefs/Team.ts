import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class Team {

  @Field((_type) => ID!)
  public id: string
}
