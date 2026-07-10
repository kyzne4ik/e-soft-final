import { Button, type ButtonProps } from "@repo/ui/atoms/button";
import css from "./CountBadge.module.css";

export interface CountBadgeProps extends Omit<
  ButtonProps,
  "children" | "isPending" | "isIconOnly"
> {
  count: number;
  isLoading?: boolean;
  max?: number;
}

export function CountBadge({
  count,
  isLoading = false,
  max = 99,
  size = "sm",
  variant = "primary",
  className,
  ...rest
}: CountBadgeProps) {
  if (!isLoading && count <= 0) return null;

  const label = count > max ? `${max}+` : String(count);

  return (
    <Button
      size={size}
      variant={variant}
      isIconOnly
      isPending={isLoading}
      disableRipple
      className={className ? `${css.badge} ${className}` : css.badge}
      {...rest}
    >
      {label}
    </Button>
  );
}
