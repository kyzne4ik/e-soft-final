import { useEffect, useState } from "react";
import css from "./DeadlineCountdown.module.css";

export interface DeadlineCountdownProps {
  targetHours?: number;
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const toParts = (totalSeconds: number): TimeParts => ({
  days: Math.floor(totalSeconds / 86400),
  hours: Math.floor((totalSeconds % 86400) / 3600),
  minutes: Math.floor((totalSeconds % 3600) / 60),
  seconds: Math.floor(totalSeconds % 60),
});

const pad = (value: number): string => String(value).padStart(2, "0");

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className={css.ui_countdown__cell}>
    <div className={css.ui_countdown__num}>{pad(value)}</div>
    <div className={css.ui_countdown__lbl}>{label}</div>
  </div>
);

export function DeadlineCountdown({
  targetHours = 50,
}: DeadlineCountdownProps) {
  const [remaining, setRemaining] = useState(targetHours * 3600);

  useEffect(() => {
    const id = setInterval(
      () => setRemaining((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = toParts(remaining);

  return (
    <div className={css.ui_countdown}>
      <Cell value={days} label="дн" />
      <Cell value={hours} label="ч" />
      <Cell value={minutes} label="мин" />
      <Cell value={seconds} label="сек" />
    </div>
  );
}
