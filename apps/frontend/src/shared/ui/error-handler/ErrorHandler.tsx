import { Icon } from "@repo/ui/atoms/icon";
import css from "./ErrorHandler.module.css";
import { Button } from "@repo/ui/atoms/button";
import type { FallbackProps } from "react-error-boundary";

export function ErrorHandler({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={css.wrapper}>
      <Icon name="triangle-alert" size={40} />
      <h2 className={css.title}>Что-то пошло не так:</h2>
      {import.meta.env.DEV ? (
        <blockquote className={css.detail}>
          <code>{error instanceof Error ? error.message : String(error)}</code>
        </blockquote>
      ) : null}
      <Button variant="ghost" size={"sm"} onClick={resetErrorBoundary}>
        Повторить
      </Button>
    </div>
  );
}
