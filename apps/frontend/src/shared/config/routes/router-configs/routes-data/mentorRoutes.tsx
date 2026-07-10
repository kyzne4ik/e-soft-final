import type { TRouterNode } from "../routesConfigs";
import {
  MentorReviewBoardPage,
  MentorGradebookPage,
  MentorSchedulePage,
} from "@/pages/mentor";

export const mentorRoutesFullPaths = {
  REVIEW_BOARD: "/review",
  GRADEBOOK: "/gradebook",
  SCHEDULE: "/schedule",
} as const;

export const mentorRoutes: readonly TRouterNode[] = [
  {
    path: mentorRoutesFullPaths.REVIEW_BOARD,
    element: <MentorReviewBoardPage />,
  },
  { path: mentorRoutesFullPaths.GRADEBOOK, element: <MentorGradebookPage /> },
  { path: mentorRoutesFullPaths.SCHEDULE, element: <MentorSchedulePage /> },
];
