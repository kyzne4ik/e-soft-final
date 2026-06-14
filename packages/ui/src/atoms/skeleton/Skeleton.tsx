import { CSSProperties } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Skeleton.module.css";

export interface SkeletonProps {
  border?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  width,
  height,
  border,
  className,
}: SkeletonProps) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div style={styles} className={classNames(css.wrapper, {}, [className])} />
  );
};
