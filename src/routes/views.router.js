import { Router } from "express";
import { renderHome, renderProductDetails, renderRegister, renderProfile, renderLogin, renderRecoverPasswordForm, renderChangePasswordForm, adminProducts } from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get('/', renderHome);

viewsRouter.get('/products/:id', renderProductDetails);

viewsRouter.get('/register', renderRegister);

viewsRouter.get('/login', renderLogin);

viewsRouter.get('/profile', renderProfile);

viewsRouter.get('/recover-password-form', renderRecoverPasswordForm);

viewsRouter.get('/change-password-form', renderChangePasswordForm);

viewsRouter.get('/admin/products', adminProducts)

// viewsRouter.get('*', renderError);

export default viewsRouter;