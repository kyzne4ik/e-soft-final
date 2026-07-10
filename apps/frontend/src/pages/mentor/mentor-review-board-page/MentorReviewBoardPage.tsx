import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./MentorReviewBoardPage.module.css";
import { SplitView } from "@repo/ui/layouts/split-view";
import { myMentorStreamsQuery } from "@/entities/streams";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { MentorStreamsSidebar } from "./ui/MentorStreamsSidebar";
import { MentorReviewBoard } from "@/widgets/mentor-review-board";

function ReviewWorkspace({ streamId }: { streamId: number | null }) {
  const { data } = useQuery(myMentorStreamsQuery());
  const streams = data?.data ?? [];

  const title =
    streamId == null
      ? "Мои студенты"
      : (streams.find((stream) => stream.id === streamId)?.name ?? "Поток");

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{title}</span>
      </div>
      <div className={css.workspace_body}>
        {streamId != null ? (
          <MentorReviewBoard streamId={streamId} />
        ) : (
          <div className={css.empty}>Нет доступных потоков</div>
        )}
      </div>
    </div>
  );
}

export default function MentorReviewBoardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <MentorStreamsSidebar
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        <ReviewWorkspace streamId={selectedId} />
      </SplitView.Workspace>
    </SplitView>
  );
}
