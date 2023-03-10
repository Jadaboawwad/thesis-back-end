import { DataTypes, UUIDV4 } from 'sequelize'
import { Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript'

import { Team } from './team.model'

import { ContractTypes, Genders, MaritalStatuses, Positions } from '../../graphql/service/User/typedefs/userEnums'
import { getDate, getIsoTimestamp, getUserFullName, setDate, toLowerCase } from '../../lib'

@Table({
  modelName: 'User',
  tableName: 'users',
  underscored: true,
})
export class User extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string

  @Column({
    allowNull: false,
    set: toLowerCase('firstName'),
    type: DataTypes.STRING(32),
    unique: false,
  })
  public firstName: string

  @Column({
    allowNull: false,
    set: toLowerCase('lastName'),
    type: DataTypes.STRING(32),
    unique: false,
  })
  public lastName: string

  @Column({
    allowNull: false,
    set: toLowerCase('email'),
    type: DataTypes.STRING(32),
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  public email: string

  @ForeignKey(() => Team)
  @Column({
    comment: 'FK on table team',
    type: DataTypes.UUID,
  })
  teamId: string

  @Column({
    allowNull: true,
    comment: 'User birthday DateTime',
    type: DataTypes.DATE,
  })
  birthday: Date

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
    unique: false,
  })
  public bio: string

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'User created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'User updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date

  @Column({
    allowNull: true,
    comment: 'User started at DateTime',
    type: DataTypes.DATE,
  })
  public startedAt: Date | null

  @Column({
    comment: 'User number of days off',
    defaultValue: 0,
  })
  public offDays: number

  @Column({
    comment: 'Whether or not user is banned',
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  public isBanned: boolean

  @Column({
    comment: 'Whether or not user is smoker',
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  public isSmoker: boolean

  @Column({
    comment: 'User full name',
    get: getUserFullName,
    type: DataTypes.VIRTUAL,
  })
  public fullName: string

  @Column({
    allowNull: true,
    comment: 'Contract type for the employee',
    type: DataTypes.ENUM({ values: Object.values(ContractTypes) }),
  })
  public contractType: ContractTypes | null

  @Column({
    allowNull: true,
    comment: 'Gnder for the employee',
    type: DataTypes.ENUM({ values: Object.values(Genders) }),
  })
  public gender: Genders

  @Column({
    allowNull: true,
    comment: 'Marital status for the employee',
    type: DataTypes.ENUM({ values: Object.values(MaritalStatuses) }),
  })
  public maritalStatus: MaritalStatuses

  @Column({
    allowNull: true,
    comment: 'Employee Position',
    type: DataTypes.ENUM({ values: Object.values(Positions) }),
  })
  public position: Positions | null

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
    unique: false,
  })
  public profileImageUrl: string | null

  @Column({
    type: DataTypes.STRING(14),
    unique: true,
  })
  public SSN: string
}
