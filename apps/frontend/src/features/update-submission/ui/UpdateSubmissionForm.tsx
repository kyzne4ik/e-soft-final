import type { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmissionResponse } from "@repo/schemas";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useUpdateSubmission } from "../model/useUpdateSubmission";
import {
  updateSubmissionSchema,
  type UpdateSubmissionFormData,
} from "../model/types";
import { RepoLink } from "./fields";
import css from "./UpdateSubmissionForm.module.css";

const FORM_ID = "update-submission-form";

export interface UpdateSubmissionFormProps {
  submission: SubmissionResponse;
  onSuccess?: () => void;
  children: ReactNode;
}

export function UpdateSubmissionForm({
  submission,
  onSuccess,
  children,
}: UpdateSubmissionFormProps) {
  const { getToast } = useToast();

  const form = useForm<UpdateSubmissionFormData>({
    resolver: zodResolver(updateSubmissionSchema),
    mode: "onBlur",
    defaultValues: {
      repoLink: submission.repoLink,
    },
  });

  const { updateSubmission } = useUpdateSubmission(submission.id, {
    async onSuccess() {
      onSuccess?.();
      await getToast({ type: "success", message: "Решение обновлено" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении решения",
      });
    },
  });

  const onSubmit = async (data: UpdateSubmissionFormData) => {
    await updateSubmission({ repoLink: data.repoLink });
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

UpdateSubmissionForm.Fields = function UpdateSubmissionFormFields() {
  return (
    <>
      <RepoLink />
    </>
  );
};

UpdateSubmissionForm.SubmitButton =
  function UpdateSubmissionFormSubmitButton() {
    const {
      formState: { isSubmitting },
      trigger,
    } = useFormContext<UpdateSubmissionFormData>();
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
        isPending={isSubmitting}
        isDisabled={isSubmitting}
        fullWidth
        onClick={handleClick}
      >
        Сохранить изменения
      </Button>
    );
  };
