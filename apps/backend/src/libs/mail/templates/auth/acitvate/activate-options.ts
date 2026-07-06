import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MailConfig } from "@config";
import type { SendMailOptions } from "nodemailer";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const ACTIVATE_TEMPLATE = readFileSync(
  join(CURRENT_DIR, "activate.html"),
  "utf-8",
);

export const activateOptions = (to: string, link: string) =>
  ({
    from: MailConfig.MAIL_FROM,
    to,
    subject: "Активация аккаунта",
    html: ACTIVATE_TEMPLATE.replaceAll("{{link}}", link),
  }) satisfies SendMailOptions;
