import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./AiScore.module.css";

export interface AiScoreProps {
  score: number;
}

const toneFor = (score: number): "good" | "mid" | "low" =>
  score >= 80 ? "good" : score >= 60 ? "mid" : "low";

export function AiScore({ score }: AiScoreProps) {
  return (
    <span
      className={classNames(css.ui_aiscore, {}, [
        css[`ui_aiscore__${toneFor(score)}`],
      ])}
      title="Оценка AI-препроверки"
    >
      <Icon name="sparkles" size={13} />
      {`AI ${score}`}
    </span>
  );
}
