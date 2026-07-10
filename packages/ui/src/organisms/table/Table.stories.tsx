import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { Table } from "./Table";
import { Avatar } from "../../atoms/avatar";
import { Icon } from "../../atoms/icon";

const meta = {
  title: "Organisms/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "3px 10px",
  borderRadius: "var(--radius-pill)",
  fontSize: "var(--text-xs)",
  fontWeight: "var(--weight-medium)",
  whiteSpace: "nowrap",
};

const Role = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      ...pill,
      background: "var(--surface-muted)",
      color: "var(--text-secondary)",
    }}
  >
    {children}
  </span>
);

const Activation = ({ ok }: { ok: boolean }) =>
  ok ? (
    <span
      style={{
        ...pill,
        background: "var(--color-success-bg)",
        color: "var(--color-success-text)",
      }}
    >
      ✓ Активирован
    </span>
  ) : (
    <span
      style={{
        ...pill,
        background: "var(--color-warning-bg)",
        color: "var(--color-warning-text)",
      }}
    >
      Ждёт инвайт
    </span>
  );

interface User {
  name: string;
  initials: string;
  color: string;
  email: string;
  role: string;
  activated: boolean;
  status: string;
}

const USERS: User[] = [
  {
    name: "Михаил Орлов",
    initials: "МО",
    color: "#3b82f6",
    email: "m.orlov@esoft.dev",
    role: "Студент",
    activated: true,
    status: "Активен",
  },
  {
    name: "Елена Кузнецова",
    initials: "ЕК",
    color: "#ec4899",
    email: "e.kuznetsova@esoft.dev",
    role: "Студент",
    activated: true,
    status: "Активен",
  },
  {
    name: "Артём Соколов",
    initials: "АС",
    color: "#f97316",
    email: "a.sokolov@esoft.dev",
    role: "Ментор",
    activated: true,
    status: "Активен",
  },
  {
    name: "Дарья Власова",
    initials: "ДВ",
    color: "#8b5cf6",
    email: "d.vlasova@esoft.dev",
    role: "Менеджер",
    activated: true,
    status: "Активен",
  },
  {
    name: "Никита Волков",
    initials: "НВ",
    color: "#22c55e",
    email: "n.volkov@esoft.dev",
    role: "Студент",
    activated: false,
    status: "Активен",
  },
  {
    name: "Игорь Лебедев",
    initials: "ИЛ",
    color: "#3b82f6",
    email: "i.lebedev@esoft.dev",
    role: "Админ",
    activated: true,
    status: "Активен",
  },
  {
    name: "Софья Лебедева",
    initials: "СЛ",
    color: "#6366f1",
    email: "s.lebedeva@esoft.dev",
    role: "Студент",
    activated: true,
    status: "Выпускник",
  },
  {
    name: "Павел Зайцев",
    initials: "ПЗ",
    color: "#14b8a6",
    email: "p.zaitsev@esoft.dev",
    role: "Студент",
    activated: true,
    status: "Отчислен",
  },
];

const Header = () => (
  <Table.Row>
    <Table.HeaderCell>Пользователь</Table.HeaderCell>
    <Table.HeaderCell>Email</Table.HeaderCell>
    <Table.HeaderCell>Роль</Table.HeaderCell>
    <Table.HeaderCell>Активация</Table.HeaderCell>
    <Table.HeaderCell>Статус</Table.HeaderCell>
    <Table.HeaderCell align="right" aria-label="Действие" />
  </Table.Row>
);

const UserRow = ({ user }: { user: User }) => (
  <Table.Row onClick={() => {}}>
    <Table.Cell>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <Avatar
          person={{
            name: user.name,
            initials: user.initials,
            color: user.color,
          }}
          size={36}
        />
        <span
          style={{
            fontWeight: "var(--weight-semibold)",
            color: "var(--text-primary)",
          }}
        >
          {user.name}
        </span>
      </span>
    </Table.Cell>
    <Table.Cell>{user.email}</Table.Cell>
    <Table.Cell>
      <Role>{user.role}</Role>
    </Table.Cell>
    <Table.Cell>
      <Activation ok={user.activated} />
    </Table.Cell>
    <Table.Cell>{user.status}</Table.Cell>
    <Table.Cell align="right">
      <Icon name="chevron-right" size={18} />
    </Table.Cell>
  </Table.Row>
);

export const Users: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Пользователь</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Роль</Table.HeaderCell>
          <Table.HeaderCell>Активация</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.HeaderCell align="right" aria-label="Действие" />
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {USERS.map((user) => (
          <Table.Row key={user.email} onClick={() => {}}>
            <Table.Cell>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Avatar
                  person={{
                    name: user.name,
                    initials: user.initials,
                    color: user.color,
                  }}
                  size={36}
                />
                <span
                  style={{
                    fontWeight: "var(--weight-semibold)",
                    color: "var(--text-primary)",
                  }}
                >
                  {user.name}
                </span>
              </span>
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <Role>{user.role}</Role>
            </Table.Cell>
            <Table.Cell>
              <Activation ok={user.activated} />
            </Table.Cell>
            <Table.Cell>{user.status}</Table.Cell>
            <Table.Cell align="right">
              <Icon name="chevron-right" size={18} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <Table maxHeight={320}>
      <Table.Head sticky>
        <Header />
      </Table.Head>
      <Table.Body>
        {[...USERS, ...USERS].map((user, i) => (
          <UserRow key={`${user.email}-${i}`} user={user} />
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Header />
      </Table.Head>
      <Table.Body>
        <Table.Empty colSpan={6} message="Пользователи не найдены" />
      </Table.Body>
    </Table>
  ),
};
