import mongoose from "mongoose";
import { env } from "../config/environment.js"

export default class MongoSingleton {
  static #instance;

  constructor(){
    mongoose.connect(env.MONGO_URI);
  }

  static getInstance(){
    if(this.#instance){
      console.log("MongoDB already connected");
      return this.#instance;
    }

    this.#instance = new MongoSingleton();
    console.log("MongoDB succesfully connected");
    return this.#instance;
  }
}