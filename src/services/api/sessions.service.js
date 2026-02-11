import { generateToken } from "../../utils.js";

export function setSessionToken(user){
  //generamos el token de usuario
  const token = generateToken(user)
  return token;
}