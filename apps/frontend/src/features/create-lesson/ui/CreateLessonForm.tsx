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
import { useCreateLesson } from "../model/useCreateLesson";
import { toDateTimeLocalValue } from "../model/toDateTimeLocalValue";
import { createLessonSchema, type CreateLessonFormData } from "../model/types";
import {
  Title,
  Type,
  Host,
  Description,
  StartTime,
  EndTime,
  MeetingLink,
  RecordLink,
} from "./fields";
import css from "./CreateLessonForm.module.css";

export const CREATE_LESSON_FORM_ID = "create-lesson-form";

const HOUR_MS = 60 * 60 * 1000;

export interface CreateLessonFormProps {
  streamId: number;
  initialStart?: Date;
  onSuccess?: () => void;
  children: ReactNode;
}

export function CreateLessonForm({
  streamId,
  initialStart,
  onSuccess,
  children,
}: CreateLessonFormProps) {
  const { getToast } = useToast();

  const form = useForm<CreateLessonFormData>({
    resolver: zodResolver(createLessonSchema),
    mode: "onBlur",
    defaultValues: {
      streamId: String(streamId),
      title: "",
      type: "",
      host: "",
      description: "",
      startTime: initialStart ? toDateTimeLocalValue(initialStart) : "",
      endTime: initialStart
        ? toDateTimeLocalValue(new Date(initialStart.getTime() + HOUR_MS))
        : "",
      meetingLink: "",
      recordLink: "",
    },
  });

  const { createLesson } = useCreateLesson({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Занятие создано",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при создании занятия",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateLessonFormData> = async (data) => {
    await createLesson({
      streamId: Number(data.streamId),
      title: data.title,
      type: data.type || null,
      host: data.host || null,
      description: data.description || null,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      meetingLink: data.meetingLink || null,
      recordLink: data.recordLink || null,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        id={CREATE_LESSON_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
        className={css.form}
      >
        {children}
      </form>
    </FormProvider>
  );
}

CreateLessonForm.Fields = function CreateLessonFormFields() {
  return (
    <>
      <Title />
      <Type />
      <Host />
      <Description />
      <StartTime />
      <EndTime />
      <MeetingLink />
      <RecordLink />
    </>
  );
};

CreateLessonForm.SubmitButton = function CreateLessonFormSubmitButton() {
  const {
    formState: { isSubmitting },
    trigger,
  } = useFormContext<CreateLessonFormData>();
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
      form={CREATE_LESSON_FORM_ID}
      isPending={isSubmitting}
      isDisabled={isSubmitting}
      fullWidth
      onClick={handleClick}
    >
      Создать занятие
    </Button>
  );
};
