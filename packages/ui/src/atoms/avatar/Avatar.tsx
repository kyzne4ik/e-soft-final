import css from "./Avatar.module.css";
import { classNames } from "../../libs/classNames";

export interface AvatarPerson {
  name: string;
  initials: string;
  color?: string;
}

export interface AvatarProps {
  person: AvatarPerson;
  size?: number;
  ring?: boolean;
  className?: string;
}

export function Avatar({
  person,
  size = 36,
  ring = false,
  className,
}: AvatarProps) {
  const color = person.color ?? "var(--color-primary)";

  return (
    <div
      className={classNames(css.ui_avatar, {}, [className])}
      title={person.name}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: color,
        boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 4px ${color}` : undefined,
      }}
    >
      {person.initials}
    </div>
  );
}
