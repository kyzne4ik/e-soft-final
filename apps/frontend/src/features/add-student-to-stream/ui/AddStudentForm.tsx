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
import { StudentSelect, MentorSelect } from "./fields";
import { addStudentSchema, type AddStudentFormData } from "../model/types";
import { useAddStudent } from "../model/useAddStudent";
import css from "./AddStudentForm.module.css";

const FORM_ID = "add-student-form";

export function AddStudentForm({
  streamId,
  onSuccess,
  children,
}: {
  streamId: number;
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<AddStudentFormData>({
    resolver: zodResolver(addStudentSchema),
    mode: "onBlur",
    defaultValues: {
      studentId: "",
      mentorId: "",
    },
  });

  const { addStudentAsync } = useAddStudent({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Студент добавлен в поток",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при добавлении студента",
      });
    },
  });

  const onSubmit: SubmitHandler<AddStudentFormData> = async (data) => {
    await addStudentAsync({
      streamId,
      studentId: Number(data.studentId),
      mentorId: Number(data.mentorId),
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

AddStudentForm.Fields = function AddStudentFormFields() {
  return (
    <>
      <StudentSelect />
      <MentorSelect />
    </>
  );
};

AddStudentForm.SubmitButton = function AddStudentFormSubmitButton() {
  const { trigger, formState } = useFormContext<AddStudentFormData>();
  const { getToast } = useToast();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      await getToast({
        type: "info",
        message: "Пожалуйста, выберите студента и ментора",
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
      Добавить студента
    </Button>
  );
};
