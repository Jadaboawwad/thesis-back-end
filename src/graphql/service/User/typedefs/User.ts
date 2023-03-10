import { Field, ObjectType, ID, Int } from 'type-graphql'

import { ContractTypes, Genders, MaritalStatuses, Positions } from './userEnums'

import { Team } from '../../Team/typedefs/Team'

@ObjectType({
  description: 'Resoponse for the user data',
})
export class User {
  @Field((_type) => ID!)
  public id: string

  @Field((_type) => String!)
  public firstName: string

  @Field((_type) => String!)
  public lastName: string

  @Field((_type) => String!)
  public email: string

  @Field((_type) => Team!, { nullable: true })
  public team: Team | null

  @Field((_type) => String, { nullable: true })
  public bio: string | null

  @Field((_type) => Boolean, { defaultValue: false })
  public isBanned: boolean

  @Field((_type) => Boolean, { defaultValue: false })
  public isSmoker: boolean

  @Field((_type) => ContractTypes, { nullable: true })
  public contractType: ContractTypes | null

  @Field((_type) => Genders)
  public gender: Genders

  @Field((_type) => MaritalStatuses)
  public maritalStatuses: MaritalStatuses

  @Field((_type) => Positions, { nullable: true })
  public position: Positions | null

  @Field((_type) => Date, { nullable: true })
  public startedAt: Date | null

  @Field((_type) => Int)
  public offDays: number

  @Field((_type) => Date, { nullable: true })
  public birthday: Date | null

  @Field((_type) => String)
  public SSN: string

  @Field((_type) => String, { nullable: true })
  public profileImageUrl: string | null

  @Field((_type) => String)
  public fullName: string
}
