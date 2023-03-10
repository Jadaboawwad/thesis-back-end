
import { ProductRepository } from '../../service/Product/repository/ProductRepository'
import { UserRepository } from '../../service/User/repository'
export interface ContextServices {
  productRepository: ProductRepository
  userRepository: UserRepository
}

export const createContextServices = async (): Promise<ContextServices> => {
  const userRepository = new UserRepository()
  const productRepository = new ProductRepository()

  return {
    productRepository,
    userRepository,
  }
}
