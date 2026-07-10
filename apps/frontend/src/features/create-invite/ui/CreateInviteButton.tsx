import { Button } from "@repo/ui/atoms/button";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { CreateInviteModal } from "./CreateInviteModal";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { Send } from "lucide-react";

export function CreateInviteButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip text="Отправить инвайт" position="bottom">
        <Button isIconOnly aria-label="Отправить инвайт" onClick={onOpen}>
          <Send size={24} />
        </Button>
      </Tooltip>
      <CreateInviteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
