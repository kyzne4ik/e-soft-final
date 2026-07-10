import type { ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import css from "./WidgetBoundary.module.css";

export interface WidgetBoundaryProps {
  message?: string;
  children: ReactNode;
}

function Fallback({
  resetErrorBoundary,
  message,
}: FallbackProps & { message?: string }) {
  return (
    <div className={css.error} role="alert">
      <Icon name="triangle-alert" size={36} />
      <p className={css.error__title}>
        {message ?? "Не удалось загрузить данные"}
      </p>
      <Button variant="secondary" size="sm" onClick={resetErrorBoundary}>
        Повторить
      </Button>
    </div>
  );
}

export function WidgetBoundary({ message, children }: WidgetBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(props) => <Fallback {...props} message={message} />}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
