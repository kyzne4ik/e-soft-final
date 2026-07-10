import type { TRole } from "@/shared/config/routes";
import {
  studentRoutesFullPaths,
  mentorRoutesFullPaths,
  managerRoutesFullPaths,
  adminRoutesFullPaths,
} from "@/shared/config/routes";

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export const navConfig: Record<TRole, NavItem[]> = {
  STUDENT: [
    {
      path: studentRoutesFullPaths.SCHEDULE,
      label: "Расписание",
      icon: "calendar",
    },
    { path: studentRoutesFullPaths.TASKS, label: "ДЗ", icon: "book-open" },
    { path: studentRoutesFullPaths.GRADES, label: "Оценки", icon: "award" },
  ],
  MENTOR: [
    {
      path: mentorRoutesFullPaths.REVIEW_BOARD,
      label: "Ревью",
      icon: "clipboard-list",
    },
    {
      path: mentorRoutesFullPaths.GRADEBOOK,
      label: "Журнал",
      icon: "book-open",
    },
    {
      path: mentorRoutesFullPaths.SCHEDULE,
      label: "Расписание",
      icon: "calendar",
    },
  ],
  MANAGER: [
    { path: managerRoutesFullPaths.CRM_BOARD, label: "CRM", icon: "briefcase" },
    {
      path: managerRoutesFullPaths.SCHEDULE,
      label: "Расписание",
      icon: "calendar",
    },
  ],
  ADMIN: [
    {
      path: adminRoutesFullPaths.SCHEDULE,
      label: "Расписание",
      icon: "calendar",
    },
    { path: adminRoutesFullPaths.STREAMS, label: "Потоки", icon: "layers" },
    { path: adminRoutesFullPaths.COURSES, label: "Курсы", icon: "book-open" },
    {
      path: adminRoutesFullPaths.TASKS,
      label: "Задания",
      icon: "clipboard-list",
    },
    { path: adminRoutesFullPaths.USERS, label: "Пользователи", icon: "users" },
  ],
};
