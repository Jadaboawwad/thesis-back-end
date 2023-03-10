import { FindOptions } from 'sequelize/types'

import { ProductOrm } from './ProductOrm'

import { Product } from '../../../../db/models/product.model'
import { CreateProductArgs } from '../typedefs'
import { UpdateProductArgs } from '../typedefs/UpdateProductArgs'

class ProductRepository {
  public getProductById = this._getProductById.bind(this)
  public getProducts = this._getProducts.bind(this)
  public createProduct = this._createProduct.bind(this)
  public deleteProduct = this._deleteProduct.bind(this)
  public updateProduct = this._updateProduct.bind(this)

  private async _getProducts(where: FindOptions): Promise<ProductOrm[]> {
    const products = await Product.findAll(where)
    return products
  }

  private async _getProductById(id: string): Promise<ProductOrm | null> {
    const product = await Product.findOne({ where: { id } })
    return product
  }

  private async _createProduct(args: CreateProductArgs): Promise<ProductOrm | null> {
    const product = await Product.create(args)
    return product
  }

  private async _deleteProduct(id: string): Promise<ProductOrm | null> {
    const product = await Product.findOne({ where: { id } })
    await Product.destroy({ where: { id } })
    return product
  }

  private async _updateProduct(args: UpdateProductArgs): Promise<[number, Product[]]> {
    const { description, id, imageUrl, name, selectedId } = args

    const product = await Product.update(
      {description, id, imageUrl, name },
      {
        where: {
          id: selectedId,
        },
      }
    )
    return product
  }
}

export { ProductRepository }
