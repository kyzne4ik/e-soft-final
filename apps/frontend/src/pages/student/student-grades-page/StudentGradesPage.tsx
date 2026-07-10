import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { streamByIdQuery } from "@/entities/streams";
import { GradesSidebar } from "./ui/GradesSidebar";
import { GradesTable } from "./ui/GradesTable";
import css from "./StudentGradesPage.module.css";

function GradesWorkspace({ streamId }: { streamId: number }) {
  const { data } = useQuery(streamByIdQuery(streamId));
  const stream = (data as { data?: { name: string } } | null)?.data ?? null;

  return (
    <WidgetBoundary message="Не удалось загрузить успеваемость">
      <GradesTable
        key={streamId}
        streamId={streamId}
        streamName={stream?.name ?? "Поток"}
      />
    </WidgetBoundary>
  );
}

export default function StudentGradesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <GradesSidebar selectedId={selectedId} onSelect={setSelectedId} />
        </WidgetBoundary>
      </SplitView.Sidebar>

      <SplitView.Workspace>
        {selectedId == null ? (
          <div className={css.empty}>Выберите поток слева</div>
        ) : (
          <GradesWorkspace key={selectedId} streamId={selectedId} />
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
