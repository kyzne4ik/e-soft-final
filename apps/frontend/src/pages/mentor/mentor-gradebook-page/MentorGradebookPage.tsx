import { useState } from "react";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { MentorStreamsSidebar } from "../mentor-review-board-page/ui/MentorStreamsSidebar";
import { JournalTable } from "./ui/JournalTable";
import css from "./MentorGradebookPage.module.css";

function GradebookWorkspace({
  streamId,
  streamName,
}: {
  streamId: number;
  streamName: string;
}) {
  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{streamName}</span>
      </div>
      <div className={css.workspace_body}>
        <JournalTable key={streamId} streamId={streamId} />
      </div>
    </div>
  );
}

export default function MentorGradebookPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <MentorStreamsSidebar
            selectedId={selectedId}
            onSelect={(id, name) => {
              setSelectedId(id);
              setSelectedName(name ?? "");
            }}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>

      <SplitView.Workspace>
        {selectedId == null ? (
          <div className={css.empty}>Выберите поток слева</div>
        ) : (
          <GradebookWorkspace
            key={selectedId}
            streamId={selectedId}
            streamName={selectedName}
          />
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
