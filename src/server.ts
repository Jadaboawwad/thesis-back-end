/* eslint-disable no-console */
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express, { Application } from 'express'
import { Umzug } from 'umzug'

import { Product, User } from './db/models/'
import { orm, umzuger , ORM } from './db/orm'
import { PRODUCTS_DATA, USER_DATA } from './db/seeds'
import { generateSchema } from './graphql/root/schema'
import { createContext } from './graphql/shared/context'

export class Server {
  private app: express.Application
  private migrator: Umzug
  private orm: ORM
  private port: string | number

  constructor(port: string | undefined, app: Application) {
    this.app = app
    this.port = port ?? 4000

    this.initilizeServer()
  }

  private establishDBConnection() {
    try {
      this.orm = orm
      this.migrator = umzuger
      console.log(`🚀DB Connection Established Successfully ...`)
      console.log('---------------------------------------------')
    } catch (error) {
      console.log(`DB ERROR ${error} :(`)
    }
  }

  private async startGraphql() {
    const schema = await generateSchema('targetSchema.graphql')
    const server = new ApolloServer({ context: async ({ req, res }) => await createContext(req, res), schema })
    await server.start()
    server.applyMiddleware({ app: this.app })
  }

  private listen() {
    this.app.listen({ port: this.port }, (): void => {
      console.log('--------------------------------------------------------------')
      console.log(`🚀GraphQL-Server is running on http://localhost:${this.port}/graphql`)
      console.log('--------------------------------------------------------------')
    })
  }

  private async seeds() {
    try {
      if (process?.env.SEED_ENABLED === 'true') {
        await User.sync({ force: true })
        await User.bulkCreate(USER_DATA)
        await Product.sync({ force: true })
        await Product.bulkCreate(PRODUCTS_DATA)

        console.log('--------------------------------------------------------------')
        console.log('Seed Ended Successfully')
        console.log('--------------------------------------------------------------')
      }
    } catch (error) {
      console.log(`Seed Error: ${error}`)
    }
  }

  initilizeServer = async () => {
    this.establishDBConnection()
    await this.startGraphql()
    this.listen()
    await this.seeds()
  }
}

new Server(process?.env.PORT, express())
