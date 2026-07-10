import { useState } from "react";
import css from "./AdminStreamsPage.module.css";
import { SplitView } from "@repo/ui/layouts/split-view";
import { AdminStreamPanel } from "./ui/AdminStreamPanel";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { AdminStreamsSidebar } from "./ui/AdminStreamsSidebar";

export default function AdminStreamsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <AdminStreamsSidebar
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        {selectedId == null ? (
          <div className={css.panel_empty}>Выберите поток слева</div>
        ) : (
          <AdminStreamPanel
            key={selectedId}
            streamId={selectedId}
            onDeleted={() => setSelectedId(null)}
          />
        )}
      </SplitView.Workspace>
    </SplitView>
  );
}
