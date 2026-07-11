import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import { Tooltip } from "../../molecules/tooltip";
import type { TooltipPosition } from "../../molecules/tooltip";
import css from "./NavBar.module.css";

export interface NavBarItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  icon: string;
  tooltip: ReactNode;
  active?: boolean;
  tooltipPosition?: TooltipPosition;
}

export function NavBarItem({
  icon,
  tooltip,
  active = false,
  tooltipPosition = "right",
  className,
  ...rest
}: NavBarItemProps) {
  return (
    <Tooltip text={tooltip} position={tooltipPosition}>
      <button
        type="button"
        className={classNames(
          css.ui_navitem,
          { [css.ui_navitem__active]: active },
          [className],
        )}
        aria-current={active ? "page" : undefined}
        aria-label={typeof tooltip === "string" ? tooltip : undefined}
        {...rest}
      >
        <Icon name={icon} size={22} />
      </button>
    </Tooltip>
  );
}
