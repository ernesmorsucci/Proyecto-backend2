import { updateUserPassword } from '../../services/api/users.service.js';

export function registerUser(req, res){
  try{
    res.status(201).redirect('/login');
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export function changePassword(req, res){
  try{
    const { email, newPassword } = req.body;
    updateUserPassword(email, newPassword);

    res.status(200).redirect('/login');
  } catch(error){
    res.status(error.status || 500).json({ status: "error", message: error.message });
  }
}