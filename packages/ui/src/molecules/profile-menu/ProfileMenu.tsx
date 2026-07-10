import { useEffect, useRef, useState, type ReactNode } from "react";
import { createStrictContext, useStrictContext } from "../../libs/react/react";
import { classNames } from "../../libs/classNames";
import { Avatar, type AvatarPerson } from "../../atoms/avatar";
import { Icon } from "../../atoms/icon";
import css from "./ProfileMenu.module.css";

const ProfileMenuContext = createStrictContext<{ close: () => void }>();

export interface ProfileMenuProps {
  person: AvatarPerson;
  children: ReactNode;
  className?: string;
}

export function ProfileMenu({ person, children, className }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={classNames(css.ui_profile, {}, [className])}>
      <button
        type="button"
        className={css.ui_profile__pill}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Avatar person={person} size={32} />
      </button>
      {isOpen ? (
        <ProfileMenuContext.Provider value={{ close: () => setIsOpen(false) }}>
          <div className={css.ui_profile__menu} role="menu">
            {children}
          </div>
        </ProfileMenuContext.Provider>
      ) : null}
    </div>
  );
}

export interface ProfileMenuItemProps {
  icon?: string;
  danger?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

ProfileMenu.Item = function ProfileMenuItem({
  icon,
  danger,
  onClick,
  children,
}: ProfileMenuItemProps) {
  const ctx = useStrictContext(ProfileMenuContext);

  const handleClick = () => {
    ctx.close();
    onClick?.();
  };

  return (
    <button
      type="button"
      role="menuitem"
      className={classNames(css.ui_profile__item, {
        [css.ui_profile__item__danger]: Boolean(danger),
      })}
      onClick={handleClick}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
    </button>
  );
};
