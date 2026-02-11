import { Router } from 'express';
import passport from 'passport';
// import { passportCall } from '../config/passport.js';
import { setSession, dropSession, getCurrentSession  } from '../../controllers/api/sessions.controller.js';

const sessionsRouter = Router();

sessionsRouter.post('/login', passport.authenticate('login', { session: false }), setSession);

sessionsRouter.get('/logout', dropSession);

sessionsRouter.get('/current', passport.authenticate('jwt', { session: false }), getCurrentSession);

export default sessionsRouter;