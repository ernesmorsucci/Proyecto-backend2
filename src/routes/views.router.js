import { Router } from "express";
import { verifyToken } from "../utils.js";

const viewsRouter = Router();

viewsRouter.get('/register', async (req, res) => {
  try{
    res.render('register');
  } catch(error){
    console.log(error.message)
  }
});

viewsRouter.get('/login', async (req, res) => {
  res.render('login');
});

viewsRouter.get('/profile', async (req, res) => {
  try {
    const user = verifyToken(req.cookies.jwt);
    res.render('profile', { user });
  } catch (error) {
    res.redirect('/login');
  }
});

export default viewsRouter;