import { cartModel } from '../../carts.model.js';

export class CartsDAO {
  async create(){
    return await cartModel.create({ products: [] });
  }
}