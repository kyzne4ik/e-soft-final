import "dotenv/config";
import { bool, cleanEnv, num, str } from "envalid";

export const MailConfig = cleanEnv(process.env, {
  MAIL_HOST: str({ default: "smtp.example.com" }),
  MAIL_PORT: num({ default: 587 }),
  MAIL_SECURE: bool({ default: false }),
  MAIL_FROM: str({ default: "Smesharik <your_email>@example.com" }),
  MAIL_USER: str({ default: "your_email@example.com" }),
  MAIL_PASS: str({ default: "your_email_password" }),
});
