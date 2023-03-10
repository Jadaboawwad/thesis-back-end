import { DataTypes, literal } from 'sequelize'

import { Migration } from '../orm'

export const up: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.createTable("test", {
    created_at: {
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP(3)'),
      type: DataTypes.DATE,
    },
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    updated_at: {
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP(3)'),
      type: DataTypes.DATE,
    },
  })
}

export const down: Migration = async ({ context: { queryInterface } }) => {
  await queryInterface.dropTable("test")
}
