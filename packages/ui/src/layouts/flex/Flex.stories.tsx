import { Flex, type FlexGap } from "./Flex";
import type { Meta, StoryObj } from "@storybook/react-vite";

const gaps: FlexGap[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

const spTokens: Record<FlexGap, string> = {
  1: "--sp-1 · 4px",
  2: "--sp-2 · 8px",
  3: "--sp-3 · 12px",
  4: "--sp-4 · 16px",
  5: "--sp-5 · 24px",
  6: "--sp-6 · 32px",
  7: "--sp-7 · 48px",
  8: "--sp-8 · 64px",
};

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
      background: "var(--color-primary-light)",
      border: "1px solid var(--color-primary-medium)",
      color: "var(--color-primary-hover)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Layouts/Flex",
  component: Flex,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "inline-radio", options: gaps },
    justify: {
      control: "inline-radio",
      options: ["start", "center", "end", "between"],
    },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    direction: { control: "inline-radio", options: ["row", "column"] },
  },
} satisfies Meta<typeof Flex>;

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

export const GapScale: Story = {
  args: { children: null },
  render: () => (
    <Flex direction="column" gap="5" align="start">
      {gaps.map((gap) => (
        <Flex key={gap} direction="column" gap="2" align="start">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
            }}
          >
            gap=&quot;{gap}&quot; → {spTokens[gap]}
          </span>
          <Flex gap={gap}>
            <Box />
            <Box />
            <Box />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Justify: Story = {
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

export const Column: Story = {
  args: {
    gap: "3",
    direction: "column",
    align: "start",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};
