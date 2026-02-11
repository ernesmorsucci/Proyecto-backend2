import { ProductsDAO } from "../../models/dao/mongoose/products.dao.js";

const productsDao = new ProductsDAO();

export async function createProduct(productData){
  return await productsDao.create(productData);
}

export async function getAllProducts(){
  return await productsDao.getAll();
}

export async function getProductById(productId){
  return await productsDao.getById(productId);
}

export async function updateProduct(productId, updates){
  return await productsDao.update(productId, updates);
}

export async function deleteProduct(productId){
  return await productsDao.delete(productId);
}