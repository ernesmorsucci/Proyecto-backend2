import express from 'express';
import { engine } from 'express-handlebars';
import { env } from './config/environment.js'
import MongoSingleton from './database/db.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassport } from './config/passport.js';
import { serverRoot } from './utils.js';
import userRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = env.PORT;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', serverRoot + '/views');

app.use(express.json());
app.use(express.static(serverRoot + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));

initializePassport();
app.use(passport.initialize());

//routes
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  MongoSingleton.getInstance();
});