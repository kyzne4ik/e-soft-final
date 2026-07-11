import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MailConfig } from "@config";
import type { Role } from "@repo/schemas";
import type { SendMailOptions } from "nodemailer";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const INVITE_STAFF_TEMPLATE = readFileSync(
  join(CURRENT_DIR, "invite-staff.html"),
  "utf-8",
);

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  MENTOR: "Ментор",
  STUDENT: "Студент",
};

export const inviteStaffOptions = (to: string, link: string, role: Role) =>
  ({
    from: MailConfig.MAIL_FROM,
    to,
    subject: "Приглашение в ESOFT Learn",
    html: INVITE_STAFF_TEMPLATE.replaceAll("{{link}}", link).replaceAll(
      "{{roleLabel}}",
      ROLE_LABELS[role],
    ),
  }) satisfies SendMailOptions;
