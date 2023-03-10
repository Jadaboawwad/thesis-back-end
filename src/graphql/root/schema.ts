import { buildFederatedSchema, printSchema } from '@apollo/federation'
import path from 'path'
import 'reflect-metadata'
import { buildSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql'

import { gql } from 'graphql-tag'

import { LogResolver } from '../service/Log/LogResolver'
import { ProductResolver } from '../service/Product/resolver/Product';
import { TeamResolver } from '../service/Team/TeamResolver'
import { UserResolver } from '../service/User/resolver/UserResolver'

const resolvers: BuildSchemaOptions['resolvers'] = [UserResolver, LogResolver, TeamResolver, ProductResolver]

const options = {
  resolvers,
}

export const generateSchema = async (schemaFile = 'targetSchema.graphql'): Promise<any> => {
  const schema = await buildSchema({
    ...options,
    emitSchemaFile: path.resolve(process.cwd(), schemaFile),
    skipCheck: true,
  })

  const federatedSchema = buildFederatedSchema({
    resolvers: createResolversMap(schema) as any,
    typeDefs: gql(printSchema(schema)),
  })

  return federatedSchema
}
