import { getAllProducts, getProductById } from "../services/api/products.service.js";
import { verifyToken } from "../utils.js";

export async function renderHome(req, res){
  try{
    const products = await getAllProducts();
    if(products.length === 0) return res.status(404).render('error', { message: "No products found", status: 404 });

    res.status(200).render('home', { products });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderProductDetails(req, res){
  try{
    const { id } = req.params;
    const product = await getProductById(id);
    if(!product) return res.status(404).render('error', { message: "Product not found", status: 404 });

    const token = req.cookies.jwt;
    if(token){
      const user = verifyToken(token);
      return res.render('product-details', { product, user });
    }

    res.render('product-details', { product });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderRegister(req, res){
  try{
    res.render('register');
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderLogin(req, res){
  try{
    if(req.cookies.jwt) return res.redirect('/profile');
    res.render('login');
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderProfile(req, res){
  try{
    const token = req.cookies.jwt;
    if(!token) return res.redirect('/login');
    
    const user = verifyToken(token);
    if (user.role === "admin") {
      const isAdmin = true;
      return res.render('profile', { user, isAdmin });
    }
    res.render('profile', { user });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderRecoverPasswordForm(req, res){
  try{
    res.render('recover-password-form');
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function renderChangePasswordForm(req, res){
  try{
    const { email } = req.query;
    res.render('change-password-form', { email });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

export async function adminProducts(req, res){
  try{
    const token = req.cookies.jwt;
    if(!token) return res.redirect('/login');

    const user = verifyToken(token);
    if(user.role !== 'admin') return res.status(403).render('error', { message: "Access denied", status: 403 });

    res.render('admin-products', { user, isAdmin: true });
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}

// export async function renderError(req, res){
//   res.render('error', { message: "Page not found", status: 404 });
// }