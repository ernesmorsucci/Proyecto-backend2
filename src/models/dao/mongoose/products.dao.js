import { productsModel } from "../../products.model.js";

export class ProductsDAO {
  async create(product){
    return await productsModel.create(product);
  }

  async getAll(){
    return await productsModel.find().lean();
  }

  async getById(productId){
    return await productsModel.findById(productId).lean();
  }

  async delete(productId){
    return await productsModel.findOneAndDelete(productId);
  }
}