# ESoft Learn — Frontend

SPA на React 19 + TypeScript, архитектура Feature-Sliced Design (FSD).

## Стек

- React 19, React Router v7
- TanStack Query (server state), React Hook Form + Zod (формы)
- Axios (HTTP-клиент)
- Lucide React (иконки)
- Shared UI-kit из `packages/ui`

## Структура (`src/`)

```
app/          # Роутинг, глобальные стили, провайдеры
pages/
  student/    # Dashboard, задания, расписание, успеваемость, профиль
  mentor/     # Review-Board, журнал успеваемости, расписание, профиль
  manager/    # CRM-доска, расписание, профиль
  admin/      # Курсы, потоки, задания, расписание, пользователи
  public/     # Логин, активация аккаунта
widgets/      # Review-Board, CRM-Board, таблицы, календарь, хедер
features/     # Атомарные пользовательские сценарии (submit-solution, create-task и др.)
entities/     # Бизнес-сущности: user, task, submission, lead
shared/       # API-клиент, утилиты, интеграция с packages/ui
```

## Запуск

```bash
# из корня монорепы
pnpm dev

# только фронтенд
pnpm --filter @repo/frontend dev
```

## Переменные окружения

```env
VITE_API_URL=http://localhost:3000
VITE_PORT=5173
VITE_USE_MOCKS=false
VITE_ENABLE_DEVTOOLS=true
```
