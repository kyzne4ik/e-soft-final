import { Modal } from "@repo/ui/organisms/modal";
import { Icon } from "@repo/ui/atoms/icon";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import { useLeadDetails } from "../model/useLeadDetails";
import {
  leadFullName,
  leadInitials,
  leadAvatarColor,
  leadSub,
} from "../model/formatters";
import css from "./LeadDetailsModal.module.css";

export interface LeadDetailsModalProps {
  leadId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailsModal({
  leadId,
  isOpen,
  onClose,
}: LeadDetailsModalProps) {
  const { lead, streamName, isLoading } = useLeadDetails(leadId);

  const title = lead ? leadFullName(lead) : "Заявка";
  const sub = lead ? leadSub(lead) : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      sub={sub}
      size="default"
    >
      <Modal.Body>
        {isLoading || !lead ? (
          <div className={css.body}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={24} border="var(--radius-sm)" />
            ))}
          </div>
        ) : (
          <div className={css.body}>
            <div className={css.contact_block}>
              <Avatar
                person={{
                  name: leadFullName(lead),
                  initials: leadInitials(lead),
                  color: leadAvatarColor(lead.id),
                }}
                size={44}
              />

              <div className={css.contacts}>
                <div className={css.contacts_row}>
                  <a className={css.contact} href={`mailto:${lead.email}`}>
                    <Icon name="mail" size={15} />
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <a className={css.contact} href={`tel:${lead.phone}`}>
                      <Icon name="phone" size={15} />
                      {lead.phone}
                    </a>
                  )}
                </div>
                {lead.telegram && (
                  <div className={css.contacts_row}>
                    <span className={css.contact}>
                      <Icon name="send" size={15} />
                      {lead.telegram}
                    </span>
                  </div>
                )}
              </div>

              <span className={css.badge}>
                <StatusBadge status={lead.status} kind="lead" />
              </span>
            </div>

            {streamName && (
              <div className={css.section}>
                <span className={css.section_label}>Поток</span>
                <p className={css.section_text}>{streamName}</p>
              </div>
            )}

            <div className={css.section}>
              <span className={css.section_label}>Опыт и мотивация</span>
              <p className={css.section_text}>
                {lead.experience || (
                  <span className={css.muted}>Кандидат не указал опыт.</span>
                )}
              </p>
            </div>

            <div className={css.section}>
              <span className={css.section_label}>Тестовое задание</span>
              {lead.testResult ? (
                <a
                  className={css.link}
                  href={lead.testResult}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть решение <Icon name="external-link" size={13} />
                </a>
              ) : (
                <p className={css.section_text}>
                  <span className={css.muted}>
                    Кандидат ещё не прислал решение тестового задания.
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
