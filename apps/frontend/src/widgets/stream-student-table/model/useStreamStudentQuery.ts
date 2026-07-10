import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fullName } from "@/shared/lib/user-display";
import { streamStudentsQuery, streamMentorsQuery } from "@/entities/streams";

export function useStreamStudentQuery(streamId: number) {
  const [search, setSearch] = useState<string>("");

  const studentsRes = useQuery({
    ...streamStudentsQuery(streamId),
    throwOnError: true,
  });
  const mentorsRes = useQuery({
    ...streamMentorsQuery(streamId),
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

  const mentorName = useMemo(() => {
    const map = new Map<number, string>();
    for (const mentor of mentors) map.set(mentor.mentorId, fullName(mentor));
    return map;
  }, [mentors]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => fullName(s).toLowerCase().includes(q));
  }, [students, search]);

  const isLoading = studentsRes.isLoading || mentorsRes.isLoading;

  return { filtered, mentorName, isLoading, search, setSearch };
}
