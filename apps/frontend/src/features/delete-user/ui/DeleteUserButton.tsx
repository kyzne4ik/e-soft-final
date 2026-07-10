import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useDeleteUser } from "../model/useDeleteUser";

export interface DeleteUserButtonProps {
  userId: number;
  userName?: string;
}

export function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { deleteUser, isPending } = useDeleteUser({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Пользователь удалён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при удалении пользователя",
      });
    },
  });

  return (
    <>
      <Tooltip text="Удалить пользователя" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Удалить пользователя"
          onClick={onOpen}
        >
          <Icon name="trash-2" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление пользователя"
        description={
          <>
            Вы уверены, что хотите удалить пользователя
            {userName ? ` «${userName}»` : ""}? Это действие необратимо и может
            затронуть связанные данные.
          </>
        }
        confirmLabel="Удалить"
        tone="danger"
        isPending={isPending}
        onConfirm={() => deleteUser(userId)}
      />
    </>
  );
}
