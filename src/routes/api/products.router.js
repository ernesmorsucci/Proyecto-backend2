import { Router } from "express";
import { fetchProductById, fetchProducts, addNewProduct, removeProduct } from "../../controllers/api/products.controller.js";

const productsRouter = Router();

productsRouter.get('/', fetchProducts);

productsRouter.get('/:id', fetchProductById);

productsRouter.post('/', addNewProduct);

productsRouter.delete('/:id', removeProduct);

export default productsRouter;