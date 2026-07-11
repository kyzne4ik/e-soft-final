import { HStack } from "./HStack";
import type { FlexGap } from "../flex/Flex";
import type { Meta, StoryObj } from "@storybook/react-vite";

const gaps: FlexGap[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 48,
      height: 48,
      padding: "0 12px",
      borderRadius: "var(--radius-md)",
      background: "var(--color-secondary-light)",
      border: "1px solid var(--color-secondary-medium)",
      color: "var(--color-secondary-hover)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Layouts/HStack",
  component: HStack,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "inline-radio", options: gaps },
    justify: {
      control: "inline-radio",
      options: ["start", "center", "end", "between"],
    },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
  },
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: "4",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    gap: "4",
    justify: "between",
    max: true,
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const GapScale: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {gaps.map((gap) => (
        <div
          key={gap}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
            }}
          >
            gap=&quot;{gap}&quot;
          </span>
          <HStack gap={gap}>
            <Box />
            <Box />
            <Box />
          </HStack>
        </div>
      ))}
    </div>
  ),
};
