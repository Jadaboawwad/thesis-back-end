import { Model } from 'sequelize-typescript'

import { ContractTypes, Genders, MaritalStatuses, Positions } from '../typedefs/userEnums'

export declare class UserOrm extends Model {
  SSN: string
  bio: string
  birthday: Date
  contractType: ContractTypes
  email: string
  firstName: string
  fullName: string
  maritalStatus: MaritalStatuses
  id: string
  isBanned: boolean
  isSmoker: boolean
  lastName: string
  gender: Genders
  offDays: number
  position: Positions
  profileImageUrl: string
  startedAt: Date
}
