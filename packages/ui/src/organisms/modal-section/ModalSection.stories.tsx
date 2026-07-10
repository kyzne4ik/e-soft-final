import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ModalSection } from "./ModalSection";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Chip } from "../../atoms/chip";
import { Flex } from "../../layouts/flex";
import { VStack } from "../../layouts/v-stack";

const meta = {
  title: "Organisms/ModalSection",
  component: ModalSection,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { onClose: () => {}, children: null },
} satisfies Meta<typeof ModalSection>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProfileDemo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => setIsOpen(true)}>Открыть профиль</Button>

      <ModalSection
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultSection="personal"
      >
        <ModalSection.Item id="personal" label="Личные данные" icon="user">
          <VStack gap="4" max>
            <Input label="Имя" defaultValue="Михаил" fullWidth />
            <Input label="Фамилия" defaultValue="Орлов" fullWidth />
            <Input label="Отчество" defaultValue="Игоревич" fullWidth />
            <Input
              label="Email"
              type="email"
              defaultValue="m.orlov@esoft.dev"
              fullWidth
            />
            <Flex justify="end" max>
              <Button>Сохранить</Button>
            </Flex>
          </VStack>
        </ModalSection.Item>

        <ModalSection.Item id="security" label="Безопасность" icon="lock">
          <VStack gap="4" max>
            <Input
              label="Текущий пароль"
              type="password"
              placeholder="••••••••"
              fullWidth
            />
            <Input
              label="Новый пароль"
              type="password"
              placeholder="••••••••"
              fullWidth
            />
            <Input
              label="Повторите пароль"
              type="password"
              placeholder="••••••••"
              fullWidth
            />
            <Flex justify="end" max>
              <Button>Обновить пароль</Button>
            </Flex>
          </VStack>
        </ModalSection.Item>

        <ModalSection.Item id="telegram" label="Telegram" icon="send">
          <ModalSection.Row
            label="Telegram"
            description="Уведомления о ревью и дедлайнах приходят в личку"
          >
            <Chip kind="status" status="not-started">
              Не привязан
            </Chip>
          </ModalSection.Row>
          <ModalSection.Row
            label="Привязка аккаунта"
            description="Перейдите по ссылке и подтвердите в боте"
          >
            <Button variant="secondary">Привязать</Button>
          </ModalSection.Row>
        </ModalSection.Item>
      </ModalSection>
    </div>
  );
}

export const Profile: Story = { render: () => <ProfileDemo /> };
