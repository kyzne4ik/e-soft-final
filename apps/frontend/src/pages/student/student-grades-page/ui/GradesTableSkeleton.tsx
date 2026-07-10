import { Skeleton } from "@repo/ui/atoms/skeleton";
import css from "../StudentGradesPage.module.css";

const ROWS = 6;

export function GradesTableSkeleton() {
  return (
    <div className={css.skeleton_rows}>
      {Array.from({ length: ROWS }).map((_, i) => (
        <Skeleton key={i} height={44} border="var(--radius-sm)" />
      ))}
    </div>
  );
}
