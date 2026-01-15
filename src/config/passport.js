import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from '../config/environment.js'
import { userModel } from '../models/users.model.js';
import { cartModel } from '../models/carts.model.js';
import { createHash, isValidPassword } from '../utils.js';

export function initializePassport(){
  //register strategy
  passport.use('register', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (req, username, password, done) => {
    try{
      if(await userModel.findOne({ email: username })) throw new Error("User already registered");
      
      password = createHash(password);
      const newCart = await cartModel.create({});
      const newUser = await userModel.create({ ...req.body, password, cartId: newCart._id });
      done(null, newUser);
    } catch(error){
      done(error, null);
    }
  }));
  
  //login strategy
  passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async (username, password, done) => {
    try{
      const user = await userModel.findOne({ email: username });
      
      if(user){
        if(isValidPassword(password, user.password)){
          return done(null, user);
        } else{
          return done(null, false);
        }
      }
    } catch(error){
      return done(error, null);
    }
  }));

  //jwt strategy
  passport.use('jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: env.JWT_SECRET
  },
  async (payload, done) => {
    done(null, payload);
  }));
}

//cookie extractor
function cookieExtractor(req){
  if(req && req.cookies) return req.cookies.jwt;
}

//custom callback
export function passportCall(){
  return async (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      if(err) return next(err);
      if(!user){
        return res.status(401).json({ error: info.toString() });
      }
      req.user = user;
      next();
    }) (req, res, next);
  }
}