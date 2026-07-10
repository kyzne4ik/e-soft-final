import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import type { LeadResponse } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useResendLeadInvite } from "../model/useResendLeadInvite";

const DEFAULT_TTL_SECONDS = 86400;

export interface ResendLeadInviteButtonProps {
  lead: LeadResponse;
}

export function ResendLeadInviteButton({ lead }: ResendLeadInviteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { resendInvite, isPending } = useResendLeadInvite({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Инвайт отправлен повторно" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Не удалось переслать инвайт",
      });
    },
  });

  const handleConfirm = () => {
    resendInvite({
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
      patronymic: lead.patronymic,
      role: "STUDENT",
      targetStreamId: lead.targetStreamId,
      ttlSeconds: DEFAULT_TTL_SECONDS,
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={onOpen}>
        <Icon name="send" size={16} />
        Переслать инвайт
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Повторная отправка инвайта"
        description={
          <>
            Переслать приглашение на «{lead.email}»? Прежняя ссылка активации
            перестанет действовать.
          </>
        }
        confirmLabel="Переслать"
        isPending={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
