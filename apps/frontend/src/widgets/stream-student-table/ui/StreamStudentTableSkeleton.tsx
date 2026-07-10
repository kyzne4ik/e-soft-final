import css from "./StreamStudentTable.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";

export function StreamStudentTableSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={css.skeleton_row}>
          <Skeleton width={30} height={30} border="var(--radius-circle)" />
          <Skeleton width={160} height={14} border="6px" />
          <Skeleton width={120} height={14} border="6px" />
          <Skeleton width={120} height={30} border="8px" />
        </div>
      ))}
    </div>
  );
}
