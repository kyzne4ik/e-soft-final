import { type CSSProperties, useId } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Slider.module.css";

export interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  accentColor?: string;
  trackColor?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  "aria-label"?: string;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  accentColor = "var(--color-tertiary)",
  trackColor = "var(--surface-muted)",
  disabled = false,
  id,
  name,
  "aria-label": ariaLabel,
  className,
}: SliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const clamped = Math.min(max, Math.max(min, value));
  const pct = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  const styleVars = {
    "--ui-slider-accent": accentColor,
    "--ui-slider-track": trackColor,
    "--ui-slider-pct": `${pct}%`,
  } as CSSProperties;

  return (
    <div
      className={classNames(
        css.ui_slider,
        { [css.ui_slider__disabled]: disabled },
        [className],
      )}
    >
      {showValue ? (
        <div className={css.ui_slider__value}>
          <span className={css.ui_slider__num} style={{ color: accentColor }}>
            {clamped}
          </span>
          <span className={css.ui_slider__max}>/ {max}</span>
        </div>
      ) : null}
      <input
        id={inputId}
        name={name}
        type="range"
        className={css.ui_slider__input}
        min={min}
        max={max}
        step={step}
        value={clamped}
        disabled={disabled}
        aria-label={ariaLabel}
        style={styleVars}
        onChange={(event) => onChange?.(Number(event.target.value))}
      />
    </div>
  );
}
