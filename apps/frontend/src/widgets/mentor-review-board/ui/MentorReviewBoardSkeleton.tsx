import { STATUS_COLUMNS } from "../model/board";
import css from "./MentorReviewBoard.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";

const CARDS_PER_COLUMN = 3;

export function MentorReviewBoardSkeleton() {
  return (
    <div className={css.board}>
      <div className={css.skeleton}>
        {STATUS_COLUMNS.map((column) => (
          <div key={column.id} className={css.skeleton_column}>
            <div className={css.skeleton_header}>
              <Skeleton width={120} height={28} border="var(--radius-pill)" />
              <Skeleton width={20} height={20} border="6px" />
            </div>
            <div className={css.skeleton_cards}>
              {Array.from({ length: CARDS_PER_COLUMN }).map((_, index) => (
                <Skeleton
                  key={index}
                  width="100%"
                  height={92}
                  border="var(--radius-lg)"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
