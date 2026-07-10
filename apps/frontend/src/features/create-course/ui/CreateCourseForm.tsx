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
import { useCreateCourse } from "../model/useCreateCourse";
import { createCourseSchema, type CreateCourseFormData } from "../model/types";
import { Name, Description } from "./fields";
import css from "./CreateCourseForm.module.css";

const FORM_ID = "create-course-form";

export function CreateCourseForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { createCourseAsync } = useCreateCourse({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({ type: "success", message: "Курс создан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при создании курса",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateCourseFormData> = async (data) => {
    await createCourseAsync({
      name: data.name,
      description: data.description || null,
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

CreateCourseForm.Fields = function CreateCourseFormFields() {
  return (
    <>
      <Name />
      <Description />
    </>
  );
};

CreateCourseForm.SubmitButton = function CreateCourseFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateCourseFormData>();
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
      Создать курс
    </Button>
  );
};
