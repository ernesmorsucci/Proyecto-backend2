import { recoverPasswordMail } from "../services/mailing.service.js"

export async function recoverPassword(req, res){
  try{
    const { email } = req.query;
    await recoverPasswordMail(email);
    res.status(200).redirect('/login');
  } catch(error){
    return res.status(500).json({ message: error.message });
  }
}