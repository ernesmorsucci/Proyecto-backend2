export class UsersDTO {
  setSessionUserData(user){
    const userData = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      cartId: user.cartId,
      role: user.role
    }
    return userData;
  }
}