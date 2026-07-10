import { Fragment, type ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./NavBar.module.css";

export interface NavBarRenderMeta {
  index: number;
  isActive: boolean;
}

export interface NavBarProps<T> {
  items: readonly T[];
  renderItem: (item: T, meta: NavBarRenderMeta) => ReactNode;
  activeIndex?: number;
  logo?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function NavBar<T>({
  items,
  renderItem,
  activeIndex,
  logo,
  footer,
  className,
}: NavBarProps<T>) {
  return (
    <nav className={classNames(css.ui_navbar, {}, [className])}>
      {logo ? <div className={css.ui_navbar__logo}>{logo}</div> : null}
      <div className={css.ui_navbar__items}>
        {items.map((item, index) => (
          <Fragment key={index}>
            {renderItem(item, { index, isActive: index === activeIndex })}
          </Fragment>
        ))}
      </div>
      {footer ? <div className={css.ui_navbar__footer}>{footer}</div> : null}
    </nav>
  );
}
