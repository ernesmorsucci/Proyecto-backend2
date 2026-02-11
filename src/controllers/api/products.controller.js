import { getAllProducts, getProductById, createProduct, deleteProduct  } from "../../services/api/products.service.js";

export async function addNewProduct(req, res){
  try{
    const productData = req.body;
    const newProduct = await createProduct(productData);
    res.status(201).redirect(`/products/${newProduct._id}`);
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function fetchProducts(req, res){
  try{
    const products = await getAllProducts();
    if(products.length === 0) return res.status(404).json({ status: "error", message: "No products found" });
    res.status(200).json({ status: "success", payload: products });
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function fetchProductById(req, res){
  try{
    const { id } = req.params;

    const product = await getProductById(id);
    if(!product) return res.status(404).json({ status: "error", message: "Product not found" });

    res.status(200).json({ status: "success", payload: product });
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function removeProduct(req, res){
  try{
    const { id } = req.params;

    const deletedProduct = await deleteProduct(id);
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "Product not found" });

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}