import type { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import type { LessonsResponse } from "@repo/schemas";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useUpdateLesson } from "../model/useUpdateLesson";
import { toDateTimeLocalValue } from "../model/toDateTimeLocalValue";
import { updateLessonSchema, type UpdateLessonFormData } from "../model/types";
import {
  StreamSelect,
  Title,
  Type,
  Host,
  Description,
  StartTime,
  EndTime,
  MeetingLink,
  RecordLink,
} from "./fields";
import css from "./UpdateLessonForm.module.css";

const FORM_ID = "update-lesson-form";

export interface UpdateLessonFormProps {
  lesson?: LessonsResponse | null;
  onSuccess?: () => void;
  children: ReactNode;
}

export function UpdateLessonForm({
  lesson,
  onSuccess,
  children,
}: UpdateLessonFormProps) {
  if (!lesson) {
    return null;
  }

  return (
    <UpdateLessonFormInner lesson={lesson} onSuccess={onSuccess}>
      {children}
    </UpdateLessonFormInner>
  );
}

interface UpdateLessonFormInnerProps {
  lesson: LessonsResponse;
  onSuccess?: () => void;
  children: ReactNode;
}

function UpdateLessonFormInner({
  lesson,
  onSuccess,
  children,
}: UpdateLessonFormInnerProps) {
  const { getToast } = useToast();

  const form = useForm<UpdateLessonFormData>({
    resolver: zodResolver(updateLessonSchema),
    mode: "onBlur",
    defaultValues: {
      streamId: String(lesson.streamId),
      title: lesson.title,
      type: lesson.type ?? "",
      host: lesson.host ?? "",
      description: lesson.description ?? "",
      startTime: toDateTimeLocalValue(lesson.startTime),
      endTime: toDateTimeLocalValue(lesson.endTime),
      meetingLink: lesson.meetingLink ?? "",
      recordLink: lesson.recordLink ?? "",
    },
  });

  const { updateLesson } = useUpdateLesson(lesson.id, {
    async onSuccess() {
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Занятие обновлено",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при обновлении занятия",
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateLessonFormData> = async (data) => {
    await updateLesson({
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
        id={FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
        className={css.form}
      >
        {children}
      </form>
    </FormProvider>
  );
}

UpdateLessonForm.Fields = function UpdateLessonFormFields() {
  return (
    <>
      <StreamSelect />
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

UpdateLessonForm.SubmitButton = function UpdateLessonFormSubmitButton() {
  const {
    formState: { isSubmitting },
    trigger,
  } = useFormContext<UpdateLessonFormData>();
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
      isPending={isSubmitting}
      isDisabled={isSubmitting}
      fullWidth
      onClick={handleClick}
    >
      Сохранить изменения
    </Button>
  );
};
