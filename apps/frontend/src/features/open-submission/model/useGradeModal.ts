import { useState } from "react";
import type { GradeVerdict } from "../ui/GradeSubmissionModal";

export interface GradeModalState {
  mode: "create" | "edit";
  verdict: GradeVerdict;
  reviewId?: number;
  previousScore?: number | null;
  initialScore?: number;
  initialComment?: string;
}

export function useGradeModal() {
  const [state, setState] = useState<GradeModalState | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (next: GradeModalState) => {
    setState(next);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { state, isOpen, open, close };
}
