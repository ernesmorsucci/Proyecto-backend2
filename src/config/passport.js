import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from '../config/environment.js'
import { createHash, isValidPassword } from '../utils.js';
import { createUser, findUserByEmail, setTokenData } from '../services/api/users.service.js';

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
      if(await findUserByEmail(username)) throw new Error("User already registered");
      
      password = createHash(password);
      const newUser = await createUser(req.body, password);
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
      const user = await findUserByEmail(username);
      if(!user) throw new Error("User not found");

      if(user){
        if(isValidPassword(password, user.password)){
          const tokenData = await setTokenData(user);
          return done(null, tokenData);
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