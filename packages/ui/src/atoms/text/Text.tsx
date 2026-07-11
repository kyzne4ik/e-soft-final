import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { classNames, type Mods } from "../../libs/classNames";
import css from "./Text.module.css";

export type TextAlign =
  "start" | "end" | "left" | "right" | "center" | "justify";

const alignClasses: Record<TextAlign, string> = {
  start: css.start,
  end: css.end,
  left: css.left,
  right: css.right,
  center: css.center,
  justify: css.justify,
};

export interface TextProps extends HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement
> {
  align?: TextAlign;
  noWrap?: boolean;
  onFullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

const createVariant = (
  Tag: ElementType,
  variantClass: string,
  name: string,
) => {
  const Component = ({
    align,
    noWrap,
    onFullWidth,
    className,
    children,
    ...props
  }: TextProps) => {
    const mods: Mods = {
      [css.no_wrap]: noWrap,
      [css.on_full_width]: onFullWidth,
    };

    return (
      <Tag
        className={classNames(variantClass, mods, [
          className,
          align && alignClasses[align],
        ])}
        {...props}
      >
        {children}
      </Tag>
    );
  };

  Component.displayName = `Text.${name}`;
  return Component;
};

export const Text = {
  Title: createVariant("h1", css.title, "Title"),
  H1: createVariant("h1", css.h1, "H1"),
  H2: createVariant("h2", css.h2, "H2"),
  P1: createVariant("p", css.p1, "P1"),
  P2: createVariant("p", css.p2, "P2"),
  P1Bold: createVariant("p", css.p1_medium, "P1Bold"),
  P1Link: createVariant("p", css.p1_link, "P1Link"),
  P2Link: createVariant("p", css.p2_link, "P2Link"),
};
