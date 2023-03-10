import { Resolver, Query, Arg } from 'type-graphql'

import { Team } from './typedefs/Team'

@Resolver((_of) => Team)
export class TeamResolver {
  @Query((_returns) => Team)
  public async team(@Arg('id') id: string): Promise<Team> {
    return Promise.resolve({
      id,
    })
  }
}
