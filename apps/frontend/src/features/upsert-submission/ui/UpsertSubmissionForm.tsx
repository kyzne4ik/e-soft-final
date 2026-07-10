import { type ReactNode, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useUpdateSubmission } from "@/features/update-submission/model/useUpdateSubmission";
import { useUpsertSubmission } from "../model/useUpsertSubmission";
import {
  upsertSubmissionSchema,
  type UpsertSubmissionFormData,
} from "../model/types";
import { RepoLink } from "./fields";

const FORM_ID = "upsert-submission-form";

export interface UpsertSubmissionFormProps {
  taskId: number;
  submissionId?: number;
  onSuccess?: () => void;
  defaultRepoLink?: string;
  children: ReactNode;
}

export function UpsertSubmissionForm({
  taskId,
  submissionId,
  onSuccess,
  defaultRepoLink,
  children,
}: UpsertSubmissionFormProps) {
  const { getToast } = useToast();

  const form = useForm<UpsertSubmissionFormData>({
    resolver: zodResolver(upsertSubmissionSchema),
    mode: "onBlur",
    defaultValues: { repoLink: defaultRepoLink ?? "" },
  });

  useEffect(() => {
    if (defaultRepoLink) {
      form.reset({ repoLink: defaultRepoLink });
    }
  }, [defaultRepoLink]);

  const onDone = async () => {
    form.reset({ repoLink: "" });
    onSuccess?.();
    await getToast({ type: "success", message: "Решение отправлено" });
  };

  const onFail = async (error: {
    response?: { data?: { message?: string } };
  }) => {
    await getToast({
      type: "error",
      message: error.response?.data?.message || "Ошибка при отправке решения",
    });
  };

  const { upsertSubmission } = useUpsertSubmission({
    onSuccess: onDone,
    onError: onFail,
  });

  const { updateSubmission } = useUpdateSubmission(submissionId ?? 0, {
    onSuccess: onDone,
    onError: onFail,
  });

  const onSubmit = async (data: UpsertSubmissionFormData) => {
    if (submissionId) {
      await updateSubmission({ repoLink: data.repoLink });
    } else {
      await upsertSubmission({ taskId, repoLink: data.repoLink });
    }
  };

  return (
    <FormProvider {...form}>
      <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

UpsertSubmissionForm.Fields = function UpsertSubmissionFormFields() {
  return <RepoLink />;
};

UpsertSubmissionForm.SubmitButton = function UpsertSubmissionFormSubmitButton({
  label = "Отправить решение",
}: {
  label?: string;
}) {
  const {
    formState: { isSubmitting },
    trigger,
  } = useFormContext<UpsertSubmissionFormData>();
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
      {label}
    </Button>
  );
};
