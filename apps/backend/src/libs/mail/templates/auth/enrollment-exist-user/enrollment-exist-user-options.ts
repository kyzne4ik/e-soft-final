import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MailConfig } from "@config";
import type { SendMailOptions } from "nodemailer";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const ENROLLMENT_EXIST_USER_TEMPLATE = readFileSync(
  join(CURRENT_DIR, "enrollment-exist-user.html"),
  "utf-8",
);

export const enrollmentExistUserOptions = (
  to: string,
  confirmLink: string,
  streamName: string,
  firstName: string,
) =>
  ({
    from: MailConfig.MAIL_FROM,
    to,
    subject: `Вас приняли в поток «${streamName}» — подтвердите участие`,
    html: ENROLLMENT_EXIST_USER_TEMPLATE.replaceAll(
      "{{confirmLink}}",
      confirmLink,
    )
      .replaceAll("{{firstName}}", firstName)
      .replaceAll("{{streamName}}", streamName),
  }) satisfies SendMailOptions;
