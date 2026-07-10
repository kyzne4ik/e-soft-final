import { Icon } from "@repo/ui/atoms/icon";
import { useLogout } from "../model/useLogout";
import { Button } from "@repo/ui/atoms/button";
import type { ButtonProps } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";

export interface LogoutButtonProps extends Omit<
  ButtonProps,
  "type" | "children" | "isPending" | "onClick"
> {
  label?: string;
}

export function LogoutButton({
  label = "Выйти",
  variant = "secondary",
  size = "md",
  ...rest
}: LogoutButtonProps) {
  const { logout } = useLogout();

  return (
    <Tooltip text={label} position="bottom">
      <Button
        type="button"
        variant={variant}
        size={size}
        isIconOnly
        aria-label={label}
        onClick={() => logout()}
        {...rest}
      >
        <Icon name="log-out" size={18} />
      </Button>
    </Tooltip>
  );
}
