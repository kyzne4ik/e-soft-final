import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "var(--sp-4)",
      color: "var(--text-secondary)",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-body)",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: { defaultValue: "overview", children: null },
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview" icon="layout-dashboard">
          Обзор
        </Tabs.Tab>
        <Tabs.Tab value="students" icon="users">
          Студенты
        </Tabs.Tab>
        <Tabs.Tab value="mentors" icon="graduation-cap">
          Менторы
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <Panel>Содержимое вкладки «Обзор»</Panel>
      </Tabs.Panel>
      <Tabs.Panel value="students">
        <Panel>Содержимое вкладки «Студенты»</Panel>
      </Tabs.Panel>
      <Tabs.Panel value="mentors">
        <Panel>Содержимое вкладки «Менторы»</Panel>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const NoIcons: Story = {
  args: { defaultValue: "a", children: null },
  render: () => (
    <Tabs defaultValue="a">
      <Tabs.List>
        <Tabs.Tab value="a">Первая</Tabs.Tab>
        <Tabs.Tab value="b">Вторая</Tabs.Tab>
        <Tabs.Tab value="c">Третья</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">
        <Panel>Панель A</Panel>
      </Tabs.Panel>
      <Tabs.Panel value="b">
        <Panel>Панель B</Panel>
      </Tabs.Panel>
      <Tabs.Panel value="c">
        <Panel>Панель C</Panel>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  args: { defaultValue: "one", children: null },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tab, setTab] = (window as any).React?.useState
      ? (window as any).React.useState("one")
      : ["one", () => {}];
    return (
      <Tabs value={tab} onChange={setTab} defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
          <Tabs.Tab value="two">Two</Tabs.Tab>
          <Tabs.Tab value="three">Three</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">
          <Panel>Panel One — active: {tab}</Panel>
        </Tabs.Panel>
        <Tabs.Panel value="two">
          <Panel>Panel Two — active: {tab}</Panel>
        </Tabs.Panel>
        <Tabs.Panel value="three">
          <Panel>Panel Three — active: {tab}</Panel>
        </Tabs.Panel>
      </Tabs>
    );
  },
};
