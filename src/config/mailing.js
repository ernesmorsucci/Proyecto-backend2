import nodemailer from "nodemailer";
// import dns from "dns";
import { env } from "./environment.js";

// dns.setDefaultResultOrder("ipv4first");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MAILING_ACCOUNT,
    pass: env.MAILING_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});