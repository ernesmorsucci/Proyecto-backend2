import { setSessionToken } from "../../services/api/sessions.service.js";

export function setSession(req, res) {
  try{
    //generamos el token y enviamos por cookie
    const token = setSessionToken(req.user);

    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).redirect('/profile');
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export function dropSession(req, res){
  try{
    res.clearCookie('jwt').redirect('/login');
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}

export function getCurrentSession(req, res){
  try{
    res.status(200).json({ status: "success", payload: req.user });
  } catch(error){
    res.status(500).json({ status: "error", message: error.message });
  }
}