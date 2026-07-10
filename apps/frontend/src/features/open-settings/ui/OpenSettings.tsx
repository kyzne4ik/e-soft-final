import type { ReactNode } from "react";
import { ProfileMenu } from "@repo/ui/molecules/profile-menu";
import {
  ModalSection,
  type ModalSectionProps,
} from "@repo/ui/organisms/modal-section";

export interface OpenSettingsMenuItemProps {
  onOpen: () => void;
}

function OpenSettingsMenuItem({ onOpen }: OpenSettingsMenuItemProps) {
  return (
    <ProfileMenu.Item icon="settings" onClick={onOpen}>
      Настройки
    </ProfileMenu.Item>
  );
}

export interface OpenSettingsModalProps extends Omit<
  ModalSectionProps,
  "children"
> {
  renderUpdateProfileForm: () => ReactNode;
  renderChangePasswordForm: () => ReactNode;
  renderTelegramForm: () => ReactNode;
}

function OpenSettingsModal({
  isOpen,
  onClose,
  renderUpdateProfileForm,
  renderChangePasswordForm,
  renderTelegramForm,
}: OpenSettingsModalProps) {
  return (
    <ModalSection isOpen={isOpen} onClose={onClose} defaultSection="personal">
      <ModalSection.Item id="personal" label="Личные данные" icon="user">
        {renderUpdateProfileForm()}
      </ModalSection.Item>
      <ModalSection.Item id="security" label="Безопасность" icon="lock">
        {renderChangePasswordForm()}
      </ModalSection.Item>
      <ModalSection.Item id="telegram" label="Telegram" icon="send">
        {renderTelegramForm()}
      </ModalSection.Item>
    </ModalSection>
  );
}

export const OpenSettings = {
  MenuItem: OpenSettingsMenuItem,
  Modal: OpenSettingsModal,
};
