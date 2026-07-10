import { fn } from "storybook/test";
import { Pagination } from "./Pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
  },
  args: {
    onChange: fn(),
    meta: {
      page: 1,
      limit: 10,
      total: 120,
      totalPages: 12,
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MiddlePage: Story = {
  args: {
    meta: {
      page: 6,
      limit: 10,
      total: 120,
      totalPages: 12,
    },
  },
};

export const LastPage: Story = {
  args: {
    meta: {
      page: 12,
      limit: 10,
      total: 120,
      totalPages: 12,
    },
  },
};

export const FewPages: Story = {
  args: {
    meta: {
      page: 2,
      limit: 10,
      total: 50,
      totalPages: 5,
    },
  },
};

export const ManySiblings: Story = {
  args: {
    siblingCount: 2,
    meta: {
      page: 6,
      limit: 10,
      total: 120,
      totalPages: 12,
    },
  },
};

export const SinglePage: Story = {
  args: {
    meta: {
      page: 1,
      limit: 10,
      total: 5,
      totalPages: 1,
    },
  },
};
