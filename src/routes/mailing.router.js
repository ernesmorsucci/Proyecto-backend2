import { Router } from "express";
import { recoverPassword } from "../controllers/mailing.controller.js";

const mailingRouter = Router();

mailingRouter.get("/recover-password-mail", recoverPassword);

export default mailingRouter;