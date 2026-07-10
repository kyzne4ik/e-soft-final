import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { RepoLink } from "./fields";
import {
  submitSolutionSchema,
  type SubmitSolutionFormData,
} from "../model/types";
import { useSubmitSolution } from "../model/useSubmitSolution";
import css from "./SubmitSolutionForm.module.css";

const FORM_ID = "submit-solution-form";

export function SubmitSolutionForm({
  taskId,
  onSuccess,
  children,
}: {
  taskId: number;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<SubmitSolutionFormData>({
    resolver: zodResolver(submitSolutionSchema),
    mode: "onBlur",
    defaultValues: {
      repoLink: "",
    },
  });

  const { submitSolutionAsync } = useSubmitSolution({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Решение отправлено" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при отправке решения",
      });
    },
  });

  const onSubmit: SubmitHandler<SubmitSolutionFormData> = async (data) => {
    await submitSolutionAsync({ taskId, repoLink: data.repoLink });
  };

  return (
    <FormProvider {...form}>
      <form
        id={FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
        className={css.form}
      >
        {children}
      </form>
    </FormProvider>
  );
}

SubmitSolutionForm.Fields = function SubmitSolutionFormFields() {
  return (
    <>
      <RepoLink />
    </>
  );
};

SubmitSolutionForm.SubmitButton = function SubmitSolutionFormSubmitButton() {
  const { trigger, formState } = useFormContext<SubmitSolutionFormData>();
  const { getToast } = useToast();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      await getToast({
        type: "info",
        message: "Пожалуйста, укажите ссылку на репозиторий",
      });
    }
  };

  return (
    <Button
      type="submit"
      form={FORM_ID}
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      fullWidth
      onClick={handleClick}
    >
      Отправить решение
    </Button>
  );
};
