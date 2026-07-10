import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, type ModalProps } from "@repo/ui/organisms/modal";
import { Button } from "@repo/ui/atoms/button";
import { CopyField } from "@repo/ui/molecules/copy-field";
import { Text } from "@repo/ui/atoms/text";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { ExpiresInSelect } from "./fields";
import { useOpenIntake } from "../model/useOpenIntake";
import { openIntakeSchema, type OpenIntakeFormData } from "../model/types";
import css from "./OpenIntakeModal.module.css";

export interface OpenIntakeModalProps extends Pick<
  ModalProps,
  "isOpen" | "onClose"
> {
  streamId: number;
}

export function OpenIntakeModal({
  streamId,
  isOpen,
  onClose,
}: OpenIntakeModalProps) {
  const { getToast } = useToast();

  const { openIntake, isPending, token, reset } = useOpenIntake({
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Не удалось открыть приём",
      });
    },
  });

  const form = useForm<OpenIntakeFormData>({
    resolver: zodResolver(openIntakeSchema),
    mode: "onBlur",
    defaultValues: {
      expiresIn: "",
    },
  });

  const handleClose = () => {
    reset();
    form.reset();
    onClose();
  };

  const onSubmit = (data: OpenIntakeFormData) => {
    openIntake({ streamId, expiresIn: Number(data.expiresIn) });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Открыть приём заявок">
      {token ? (
        <>
          <Modal.Body>
            <div className={css.result}>
              <Text.P2>
                Приём открыт. Скопируйте токен — он показывается один раз и
                используется в публичной форме заявок.
              </Text.P2>
              <CopyField value={token} label="Ingest-токен" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Готово</Button>
          </Modal.Footer>
        </>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Modal.Body>
              <ExpiresInSelect />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                isPending={isPending}
                isDisabled={isPending}
                fullWidth
              >
                Открыть приём
              </Button>
            </Modal.Footer>
          </form>
        </FormProvider>
      )}
    </Modal>
  );
}
