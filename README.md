# ESoft Learn — Платформа управления Школой Программирования

Веб-приложение для автоматизации учебного процесса в школе программирования ESoft.
Заменяет разрозненный стек (Tilda → Google Forms → Google Sheets → ручная переписка в Telegram) единым инструментом для студентов, менторов, менеджеров и администраторов.

---

## Проблема (AS-IS)

Текущий процесс выглядит так:

1. Кандидат заполняет форму на Tilda — она перенаправляет его на Google Forms.
2. Ответы падают в Google Sheets. HR вручную просматривает таблицу и пишет решение в Telegram.
3. Домашние задания публикуются ссылками в Telegram-топиках. Студент сдаёт работу через ещё одну Google Form — ответы снова в таблице.
4. Ментор открывает Google Sheets, ищет строки своих студентов, переходит по ссылкам на GitHub PR, пишет фидбек в личку.

Итог: информация разбросана по чатам и таблицам, статусы нигде системно не отслеживаются, уведомления ручные, аналитика отсутствует.

## Решение (TO-BE)

ESoft Learn — единое окно для всех участников учебного процесса:

- **Менеджер** ведёт кандидатов на Kanban-доске (CRM). При переводе карточки в «Принят» система сама создаёт аккаунт студента, генерирует инвайт-ссылку с TTL и отправляет её на почту через BullMQ-очередь.
- **Студент** видит все задания с дедлайнами, сдаёт работу вставкой ссылки на GitHub PR, получает push-уведомления в Telegram когда ментор проверит.
- **Ментор** работает в Review-Board (Kanban): видит только своих студентов, двигает карточки drag-and-drop, оставляет оценку и комментарий — ревью идёт в журнал и тригерит уведомление студенту.
- **Администратор** управляет курсами, потоками, расписанием, пользователями. Генерирует закрытые инвайт-токены с TTL для онбординга сотрудников. Может войти в Review-Board любого ментора.

> Подробное описание процессов: [AS-IS / TO-BE](docs/product/as-is-to-be.md), [BPMN-диаграммы](docs/diagrams/esoft-learn.bpmn)

---

## Стек

| Слой                   | Технологии                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Frontend**           | React 19, TypeScript, React Router v7, TanStack Query, React Hook Form, Zod, Axios, Lucide React             |
| **Backend**            | Node.js, Fastify 5, Drizzle ORM, `@fastify/jwt`, Nodemailer, Zod, Pino                                       |
| **База данных**        | PostgreSQL 17                                                                                                |
| **Очереди**            | Redis 8, BullMQ — email-очередь, telegram-очередь, lead-очередь (авто-перевод в IGNORED), monitoring-очередь |
| **Telegram**           | grammY — push-уведомления студентам/менторам, анонсы лекций за 24ч, напоминания за 15 мин                    |
| **Инфраструктура**     | Turborepo (monorepo), Docker Compose, Mailpit (dev SMTP), CloudBeaver                                        |
| **API docs**           | Swagger / OpenAPI (`@fastify/swagger` + Scalar UI)                                                           |
| **Архитектура фронта** | Feature-Sliced Design (FSD)                                                                                  |
| **Общие контракты**    | `packages/schemas` — Zod-схемы, единый источник типов для фронта и бэка                                      |

---

## Роли (RBAC)

| Роль      | Что делает                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| `STUDENT` | Просматривает задания и дедлайны, сдаёт ДЗ ссылкой на GitHub PR, отслеживает историю проверок и успеваемость  |
| `MENTOR`  | Ведёт код-ревью на Kanban-доске, выставляет оценку и комментарий, смотрит журнал успеваемости своих студентов |
| `MANAGER` | Обрабатывает заявки кандидатов на CRM-доске, управляет расписанием                                            |
| `ADMIN`   | Полный доступ: курсы, потоки, задания, расписание, пользователи, инвайты, Review-Board любого ментора         |

---

## Ключевые процессы

### 1. Публичный приём заявки (Intake API)

Менеджер открывает набор в потоке — система выдаёт JWT-токен с `scope: "intake"` и `streamId`. Этот токен встраивается во внешнюю форму (Tilda, Google Forms или собственная). При сабмите форма делает `POST /intake` с токеном — заявка создаётся в БД и падает в CRM-доску менеджера.

```
Форма с ingest-токеном → POST /intake
  → валидация: поток должен быть в статусе ENROLLING
  → upsert Lead по email (повторная заявка обновляет данные)
  → карточка в колонке «Новые» на CRM-доске
```

### 2. Воронка зачисления (CRM)

```
Менеджер двигает карточку по статусам на Kanban-доске:
  NEW → IN_REVIEW → ACCEPTED / REJECTED / IGNORED

При ACCEPTED:
  → InviteService генерирует токен (хранится в Redis с TTL)
  → BullMQ email-очередь → письмо с инвайт-ссылкой
  → BullMQ lead-очередь → через N часов автоматически IGNORED, если студент не активировал аккаунт

При REJECTED:
  → BullMQ email-очередь → письмо об отказе
```

### 3. Активация аккаунта

Студент переходит по инвайт-ссылке → заполняет пароль → система создаёт `User` + `StudentProfile`, привязывает к потоку через `StreamStudent`.

### 4. Сдача и проверка домашнего задания

```
Студент → вставляет ссылку на GitHub PR → Submit
  → Submission создаётся со статусом NEW
  → BullMQ telegram-очередь → push ментору: «студент сдал ДЗ»
  → карточка появляется в колонке «Поступили» на Review-Board ментора

Ментор → drag-and-drop или кнопка в модалке → оценка + комментарий
  → Review записывается в БД (история проверок)
  → BullMQ telegram-очередь → push студенту: «зачтено» / «требует доработки»
```

### 5. Цикл доработок

При статусе `CHANGES_REQUESTED` студент исправляет код и нажимает «Отправить на перепроверку» (`updateSubmission`) — статус меняется на `RESUBMITTED`, ментор получает push. Карточка доработки отображается с приоритетом выше новых сдач.

### 6. Расписание и уведомления о лекциях

При создании/обновлении занятия `LessonScheduler` ставит в BullMQ два отложенных job-а:

- **announce** — за 24 часа до начала: Telegram-сообщение в групповой чат потока
- **reminder** — за 15 минут до начала: напоминание

При редактировании занятия старые job-ы отменяются, новые пересоздаются.

### 7. Жизненный цикл потока

```
ENROLLING → (startStream) → IN_PROGRESS → (finishStream) → FINISHED
```

- `startStream` — студенты получают доступ к дашборду и заданиям.
- `finishStream` — система меняет статус студентов на `GRADUATED` / `EXPELLED`, блокирует сдачу новых ДЗ. Есть `revertStreamFinish` для отката.

---

## Структура монорепы

```
├── apps
│   ├── backend
│   │   └── src
│   │       ├── libs
│   │       │   ├── bull          # BullMQ: 4 очереди (email, telegram, lead)
│   │       │   │   ├── queues    #   + 4 воркера
│   │       │   │   └── workers
│   │       │   ├── telegram      # grammY-бот: диспетчер, шаблоны сообщений
│   │       │   ├── mail          # Nodemailer: шаблоны писем (активация, отказ, зачисление)
│   │       │   ├── cache         # Redis-кэш (инвайт-токены)
│   │       │   └── config        # Конфиги окружения через envalid
│   │       ├── modules
│   │       │   ├── auth          # JWT, refresh-токены, инвайты (Redis TTL)
│   │       │   ├── user          # CRUD пользователей, профили
│   │       │   ├── crm           # Lead Pipeline, Intake API, CRM-доска
│   │       │   ├── lms
│   │       │   │   ├── course    # Курсы
│   │       │   │   ├── stream    # Потоки, lifecycle, менторы/студенты потока, Telegram-чат потока
│   │       │   │   ├── task      # Задания
│   │       │   │   ├── submission # Сдачи ДЗ + Review (оценки, история)
│   │       │   │   ├── student   # Успеваемость студента
│   │       │   │   └── journal   # Журнал успеваемости ментора
│   │       │   ├── schedule      # Расписание занятий + LessonScheduler
│   │       │   ├── notification  # In-app уведомления («колокольчик»)
│   │       │   └── profile       # Настройки профиля, привязка Telegram-аккаунта
│   │       └── routes            # Fastify-маршруты по доменам
│   └── frontend
│       └── src                   # Feature-Sliced Design
│           ├── pages
│           │   ├── student       # Dashboard (задания, дедлайны), расписание, успеваемость, профиль
│           │   ├── mentor        # Review-Board (Kanban), журнал, расписание, профиль
│           │   ├── manager       # CRM-доска, расписание, профиль
│           │   ├── admin         # Курсы, потоки, задания, расписание, пользователи
│           │   └── public        # Логин, активация, смена пароля, подтверждение зачисления
│           ├── widgets           # Review-Board, CRM-Board, таблицы, календарь, хедер
│           ├── features          # ~50 атомарных фич: submit-solution, create-task, update-lead-status и др.
│           ├── entities          # Бизнес-сущности: user, task, submission, lead
│           └── shared            # API-клиент (Axios), утилиты, интеграция с packages/ui
├── packages
│   ├── database                  # Drizzle ORM: схема (6 файлов), миграции, сиды
│   ├── schemas                   # Zod-контракты (~18 файлов) — единый источник типов фронт/бэк
│   ├── ui                        # Shared UI-kit: Button, Input, Modal, Badge и др.
│   └── eslint-config             # Общие правила линтера
└── docker-compose.yml            # PostgreSQL 17, Redis 8, Mailpit, CloudBeaver
```

---

## Схема базы данных

| Таблица                                                | Назначение                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `users`                                                | Все пользователи системы (роль: ADMIN / MANAGER / MENTOR / STUDENT)             |
| `student_profile`, `mentor_profile`, `manager_profile` | Профили по ролям                                                                |
| `user_telegram`                                        | Привязанный Telegram-аккаунт пользователя                                       |
| `courses`                                              | Учебные курсы                                                                   |
| `streams`                                              | Учебные потоки (статус: ENROLLING / IN_PROGRESS / FINISHED)                     |
| `stream_student`                                       | Связь студент ↔ поток ↔ ментор (статус: ACTIVE / GRADUATED / EXPELLED)          |
| `stream_mentor`                                        | Связь ментор ↔ поток                                                            |
| `stream_telegram`                                      | Telegram-чат, привязанный к потоку (для анонсов лекций)                         |
| `lessons`                                              | Занятия с Zoom-ссылкой, записью, временем и флагами отправки анонсов            |
| `tasks`                                                | Домашние задания с дедлайном и ссылкой на репозиторий-шаблон                    |
| `submission`                                           | Сдача ДЗ (статус: NEW / REVIEWING / CHANGES_REQUESTED / RESUBMITTED / ACCEPTED) |
| `reviews`                                              | История оценок ментора по каждой сдаче                                          |
| `leads`                                                | Заявки кандидатов (статус: NEW / IN_REVIEW / ACCEPTED / REJECTED / IGNORED)     |
| `notifications`                                        | In-app уведомления (статус: PENDING / SENT / FAILED, флаг is_silent)            |

---

## Notification Engine

Построен по паттерну Producer → Broker → Consumer:

1. **Producer** — при бизнес-событии Fastify-сервис пишет задачу в BullMQ (Redis) и сразу возвращает `200 OK`.
2. **Broker** — Redis хранит очереди, поддерживает отложенные задачи (`delay`) и rate-limit (max 25 telegram-сообщений/сек).
3. **Consumer** — 4 воркера обрабатывают очереди независимо:
   - `email.worker` — отправка писем через Nodemailer (активация, отказ, зачисление существующего пользователя)
   - `telegram.worker` — push-уведомления через grammY: уведомления о сдаче/проверке ДЗ, анонсы лекций, напоминания
   - `lead.worker` — отложенный автоперевод лида в статус `IGNORED` если студент не активировал аккаунт

Запись `notifications` в БД — персистентный слой для in-app «колокольчика» на дашборде и истории уведомлений.

---

## Быстрый старт

**Требования:** Docker + Docker Compose, Node.js 20+, pnpm 9+

```bash
git clone https://github.com/kyzne4ik/e-soft-final.git
cd e-soft-final

cp .env.example .env   # заполнить переменные

# Вариант 1 — Docker (всё в контейнерах)
docker compose up --build

# Вариант 2 — локально
pnpm install
pnpm -F database db:migrate    # применить миграции
pnpm -F database db:seed       # тестовые данные
pnpm dev           # параллельный запуск backend + frontend
```

### Адреса

| Сервис              | URL                        |
| ------------------- | -------------------------- |
| Frontend            | http://localhost:3001      |
| Backend API         | http://localhost:3000      |
| Swagger (API docs)  | http://localhost:3000/docs |
| Mailpit (dev email) | http://localhost:8025      |
| CloudBeaver (DB UI) | http://localhost:8978      |

---

## Тестовые аккаунты (после `pnpm db:seed`)

| Роль    | Email                 | Пароль      |
| ------- | --------------------- | ----------- |
| Admin   | admin@esoft.fake      | admin123    |
| Manager | nesterenko@esoft.fake | password123 |
| Mentor  | sapov@esoft.fake      | password123 |
| Mentor  | andreev@esoft.fake    | password123 |
| Student | student_1@esoft.fake  | password123 |

---

## Документация

- [AS-IS / TO-BE](docs/product/as-is-to-be.md)
- [BPMN-диаграммы](docs/diagrams/esoft-learn.bpmn) (stormbpmn.com / bpmn.io)
- [ER-диаграмма](docs/diagrams/erd.md)
- [Сущности системы](docs/diagrams/entities.md)
- [Postman-коллекция](postman/)
