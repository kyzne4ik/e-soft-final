import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Sheet } from "./Sheet";
import { Text } from "../../atoms/text";
import { Button } from "../../atoms/button";

const meta = {
  title: "Organisms/Sheet",
  component: Sheet,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({
  side = "right",
  withFooter = false,
}: {
  side?: "right" | "left";
  withFooter?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div style={{ padding: 24 }}>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Открыть Sheet ({side})
      </Button>

      <Sheet isOpen={isOpen} onClose={close} side={side}>
        <Sheet.Header onClose={close}>
          <Text.H2>Заголовок</Text.H2>
        </Sheet.Header>
        <Sheet.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sp-3)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--sp-3) var(--sp-4)",
                  background: "var(--surface-subtle)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                Элемент {i + 1}
              </div>
            ))}
          </div>
        </Sheet.Body>
        {withFooter ? (
          <Sheet.Footer>
            <Button variant="ghost" size="sm" onClick={close}>
              Отмена
            </Button>
            <Button size="sm">Сохранить</Button>
          </Sheet.Footer>
        ) : null}
      </Sheet>
    </div>
  );
}

export const Right: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <Demo side="right" />,
};

export const Left: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <Demo side="left" />,
};

export const WithFooter: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <Demo side="right" withFooter />,
};
