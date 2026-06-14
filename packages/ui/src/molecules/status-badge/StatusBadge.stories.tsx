import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Molecules/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    kind: {
      control: "inline-radio",
      options: ["submission", "lead", "stream"],
    },
  },
  args: { status: "NEW" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({
  kind,
  statuses,
}: {
  kind: "submission" | "lead" | "stream";
  statuses: string[];
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 420 }}>
    {statuses.map((status) => (
      <StatusBadge key={status} kind={kind} status={status} />
    ))}
  </div>
);

export const Submission: Story = {
  render: () => (
    <Row
      kind="submission"
      statuses={[
        "NEW",
        "REVIEWING",
        "CHANGES_REQUESTED",
        "RESUBMITTED",
        "ACCEPTED",
        "ARCHIVED",
      ]}
    />
  ),
};

export const Lead: Story = {
  render: () => (
    <Row
      kind="lead"
      statuses={["NEW", "IN_REVIEW", "ACCEPTED", "REJECTED", "IGNORED", "LOST"]}
    />
  ),
};

export const Stream: Story = {
  render: () => (
    <Row kind="stream" statuses={["ENROLLING", "IN_PROGRESS", "FINISHED"]} />
  ),
};

export const Single: Story = {
  args: { kind: "submission", status: "ACCEPTED" },
};
