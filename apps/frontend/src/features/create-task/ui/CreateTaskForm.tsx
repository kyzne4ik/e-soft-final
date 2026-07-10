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
import { Title, Description, RepoTemplate, Deadline } from "./fields";
import { useCreateTask } from "../model/useCreateTask";
import { createTaskSchema, type CreateTaskFormData } from "../model/types";
import css from "./CreateTaskForm.module.css";

const FORM_ID = "create-task-form";

export interface CreateTaskFormProps {
  streamId: number;
  onSuccess?: () => void;
  children: ReactNode;
}

export function CreateTaskForm({
  streamId,
  onSuccess,
  children,
}: CreateTaskFormProps) {
  const { getToast } = useToast();

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    mode: "onBlur",
    defaultValues: {
      streamId: String(streamId),
      title: "",
      description: "",
      repoTemplate: "",
      deadline: "",
    },
  });

  const { createTask } = useCreateTask({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Задача создана",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при создании задачи",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateTaskFormData> = async (data) => {
    await createTask({
      streamId: Number(data.streamId),
      title: data.title,
      description: data.description,
      repoTemplate: data.repoTemplate,
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

CreateTaskForm.Fields = function CreateTaskFormFields() {
  return (
    <>
      <Title />
      <Description />
      <RepoTemplate />
      <Deadline />
    </>
  );
};

CreateTaskForm.SubmitButton = function CreateTaskFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateTaskFormData>();
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
      Создать задачу
    </Button>
  );
};
