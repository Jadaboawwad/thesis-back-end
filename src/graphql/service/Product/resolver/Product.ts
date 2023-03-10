import { ApolloError } from 'apollo-server-express'
import { Resolver, Query, Arg, Ctx, Mutation, Args } from 'type-graphql'

import {
  QueryProductResponse,
  QueryProductsResponse,
  CreateProductArgs,
  DeleteProductArgs,
  UpdateProductArgs,
} from './../typedefs'

import { SharedContext } from '../../../shared/context/SharedContext'

@Resolver((_of) => QueryProductsResponse)
export class ProductResolver {
  @Query((_returns) => QueryProductsResponse, { description: 'Query for a list of Products' })
  public async getAllProducts(@Ctx() { services }: SharedContext): Promise<QueryProductsResponse> {
    try {
      const products = await services.productRepository.getProducts()
      return { products }
    } catch (error) {
      throw new ApolloError(`${error}`)
    }
  }

  @Query((_returns) => QueryProductResponse, { description: 'Query for a product in Products list' })
  public async getProduct(@Arg('id') id: string, @Ctx() { services }: SharedContext): Promise<QueryProductResponse> {
    const product = await services.productRepository.getProductById(id)
    return { product }
  }

  @Mutation((_returns) => QueryProductResponse, { description: 'Mutate for a product and create it' })
  public async createProduct(
    @Args() args: CreateProductArgs,
    @Ctx() { services }: SharedContext
  ): Promise<QueryProductResponse> {
    const product = await services.productRepository.createProduct({ ...args })
    return { product }
  }

  @Mutation((_returns) => String, { description: 'Mutate for a product and delete it' })
  public async deleteProduct(@Args() args: DeleteProductArgs, @Ctx() { services }: SharedContext): Promise<string> {
    await services.productRepository.deleteProduct(args.id)
    return `product ${args.id} have been deleted`
  }

  @Mutation((_returns) => String, { description: 'Mutate for a product and update it' })
  public async updateProduct(
    @Args() args: UpdateProductArgs,
    @Ctx() { services }: SharedContext
  ): Promise<string> {
    await services.productRepository.updateProduct({ ...args })
    return `product ${args.id} have been updated`
  }
}
