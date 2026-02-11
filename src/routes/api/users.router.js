import { Router } from "express";
import passport from "passport";
import { registerUser, changePassword } from "../../controllers/api/users.controller.js";

const userRouter = Router();

// ruta de registro de usuarios
userRouter.post('/register', passport.authenticate('register', { session: false }), registerUser);

// ruta para cambiar contraseña
userRouter.post('/change-password', changePassword);

export default userRouter;