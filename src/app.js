import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})