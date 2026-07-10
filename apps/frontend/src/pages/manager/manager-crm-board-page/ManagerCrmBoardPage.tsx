import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@repo/ui/layouts/flex";
import { SplitView } from "@repo/ui/layouts/split-view";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { streamsQuery } from "@/entities/streams";
import { CrmBoard } from "@/widgets/crm-board";
import { CreateLeadButton } from "@/features/create-lead";
import { OpenIntakeButton } from "@/features/open-intake";
import { CrmStreamsSidebar } from "./ui/CrmStreamsSidebar";
import css from "./ManagerCrmBoardPage.module.css";

function CrmWorkspace({ streamId }: { streamId: number | null }) {
  const { data } = useQuery(streamsQuery());
  const streams = data && !Array.isArray(data) ? data.data : [];
  const title =
    streams.find((stream) => stream.id === streamId)?.name ?? "Поток";

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{title}</span>
        <Flex gap="2" justify="end">
          {streamId != null && <OpenIntakeButton streamId={streamId} />}
          <CreateLeadButton />
        </Flex>
      </div>
      <div className={css.workspace_body}>
        <CrmBoard
          query={streamId != null ? { targetStreamId: streamId } : undefined}
        />
      </div>
    </div>
  );
}

export default function ManagerCrmBoardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SplitView className={css.shell}>
      <SplitView.Sidebar className={css.sidebar}>
        <WidgetBoundary message="Не удалось загрузить потоки">
          <CrmStreamsSidebar selectedId={selectedId} onSelect={setSelectedId} />
        </WidgetBoundary>
      </SplitView.Sidebar>
      <SplitView.Workspace>
        <CrmWorkspace streamId={selectedId} />
      </SplitView.Workspace>
    </SplitView>
  );
}
