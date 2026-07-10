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
import {
  FirstName,
  LastName,
  Patronymic,
  Email,
  Phone,
  Telegram,
  Experience,
  TestResult,
  TargetStreamSelect,
} from "./fields";
import { useCreateLead } from "../model/useCreateLead";
import { createLeadSchema, type CreateLeadFormData } from "../model/types";
import css from "./CreateLeadForm.module.css";

const FORM_ID = "create-lead-form";

export function CreateLeadForm({
  onSuccess,
  children,
}: {
  onSuccess?: () => void;
  children: ReactNode;
}) {
  const { getToast } = useToast();

  const form = useForm<CreateLeadFormData>({
    resolver: zodResolver(createLeadSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      email: "",
      phone: "",
      telegram: "",
      experience: "",
      testResult: "",
      targetStreamId: "",
    },
  });

  const { createLeadAsync } = useCreateLead({
    async onSuccess() {
      form.reset();
      onSuccess?.();
      await getToast({
        type: "success",
        message: "Заявка создана",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при создании заявки",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateLeadFormData> = async (data) => {
    await createLeadAsync({
      targetStreamId: Number(data.targetStreamId),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      patronymic: data.patronymic || null,
      phone: data.phone || null,
      telegram: data.telegram || null,
      experience: data.experience || null,
      testResult: data.testResult || null,
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

CreateLeadForm.Fields = function CreateLeadFormFields() {
  return (
    <>
      <TargetStreamSelect />
      <FirstName />
      <LastName />
      <Patronymic />
      <Email />
      <Phone />
      <Telegram />
      <Experience />
      <TestResult />
    </>
  );
};

CreateLeadForm.SubmitButton = function CreateLeadFormSubmitButton() {
  const { trigger, formState } = useFormContext<CreateLeadFormData>();
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
      Создать заявку
    </Button>
  );
};
