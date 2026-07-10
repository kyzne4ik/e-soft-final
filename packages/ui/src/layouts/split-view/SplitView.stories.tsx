import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplitView } from "./SplitView";

const meta = {
  title: "Layouts/SplitView",
  component: SplitView,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof SplitView>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-2)",
      padding: "var(--sp-4)",
    }}
  >
    {["Поток A", "Поток B", "Поток C", "Поток D"].map((name) => (
      <div
        key={name}
        style={{
          padding: "var(--sp-2) var(--sp-3)",
          borderRadius: "var(--radius-md)",
          background: "var(--surface-subtle)",
          border: "1px solid var(--surface-border)",
          fontSize: "var(--text-sm)",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        {name}
      </div>
    ))}
  </div>
);

const WorkspaceContent = ({ title = "Workspace" }: { title?: string }) => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      height: "100%",
      gap: "var(--sp-2)",
      color: "var(--text-secondary)",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-body)",
    }}
  >
    <span>{title}</span>
  </div>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      height: "400px",
      background: "var(--surface-base)",
      border: "1px solid var(--surface-border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      margin: "24px",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Shell>
      <SplitView>
        <SplitView.Sidebar>
          <SidebarContent />
        </SplitView.Sidebar>
        <SplitView.Workspace>
          <WorkspaceContent title="Выберите элемент слева" />
        </SplitView.Workspace>
      </SplitView>
    </Shell>
  ),
};

export const CustomWidth: Story = {
  args: { children: null },
  render: () => (
    <Shell>
      <SplitView>
        <SplitView.Sidebar width={320}>
          <SidebarContent />
        </SplitView.Sidebar>
        <SplitView.Workspace>
          <WorkspaceContent title="Sidebar width = 320px" />
        </SplitView.Workspace>
      </SplitView>
    </Shell>
  ),
};

export const NarrowSidebar: Story = {
  args: { children: null },
  render: () => (
    <Shell>
      <SplitView>
        <SplitView.Sidebar width={160}>
          <SidebarContent />
        </SplitView.Sidebar>
        <SplitView.Workspace>
          <WorkspaceContent title="Sidebar width = 160px" />
        </SplitView.Workspace>
      </SplitView>
    </Shell>
  ),
};

export const EmptyWorkspace: Story = {
  args: { children: null },
  render: () => (
    <Shell>
      <SplitView>
        <SplitView.Sidebar>
          <SidebarContent />
        </SplitView.Sidebar>
        <SplitView.Workspace>
          <WorkspaceContent title="Ничего не выбрано" />
        </SplitView.Workspace>
      </SplitView>
    </Shell>
  ),
};
