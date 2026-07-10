import { Children, isValidElement, type ReactNode } from "react";
import { classNames } from "../../../libs/classNames";
import { useCalendar } from "../CalendarContext";
import type { CalendarView } from "../types";
import css from "../Calendar.module.css";

interface ViewComponentMarker {
  viewName?: CalendarView;
}

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

export function Body({ children, className }: BodyProps) {
  const { view } = useCalendar();

  const active = Children.toArray(children).find(
    (child) =>
      isValidElement(child) &&
      (child.type as unknown as ViewComponentMarker).viewName === view,
  );

  return (
    <div className={classNames(css.cal__body, {}, [className])}>
      {active ?? null}
    </div>
  );
}
