import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/atoms/button";
import type { StreamResponse } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { Name, CourseSelect } from "./fields";
import { updateStreamSchema, type UpdateStreamFormData } from "../model/types";
import { useUpdateStream } from "../model/useUpdateStream";
import css from "./UpdateStreamForm.module.css";

const FORM_ID = "update-stream-form";

export function UpdateStreamForm({
  stream,
  onSuccess,
  children,
}: {
  stream: StreamResponse;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<UpdateStreamFormData>({
    resolver: zodResolver(updateStreamSchema),
    mode: "onBlur",
    defaultValues: {
      name: stream.name,
      courseId: String(stream.courseId),
    },
  });

  const { updateStreamAsync } = useUpdateStream(stream.id, {
    async onSuccess() {
      onSuccess?.();
      await getToast({ type: "success", message: "Поток обновлён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении потока",
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateStreamFormData> = async (data) => {
    await updateStreamAsync({
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

UpdateStreamForm.Fields = function UpdateStreamFormFields() {
  return (
    <>
      <CourseSelect />
      <Name />
    </>
  );
};

UpdateStreamForm.SubmitButton = function UpdateStreamFormSubmitButton() {
  const { trigger, formState } = useFormContext<UpdateStreamFormData>();
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
