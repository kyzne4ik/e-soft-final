import type { TRole } from "@/shared/config/routes/router-configs/routesConfigs";

type Action = "view" | "create" | "edit" | "delete" | "ping";
type Subject = "submission" | "lead" | "task" | "stream" | "user" | "lesson";

const permissions: Record<TRole, Partial<Record<Subject, Action[]>>> = {
  STUDENT: { task: ["view"] },
  MENTOR: { submission: ["view", "edit"], task: ["view"], lesson: ["view"] },
  MANAGER: {
    lead: ["view", "edit", "create"],
    lesson: ["create", "edit", "delete"],
  },
  ADMIN: {
    submission: ["view", "edit", "delete"],
    lead: ["view", "edit", "create", "delete"],
    task: ["create", "edit", "delete"],
    stream: ["create", "edit", "delete"],
    user: ["create", "edit", "delete"],
    lesson: ["create", "edit", "delete"],
  },
};

export const can = (role: TRole, action: Action, subject: Subject): boolean => {
  return permissions[role]?.[subject]?.includes(action) ?? false;
};
