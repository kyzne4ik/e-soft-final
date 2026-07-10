import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import type { TaskResponse } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import {
  Title,
  Description,
  RepoTemplate,
  RecordLink,
  Deadline,
} from "./fields";
import { useUpdateTask } from "../model/useUpdateTask";
import { toDateTimeLocalValue } from "../model/toDateTimeLocalValue";
import { updateTaskSchema, type UpdateTaskFormData } from "../model/types";
import css from "./UpdateTaskForm.module.css";

const FORM_ID = "update-task-form";

export interface UpdateTaskFormProps {
  task: TaskResponse;
  onSuccess?: () => void;
  children: ReactNode;
}

export function UpdateTaskForm({
  task,
  onSuccess,
  children,
}: UpdateTaskFormProps) {
  const { getToast } = useToast();

  const form = useForm<UpdateTaskFormData>({
    resolver: zodResolver(updateTaskSchema),
    mode: "onBlur",
    defaultValues: {
      title: task.title,
      description: task.description,
      repoTemplate: task.repoTemplate,
      recordLink: task.recordLink ?? "",
      deadline: toDateTimeLocalValue(task.deadline),
    },
  });

  const { updateTask } = useUpdateTask(task.id, {
    async onSuccess() {
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Задача обновлена",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении задачи",
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskFormData> = async (data) => {
    await updateTask({
      title: data.title,
      description: data.description,
      repoTemplate: data.repoTemplate,
      recordLink: data.recordLink ? data.recordLink : null,
      deadline: new Date(data.deadline),
    });
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

UpdateTaskForm.Fields = function UpdateTaskFormFields() {
  return (
    <>
      <Title />
      <Description />
      <RepoTemplate />
      <RecordLink />
      <Deadline />
    </>
  );
};

UpdateTaskForm.SubmitButton = function UpdateTaskFormSubmitButton() {
  const { trigger, formState } = useFormContext<UpdateTaskFormData>();
  const { getToast } = useToast();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      await getToast({
        type: "info",
        message: "Пожалуйста, заполните обязательные поля",
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
      Сохранить изменения
    </Button>
  );
};
