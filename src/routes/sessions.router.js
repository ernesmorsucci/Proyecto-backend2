import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils.js'
import { passportCall } from '../config/passport.js';

const sessionsRouter = Router();

sessionsRouter.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {

  // generamos el token y lo enviamos por una cookie
  const token = generateToken({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role
  });

  res.cookie('jwt', token, { httpOnly: true})
    .status(200).redirect('/profile');
});

// ruta logout
sessionsRouter.get('/logout', async (req, res) => {
  res.clearCookie('jwt').redirect('/login');
});

sessionsRouter.use(passportCall());

// ruta para obtener los datos del usuario actual
sessionsRouter.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.status(200).json({ status: "success", payload: req.user });
});

export default sessionsRouter;