import { FindOptions } from 'sequelize/types'

import { UserOrm } from './UserOrm'

import { User } from '../../../../db/models/user.model'

class UserRepository {
  public getUserById = this._getUserById.bind(this)
  public getUsers = this._getUsers.bind(this)

  private async _getUsers(where: FindOptions): Promise<UserOrm[]> {
    const users = await User.findAll(where)
    return users;
  }

  private async _getUserById(id: string): Promise<UserOrm | null> {
    const user = await User.findOne({ where: { id } })

    return user
  }
}

export { UserRepository }
