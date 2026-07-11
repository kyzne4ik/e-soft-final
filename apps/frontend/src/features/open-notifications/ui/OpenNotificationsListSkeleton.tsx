import css from "./OpenNotificationsList.module.css";

function NotificationBannerSkeleton() {
  return <div className={css.on_list__skeleton} aria-hidden />;
}

export function OpenNotificationsListSkeleton() {
  return (
    <div className={css.on_list__skeleton_wrap}>
      <NotificationBannerSkeleton />
      <NotificationBannerSkeleton />
      <NotificationBannerSkeleton />
    </div>
  );
}
