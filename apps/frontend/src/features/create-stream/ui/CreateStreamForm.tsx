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
import { Name, CourseSelect } from "./fields";
import { createStreamSchema, type CreateStreamFormData } from "../model/types";
import { useCreateStream } from "../model/useCreateStream";
import css from "./CreateStreamForm.module.css";

const FORM_ID = "create-stream-form";

export function CreateStreamForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<CreateStreamFormData>({
    resolver: zodResolver(createStreamSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      courseId: "",
    },
  });

  const { createStreamAsync } = useCreateStream({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Поток создан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при создании потока",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateStreamFormData> = async (data) => {
    await createStreamAsync({
      name: data.name,
      courseId: Number(data.courseId),
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

CreateStreamForm.Fields = function CreateStreamFormFields() {
  return (
    <>
      <CourseSelect />
      <Name />
    </>
  );
};

CreateStreamForm.SubmitButton = function CreateStreamFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateStreamFormData>();
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
      Создать поток
    </Button>
  );
};
