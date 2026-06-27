import { MailConfig } from "@config";
import { createTransport } from "nodemailer";

export const mailTransport = createTransport({
  host: MailConfig.MAIL_HOST,
  port: MailConfig.MAIL_PORT,
  secure: MailConfig.MAIL_SECURE,
  from: MailConfig.MAIL_FROM,
  auth: {
    user: MailConfig.MAIL_USER,
    pass: MailConfig.MAIL_PASS,
  },
});
