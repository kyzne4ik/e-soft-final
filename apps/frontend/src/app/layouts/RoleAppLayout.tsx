import { Outlet, useLocation, useNavigate } from "react-router";
import { NavBar, NavBarItem } from "@repo/ui/organisms/nav-bar";
import { Header } from "@/widgets/header";
import type { NavItem } from "./navConfig";
import css from "./RoleAppLayout.module.css";

export interface RoleAppLayoutProps {
  nav: NavItem[];
}

export function RoleAppLayout({ nav }: RoleAppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = nav.findIndex((item) => item.path === location.pathname);
  const title = activeIndex >= 0 ? nav[activeIndex].label : undefined;

  return (
    <div className={css.shell}>
      <div className={css.sidebar}>
        <NavBar
          items={nav}
          activeIndex={activeIndex}
          logo={<div className={css.logo}>E</div>}
          renderItem={(item, { isActive }) => (
            <NavBarItem
              icon={item.icon}
              tooltip={item.label}
              active={isActive}
              onClick={() => navigate(item.path)}
            />
          )}
        />
      </div>
      <div className={css.main}>
        <div className={css.header}>
          <Header title={title} />
        </div>
        <main className={css.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
