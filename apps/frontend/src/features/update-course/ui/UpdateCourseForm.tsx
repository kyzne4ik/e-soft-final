import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import type { ReactNode } from "react";
import { Name, Description } from "./fields";
import { Button } from "@repo/ui/atoms/button";
import css from "./UpdateCourseForm.module.css";
import type { CourseResponse } from "@repo/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCourse } from "../model/useUpdateCourse";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { updateCourseSchema, type UpdateCourseFormData } from "../model/types";

const FORM_ID = "update-course-form";

export function UpdateCourseForm({
  course,
  onSuccess,
  children,
}: {
  course?: CourseResponse | null;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<UpdateCourseFormData>({
    resolver: zodResolver(updateCourseSchema),
    mode: "onBlur",
    defaultValues: course
      ? {
          name: course.name,
          description: course.description ?? "",
        }
      : {
          name: "",
          description: "",
        },
  });

  const { updateCourseAsync } = useUpdateCourse(course?.id ?? 0, {
    async onSuccess() {
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Курс обновлён",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при обновлении курса",
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateCourseFormData> = async (data) => {
    await updateCourseAsync({
      name: data.name,
      description: data.description || null,
    });
  };

  if (!course) {
    return null;
  }

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

UpdateCourseForm.Fields = function UpdateCourseFormFields() {
  return (
    <>
      <Name />
      <Description />
    </>
  );
};

UpdateCourseForm.SubmitButton = function UpdateCourseFormSubmitButton() {
  const { trigger, formState } = useFormContext<UpdateCourseFormData>();
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
