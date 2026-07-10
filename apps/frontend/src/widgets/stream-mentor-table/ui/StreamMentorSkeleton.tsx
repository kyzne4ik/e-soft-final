import { Skeleton } from "@repo/ui/atoms/skeleton";
import css from "./StreamMentorTable.module.css";

export function StreamMentorSkeleton() {
  return (
    <div className={css.list}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className={css.skeleton_card}
          border="var(--radius-md)"
        />
      ))}
    </div>
  );
}
