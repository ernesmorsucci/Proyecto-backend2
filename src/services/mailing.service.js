import { transporter } from "../config/mailing.js";
import { env } from "../config/environment.js";

export async function recoverPasswordMail(destiny){
  await transporter.sendMail({
    from: `Ecommerce app <${env.MAILING_ACCOUNT}>`,
    to: destiny,
    subject: "Recuperación de contraseña",
    expire: 3600000, // 1 hora
    html: `
    <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>

    <a href="http://localhost:${env.PORT}/change-password-form?email=${destiny}">Recuperar contraseña</a>`
  });
}