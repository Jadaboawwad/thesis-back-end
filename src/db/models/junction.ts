import { DataTypes, UUIDV4 } from 'sequelize'
import { Column,  Model, Table } from 'sequelize-typescript'

import {  toLowerCase } from '../../lib'

@Table({ modelName: 'Junction', tableName: 'junctions', underscored: true })
export class Junction extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(),
  })
  public productId: string

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public userId: string

  @Column({
    allowNull: false,
    set: toLowerCase('firstName'),
    type: DataTypes.STRING(32),
    unique: false,
  })
  public userName: string

  @Column({
    allowNull: false,
    set: toLowerCase('name'),
    type: DataTypes.STRING(),
    unique: false,
  })
  public name: string

  @Column({
    allowNull: false,
    set: toLowerCase('description'),
    type: DataTypes.STRING(),
    unique: false,
  })
  public description: string

  @Column({
    allowNull: false,
    set: toLowerCase('imageUrl'),
    type: DataTypes.STRING(),
    unique: false,
  })
  public imageUrl: string


}


