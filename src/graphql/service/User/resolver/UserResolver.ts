import { ApolloError } from 'apollo-server-express'
import { Resolver, Query, Arg, Ctx } from 'type-graphql'

import { SharedContext } from '../../../shared/context'
import { QueryUserResponse, QueryUsersResponse } from '../typedefs'

@Resolver((_of) => QueryUsersResponse)
export class UserResolver {
  @Query((_returns) => QueryUsersResponse, {
    description: 'Query for a list of User',
  })
  public async getAllUsers(@Ctx() { services }: SharedContext): Promise<QueryUsersResponse> {
    try {
      const users = await services.userRepository.getUsers({
        where: {
          is_banned: false,
        },
      })

      return { users }
    } catch (error) {
      throw new ApolloError(`${error}`)
    }
  }

  @Query((_returns) => QueryUserResponse)
  public async getUser(@Arg('id') id: string, @Ctx() { services }: SharedContext): Promise<QueryUserResponse> {
    const user = await services.userRepository.getUserById(id)
    return { user }
  }
}
