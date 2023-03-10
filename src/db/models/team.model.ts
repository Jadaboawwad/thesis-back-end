import { DataTypes, UUIDV4 } from 'sequelize'
import { Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript'

import { User } from '.'

import { getDate, getIsoTimestamp, setDate, toLowerCase } from '../../lib'

@Table({
  modelName: 'Team',
  tableName: 'teams',
})
export class Team extends Model {
  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Team created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('created_at'),
    set: setDate('created_at'),
    type: DataTypes.DATE,
  })
  public created_at: Date

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Team updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updated_at'),
    set: setDate('updated_at'),
    type: DataTypes.DATE,
  })
  public updated_at: Date

  @ForeignKey(() => User)
  @Column({
    comment: 'FK on table user',
    type: DataTypes.UUID,
  })
  managerId: string

  @ForeignKey(() => User)
  @Column({
    comment: 'FK on table user',
    type: DataTypes.UUID,
  })
  teamLead: string

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string

  @Column({
    allowNull: false,
    set: toLowerCase('name'),
    type: DataTypes.STRING(32),
    unique: false,
  })
  public name: string
}
