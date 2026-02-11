import { UsersDAO } from "../../models/dao/mongoose/users.dao.js";
import { CartsDAO } from "../../models/dao/mongoose/carts.dao.js";
import { UsersDTO } from "../../models/dto/users.dto.js";
import { createHash } from "../../utils.js";

const usersDao = new UsersDAO();
const cartsDao = new CartsDAO();
const usersDto = new UsersDTO();

export async function createUser(userData, hashedPassword){
  const cart = await cartsDao.create();
  return await usersDao.create(userData, hashedPassword, cart._id);
}

export async function findUserByEmail(email){
  return await usersDao.getByEmail(email);
}

export async function setTokenData(user){
  return usersDto.setSessionUserData(user);
}

export async function updateUserPassword(email, newPassword){
  const newHashedPassword = createHash(newPassword)

  //validamos que la nueva contraseña no sea igual a la actual
  if(usersDao.getByEmail(email).password === newHashedPassword) throw new Error("New password cannot be the same as the current password");

  return await usersDao.update(email, { password: newHashedPassword });
}