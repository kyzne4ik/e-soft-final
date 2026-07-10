import type { ReactNode } from "react";
import { ProfileMenu } from "@repo/ui/molecules/profile-menu";
import { useAuth } from "@/features/auth";
import { useLogout } from "@/features/logout";
import { OpenSettings, useOpenSettings } from "@/features/open-settings";
import { OpenNotificationsButton } from "@/features/open-notifications";
import css from "./Header.module.css";
import { ProfileMenuSettings } from "./profile-menu-settings";

export interface HeaderProps {
  title?: ReactNode;
}

export function Header({ title }: HeaderProps) {
  const { data } = useAuth();
  const { logout } = useLogout();
  const settings = useOpenSettings();

  const user = data?.data;

  return (
    <header className={css.header}>
      <div className={css.header__titles}>
        <span className={css.header__eyebrow}>ESOFT Learn</span>
        <h1 className={css.header__title}>{title}</h1>
      </div>
      {user ? (
        <div className={css.header__actions}>
          <OpenNotificationsButton />
          <ProfileMenu
            person={{
              name: `${user.firstName} ${user.lastName}`,
              initials:
                `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase(),
              color: "var(--color-secondary)",
            }}
          >
            <OpenSettings.MenuItem onOpen={settings.onOpen} />
            <ProfileMenu.Item icon="log-out" danger onClick={() => logout()}>
              Выйти
            </ProfileMenu.Item>
          </ProfileMenu>
          <ProfileMenuSettings
            isOpen={settings.isOpen}
            onClose={settings.onClose}
          />
        </div>
      ) : null}
    </header>
  );
}
