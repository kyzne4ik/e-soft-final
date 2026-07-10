import { CopyField } from "./CopyField";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Molecules/CopyField",
  component: CopyField,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Ingest-токен",
    value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6MSwic2NvcGUiOiJpbnRha2UifQ.s7Kd9x",
  },
} satisfies Meta<typeof CopyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: { label: undefined },
};

export const ShortValue: Story = {
  args: { label: "Код приглашения", value: "A1B2-C3D4" },
};
