import { Router } from "express";
import passport from "passport";

const userRouter = Router();

userRouter.get('/failure-register', async(req, res) => {
  res.status(400).json({ status: "error", message: "Registration failed" });
});

userRouter.post('/register',
passport.authenticate('register', { session: false }),
async (req, res) => {
  res.status(201).redirect('/login');
});

export default userRouter;