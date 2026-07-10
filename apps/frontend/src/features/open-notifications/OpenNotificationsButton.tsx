import { useQuery } from "@tanstack/react-query";
import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { CountBadge } from "@/shared/ui/count-badge";
import { unreadCountQuery } from "@/entities/notifications/queries";
import { OpenNotificationsModal } from "./OpenNotificationsModal";
import css from "./OpenNotificationsModal.module.css";

export function OpenNotificationsButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery(unreadCountQuery());
  const unreadCount = data?.count ?? 0;

  return (
    <>
      <div className={css.on_button__wrap}>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          aria-label="Уведомления"
          onClick={onOpen}
        >
          <Icon name="bell" size={20} />
        </Button>
        <CountBadge
          count={unreadCount}
          isLoading={isLoading}
          className={css.on_button__badge}
          aria-label={`Непрочитанных уведомлений: ${unreadCount}`}
          onClick={onOpen}
        />
      </div>
      <OpenNotificationsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
