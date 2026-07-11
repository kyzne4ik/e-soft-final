import { VStack } from "./VStack";
import type { FlexGap } from "../flex/Flex";
import type { Meta, StoryObj } from "@storybook/react-vite";

const gaps: FlexGap[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 120,
      height: 48,
      padding: "0 12px",
      borderRadius: "var(--radius-md)",
      background: "var(--color-tertiary-light)",
      border: "1px solid var(--color-tertiary-medium)",
      color: "var(--color-tertiary-hover)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Layouts/VStack",
  component: VStack,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "inline-radio", options: gaps },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    justify: {
      control: "inline-radio",
      options: ["start", "center", "end", "between"],
    },
  },
} satisfies Meta<typeof VStack>;

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

export const Centered: Story = {
  args: {
    gap: "4",
    align: "center",
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
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
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
          <VStack gap={gap}>
            <Box />
            <Box />
            <Box />
          </VStack>
        </div>
      ))}
    </div>
  ),
};
