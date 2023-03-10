import { DataTypes } from 'sequelize'
import { Column,  Model, Table } from 'sequelize-typescript'

import {  toLowerCase } from '../../lib'

@Table({ modelName: 'Product', tableName: 'products', underscored: true })
export class Product extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(),
  })
  public id: string

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


