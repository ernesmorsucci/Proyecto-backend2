import { userModel } from "../../users.model.js";

export class UsersDAO {  
  async getAll(){
    return await userModel.find();
  }

  async getByEmail(email){
    return await userModel.findOne({ email: email })
  }

  async create(userData, hashedPassword, cartId){
    return await userModel.create({ ...userData, password: hashedPassword, cartId });
  }

  async update(email, updateData){
    return await userModel.findOneAndUpdate({ email: email }, updateData, { new: true, runValidators: true });
  }

  async delete(email){
    return await userModel.findOneAndDelete({ email: email });
  }
}