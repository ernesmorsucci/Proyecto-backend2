import { Router } from "express";
import { verifyToken } from "../utils.js";

const viewsRouter = Router();

viewsRouter.get('/register', async (req, res) => {
  res.render('register');
});

viewsRouter.get('/login', async (req, res) => {
  if(req.cookies.jwt) return res.redirect('/profile');
  res.render('login');
});

viewsRouter.get('/profile', async (req, res) => {
  try {
    if(!req.cookies.jwt) return res.redirect('/login');
    const user = verifyToken(req.cookies.jwt);
    res.render('profile', { user });
  } catch (error) {
    res.redirect('/login');
  }
});

export default viewsRouter;