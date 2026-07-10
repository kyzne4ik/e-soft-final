import { useState } from "react";
import { Tabs } from "@repo/ui/molecules/tabs";
import css from "../AdminStreamsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { StreamResponse } from "@repo/schemas";
import { streamByIdQuery } from "@/entities/streams";
import { StreamTelegramTab } from "./StreamTelegramTab";
import { StartStreamButton } from "@/features/start-stream";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { UpdateStreamButton } from "@/features/update-stream";
import { DeleteStreamButton } from "@/features/delete-stream";
import { FinishStreamButton } from "@/features/finish-stream";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import { StreamMentorTable } from "@/widgets/stream-mentor-table";
import { StreamStudentTable } from "@/widgets/stream-student-table";
import { RevertFinishStreamButton } from "@/features/revert-finish-stream";

export interface AdminStreamPanelProps {
  streamId: number;
  onDeleted?: () => void;
}

export function AdminStreamPanel({
  streamId,
  onDeleted,
}: AdminStreamPanelProps) {
  return (
    <WidgetBoundary message="Не удалось загрузить поток">
      <AdminStreamPanelBase streamId={streamId} onDeleted={onDeleted} />
    </WidgetBoundary>
  );
}

function AdminStreamAction({ stream }: { stream: StreamResponse }) {
  if (stream.status === "ENROLLING")
    return <StartStreamButton streamId={stream.id} />;
  if (stream.status === "IN_PROGRESS")
    return <FinishStreamButton streamId={stream.id} />;
  return <RevertFinishStreamButton streamId={stream.id} />;
}

function AdminStreamPanelBase({ streamId, onDeleted }: AdminStreamPanelProps) {
  const [tab, setTab] = useState("students");
  const result = useQuery({ ...streamByIdQuery(streamId), throwOnError: true });
  const stream = result.data?.data ?? null;

  if (result.isLoading) {
    return (
      <div className={css.panel}>
        <div className={css.panel_head}>
          <Skeleton height={28} width={260} border="8px" />
        </div>
      </div>
    );
  }

  if (!stream) return null;

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      defaultValue="students"
      className={css.panel}
    >
      <div className={css.panel_head}>
        <div className={css.panel_title}>
          <span className={css.panel_name}>{stream.name}</span>
          <StatusBadge status={stream.status} kind="stream" />
          <UpdateStreamButton stream={stream} />
          <DeleteStreamButton
            streamId={stream.id}
            streamName={stream.name}
            onDeleted={onDeleted}
          />
        </div>
        <AdminStreamAction stream={stream} />
      </div>
      <div className={css.panel_body}>
        <Tabs.List className={css.tabs}>
          <Tabs.Tab value="students" icon="users">
            Студенты
          </Tabs.Tab>
          <Tabs.Tab value="mentors" icon="graduation-cap">
            Менторы
          </Tabs.Tab>
          <Tabs.Tab value="telegram" icon="send">
            Telegram
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="students">
          <StreamStudentTable streamId={streamId} />
        </Tabs.Panel>
        <Tabs.Panel value="mentors">
          <StreamMentorTable streamId={streamId} />
        </Tabs.Panel>
        <Tabs.Panel value="telegram">
          <StreamTelegramTab streamId={streamId} />
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}
