import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MailConfig } from "@config";
import type { SendMailOptions } from "nodemailer";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const REJECTION_TEMPLATE = readFileSync(
  join(CURRENT_DIR, "rejection.html"),
  "utf-8",
);

export const rejectionOptions = (to: string, firstName: string) =>
  ({
    from: MailConfig.MAIL_FROM,
    to,
    subject: "Заявка отклонена",
    html: REJECTION_TEMPLATE.replaceAll("{{firstName}}", firstName),
  }) satisfies SendMailOptions;
