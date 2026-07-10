import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { OpenIntakeModal } from "./OpenIntakeModal";

export interface OpenIntakeButtonProps {
  streamId: number;
}

export function OpenIntakeButton({ streamId }: OpenIntakeButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip text="Открыть приём" position="bottom">
        <Button isIconOnly aria-label="Открыть приём" onClick={onOpen}>
          <Icon name="door-open" size={18} />
        </Button>
      </Tooltip>
      <OpenIntakeModal streamId={streamId} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
