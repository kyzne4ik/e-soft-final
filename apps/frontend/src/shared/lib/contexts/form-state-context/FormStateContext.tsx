import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { ReactNode } from "react";
import { createStrictContext, useStrictContext } from "@repo/ui/libs/react";

type FormStateContextType<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isLoading: boolean;
  onSubmit: SubmitHandler<T>;
};

const formStateContext = createStrictContext<FormStateContextType<any>>();

export function FormStateProvider<T extends FieldValues>({
  children,
  value,
}: {
  children: (({ isLoading }: { isLoading?: boolean }) => ReactNode) | ReactNode;
  value: FormStateContextType<T>;
}) {
  const { isLoading } = value;
  return (
    <formStateContext.Provider value={value}>
      {typeof children === "function" ? children({ isLoading }) : children}
    </formStateContext.Provider>
  );
}

export function useFormStateContext<T extends FieldValues>() {
  const context = useStrictContext(formStateContext);
  return context as FormStateContextType<T>;
}
