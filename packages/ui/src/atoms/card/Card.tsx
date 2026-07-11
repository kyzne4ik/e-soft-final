import type { HTMLAttributes } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Card.module.css";

export type CardVariant = "default" | "lesson" | "stat";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "default", className, ...rest }: CardProps) {
  return (
    <div
      className={classNames(
        css.ui_card,
        { [css.ui_card__clickable]: Boolean(rest.onClick) },
        [css[`ui_card__${variant}`], className],
      )}
      {...rest}
    />
  );
}
