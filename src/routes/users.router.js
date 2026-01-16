import { Router } from "express";
import passport from "passport";

const userRouter = Router();

// ruta de registro de usuarios
userRouter.post('/register',
passport.authenticate('register', { session: false }),
async (req, res) => {
  res.status(201).redirect('/login');
});

export default userRouter;