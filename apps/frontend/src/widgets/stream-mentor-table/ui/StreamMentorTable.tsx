import { MentorCard } from "./MentorCard";
import css from "./StreamMentorTable.module.css";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { StreamMentorSkeleton } from "./StreamMentorSkeleton";
import { AddMentorButton } from "@/features/add-mentor-to-stream";
import { useStreamMentorQuery } from "../model/useStreamMentorQuery";

export interface StreamMentorTableProps {
  streamId: number;
}

export function StreamMentorTable({ streamId }: StreamMentorTableProps) {
  return (
    <WidgetBoundary message="Не удалось загрузить менторов">
      <StreamMentorTableBase streamId={streamId} />
    </WidgetBoundary>
  );
}

function StreamMentorTableBase({ streamId }: StreamMentorTableProps) {
  const { mentors, byMentor, isLoading } = useStreamMentorQuery(streamId);

  if (isLoading) <StreamMentorSkeleton />;

  return (
    <div>
      <div className={css.toolbar}>
        <AddMentorButton streamId={streamId} />
      </div>
      {mentors.length === 0 ? (
        <div className={css.chips_empty}>В потоке пока нет менторов</div>
      ) : (
        <div className={css.list}>
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.mentorId}
              streamId={streamId}
              mentor={mentor}
              students={byMentor.get(mentor.mentorId) ?? []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
