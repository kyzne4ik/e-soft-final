import { type ReactNode, type CSSProperties } from "react";
import { classNames } from "../../libs/classNames";
import { Tooltip } from "../tooltip/Tooltip";
import css from "./HelpTip.module.css";

export interface HelpTipStep {
  text: ReactNode;
}

export interface HelpTipProps {
  title?: ReactNode;
  steps: HelpTipStep[];
  position?: "top" | "right";
  className?: string;
  style?: CSSProperties;
}

export function HelpTip({
  title,
  steps,
  position = "top",
  className,
  style,
}: HelpTipProps) {
  return (
    <Tooltip
      position={position}
      className={classNames(css.root, {}, [className])}
      style={style}
      contentClassName={css.popover}
      text={
        <>
          {title ? <div className={css.title}>{title}</div> : null}
          <div className={css.body}>
            {steps.map((step, i) => (
              <div key={i} className={css.step}>
                <span className={css.step_num}>{i + 1}</span>
                <span className={css.step_text}>{step.text}</span>
              </div>
            ))}
          </div>
        </>
      }
    >
      <button
        type="button"
        className={css.trigger}
        aria-label="Подсказка"
        tabIndex={0}
      >
        ?
      </button>
    </Tooltip>
  );
}
