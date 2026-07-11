import { OpenSettings } from "@/features/open-settings";
import { UpdateProfileForm } from "@/features/update-profile";
import { ChangePasswordForm } from "@/features/change-password";
import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { ModalSection } from "@repo/ui/organisms/modal-section";
import { telegramQuery } from "@/entities/profile";
import { BindTelegramForm } from "@/features/bind-telegram";
import { UnbindTelegramButton } from "@/features/unbind-telegram";
import { GenerateTelegramLinkButton } from "@/features/generate-telegram-link";
import { atUsername } from "@/shared/lib/utils";

export interface ProfileMenuSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenuSettings({
  isOpen,
  onClose,
}: ProfileMenuSettingsProps) {
  const { data } = useAuth();
  const user = data?.data;

  return (
    <OpenSettings.Modal
      isOpen={isOpen}
      onClose={onClose}
      renderUpdateProfileForm={() =>
        user ? (
          <UpdateProfileForm>
            <UpdateProfileForm.Fields />
            <UpdateProfileForm.SubmitButton />
          </UpdateProfileForm>
        ) : null
      }
      renderChangePasswordForm={() => (
        <ChangePasswordForm>
          <ChangePasswordForm.Fields />
          <ChangePasswordForm.SubmitButton />
        </ChangePasswordForm>
      )}
      renderTelegramForm={() => <TelegramSection />}
    />
  );
}

export function TelegramSection() {
  const { data } = useQuery(telegramQuery());
  const telegram = data?.data;

  if (telegram?.tgId) {
    return (
      <ModalSection.Row
        label="Telegram"
        description={
          telegram.tgUsername
            ? `Привязан: ${atUsername(telegram.tgUsername)}`
            : "Аккаунт привязан"
        }
      >
        <UnbindTelegramButton />
      </ModalSection.Row>
    );
  }

  return (
    <>
      <ModalSection.Row
        label="Быстрая привязка"
        className=""
        description="Сгенерируйте ссылку и перейдите в бот — он привяжет аккаунт автоматически"
      >
        <GenerateTelegramLinkButton />
      </ModalSection.Row>
      <BindTelegramForm />
    </>
  );
}
