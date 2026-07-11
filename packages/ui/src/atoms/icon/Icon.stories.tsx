import { Icon } from "./Icon";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { name: "sparkles", size: 32 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => {
    const names = [
      "check",
      "x",
      "sparkles",
      "refresh-cw",
      "inbox",
      "alert-triangle",
      "check-circle-2",
      "trophy",
      "flame",
      "book-open",
    ];
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 360 }}
      >
        {names.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              width: 64,
            }}
          >
            <Icon name={name} size={24} color="var(--color-primary)" />
            <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
