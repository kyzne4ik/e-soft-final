import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { Button } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { MentorSelect } from "./fields";
import { addMentorSchema, type AddMentorFormData } from "../model/types";
import css from "./AddMentorForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddMentor } from "../model/useAddMentor";

const FORM_ID = "add-mentor-form";

export function AddMentorForm({
  streamId,
  children,
}: {
  streamId: number;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<AddMentorFormData>({
    resolver: zodResolver(addMentorSchema),
    mode: "onBlur",
    defaultValues: {
      mentorId: "",
    },
  });

  const { addMentorAsync } = useAddMentor({
    async onSuccess() {
      form.reset();
      await getToast({
        type: "success",
        message: "Ментор добавлен в поток",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при добавлении ментора",
      });
    },
  });

  const onSubmit: SubmitHandler<AddMentorFormData> = async (data) => {
    await addMentorAsync({ streamId, mentorId: Number(data.mentorId) });
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

AddMentorForm.Fields = function AddMentorFormFields() {
  return (
    <>
      <MentorSelect />
    </>
  );
};

AddMentorForm.SubmitButton = function AddMentorFormSubmitButton() {
  const { trigger, formState } = useFormContext<AddMentorFormData>();
  const { getToast } = useToast();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) {
      await getToast({ type: "info", message: "Пожалуйста, выберите ментора" });
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
      Добавить ментора
    </Button>
  );
};
