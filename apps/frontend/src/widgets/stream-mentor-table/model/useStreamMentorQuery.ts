import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { StreamStudentWithUserResponse } from "@repo/schemas";
import { streamStudentsQuery, streamMentorsQuery } from "@/entities/streams";

export function useStreamMentorQuery(streamId: number) {
  const mentorsRes = useQuery({
    ...streamMentorsQuery(streamId),
    throwOnError: true,
  });
  const studentsRes = useQuery({
    ...streamStudentsQuery(streamId),
    throwOnError: true,
  });

  const mentors = useMemo(
    () => mentorsRes?.data?.data ?? [],
    [mentorsRes.data],
  );
  const students = useMemo(
    () => studentsRes?.data?.data ?? [],
    [studentsRes.data],
  );

  const byMentor = useMemo(() => {
    const map = new Map<number, StreamStudentWithUserResponse[]>();
    for (const student of students) {
      if (student.mentorId == null) continue;
      const list = map.get(student.mentorId) ?? [];
      list.push(student);
      map.set(student.mentorId, list);
    }
    return map;
  }, [students]);

  const isLoading = mentorsRes.isLoading || studentsRes.isLoading;

  return { mentors, byMentor, isLoading };
}
