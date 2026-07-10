import { Button } from "../../../atoms/button";
import { Icon } from "../../../atoms/icon";
import { useCalendar } from "../CalendarContext";
import type { CalendarView } from "../types";
import css from "../Calendar.module.css";

const NAV_LABELS: Record<CalendarView, [prev: string, next: string]> = {
  month: ["Предыдущий месяц", "Следующий месяц"],
  week: ["Предыдущая неделя", "Следующая неделя"],
  day: ["Предыдущий день", "Следующий день"],
};

export function Nav() {
  const { goPrev, goNext, goToday, view } = useCalendar();
  const [prevLabel, nextLabel] = NAV_LABELS[view];

  return (
    <div className={css.cal__nav}>
      <Button
        variant="secondary"
        size="sm"
        isIconOnly
        aria-label={prevLabel}
        onClick={goPrev}
      >
        <Icon name="chevron-left" size={18} />
      </Button>
      <Button variant="secondary" size="sm" onClick={goToday}>
        Сегодня
      </Button>
      <Button
        variant="secondary"
        size="sm"
        isIconOnly
        aria-label={nextLabel}
        onClick={goNext}
      >
        <Icon name="chevron-right" size={18} />
      </Button>
    </div>
  );
}
