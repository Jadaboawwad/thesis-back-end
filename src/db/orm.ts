/* eslint-disable no-console */
import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import { QueryInterface } from 'sequelize/types'
import { SequelizeStorage, Umzug } from 'umzug'

import { ormConfig } from '../settings'

export class ORM {
  queryInterface: QueryInterface
  private config: any
  sequlizer: Sequelize

  constructor() {
    this.config = ormConfig
    this.startSequlizeService()
  }

  private startSequlizeService = async () => {
    this.sequlizer = new Sequelize(this.config.database, this.config.username, this.config.password, {
      dialect: 'postgres',
      host: this.config.host,
      modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
      },
      models: [path.resolve() + '/dist/db//models/**/*.model.js'],
      port: Number(process.env.DB_PORT),
    })

    this.queryInterface = this.sequlizer.getQueryInterface()

    try {
      await this.sequlizer.authenticate()
      console.log('---------------------------------------------')
      console.log('Sequlize Service Started Successfully')
      console.log('---------------------------------------------')
    } catch (error) {
      console.log('---------------------------------------------')
      console.error('Unable to start sequlize service', error)
      console.log('---------------------------------------------')
    }
  }
}

export const orm = new ORM()
export const umzuger = new Umzug({
  context: { queryInterface:orm.queryInterface, sequelize:orm.sequlizer },
  create: {
    folder: 'src/db/migrations',
    template: (filepath: string) => [
      [filepath, fs.readFileSync(path.join(path.resolve(), 'src/db/template/simple-migrations.ts')).toString()],
    ],
  },
  logger: console,
  migrations: {
    glob: ['dist/db/migrations/*.js', { cwd: path.resolve() }],
  },
  storage: new SequelizeStorage({
    sequelize: orm.sequlizer,
  }),
})

try {
  umzuger.up()
  console.log('---------------------------------------------')
  console.log('Migration Service Started Successfully')
} catch (error) {
  console.log('---------------------------------------------')
  console.error('Unable to start migration service', error)
  console.log('---------------------------------------------')
}

console.log('ORM Service Started Successfully')

export type Migration = typeof umzuger._types.migration
