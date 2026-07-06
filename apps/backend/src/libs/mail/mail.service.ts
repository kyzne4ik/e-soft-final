import { logger } from "@utils";
import { FastifyBaseLogger } from "fastify";
import { IMailService } from "./mail.types";
import { mailTransport } from "./mail.transport";
import type { SendMailOptions, Transporter } from "nodemailer";

export class MailService implements IMailService {
  constructor(
    private transport: Transporter,
    private logger: FastifyBaseLogger,
  ) {}

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      await this.transport.sendMail(options);
      this.logger.info(`Активация почты отправлена на ${options.to}`);
    } catch (error) {
      this.logger.error(`Ошибка при отправке активации почты на ${options.to}`);
      throw new Error("Failed to send activation email", { cause: error });
    }
  }
}

export const mailService = new MailService(mailTransport, logger);
