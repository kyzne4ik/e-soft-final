import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import type { UserResponse } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useResendInvite } from "../model/useResendInvite";

const DEFAULT_TTL_SECONDS = 86400;

export interface ResendInviteButtonProps {
  user: UserResponse;
}

export function ResendInviteButton({ user }: ResendInviteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { resendInvite, isPending } = useResendInvite({
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
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      role: user.role,
      ttlSeconds: DEFAULT_TTL_SECONDS,
    });
  };

  return (
    <>
      <Tooltip text="Переслать инвайт" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Переслать инвайт"
          onClick={onOpen}
        >
          <Icon name="send" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Повторная отправка инвайта"
        description={
          <>
            Переслать приглашение на «{user.email}»? Прежняя ссылка активации
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
