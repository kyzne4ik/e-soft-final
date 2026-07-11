import { db } from "../../src/index";
import { courses, lessons, streams, tasks } from "../../src/db/content";
import { leads } from "../../src/db/crm";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";
import type { managerProfile } from "../../src/db/core";

type ManagerProfile = InferSelectModel<typeof managerProfile>;

export async function seedContent(managerProf: ManagerProfile) {
  const [jsDevCourse, devopsCourse] = await db
    .insert(courses)
    .values([
      {
        name: "Школа программирования",
        description:
          "Полный курс веб-разработки: Frontend (React/TS), Backend (Node.js/Fastify), БД (PostgreSQL/Prisma), DevOps (Docker/CI).",
      },
      {
        name: "DevOps-инженер",
        description:
          "Курс по DevOps: Linux, Docker, Kubernetes, CI/CD, мониторинг.",
      },
    ])
    .returning();

  if (!jsDevCourse || !devopsCourse)
    throw new Error("Не удалось создать курсы");

  const [activeStream, finishedStream, enrollingStream] = await db
    .insert(streams)
    .values([
      {
        name: "ШП-2026",
        courseId: jsDevCourse.id,
        status: "IN_PROGRESS",
      },
      {
        name: "ШП-2025",
        courseId: jsDevCourse.id,
        status: "FINISHED",
      },
      {
        name: "DevOps-2026",
        courseId: devopsCourse.id,
        status: "ENROLLING",
      },
    ])
    .returning();

  if (!activeStream || !enrollingStream || !finishedStream)
    throw new Error("Не удалось создать потоки");

  await db.insert(lessons).values([
    {
      streamId: activeStream.id,
      title: "Вводная лекция",
      startTime: new Date("2026-04-06T15:00:00Z"),
      endTime: new Date("2026-04-06T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Git: VCS, ветвление, слияние, rebase, конфликты",
      startTime: new Date("2026-04-08T15:00:00Z"),
      endTime: new Date("2026-04-08T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Войти в IT — направления разработки",
      startTime: new Date("2026-04-11T15:00:00Z"),
      endTime: new Date("2026-04-11T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "React: Virtual DOM, JSX, CRA, ReactDOM, Fragment",
      startTime: new Date("2026-04-13T15:00:00Z"),
      endTime: new Date("2026-04-13T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Reconciliation, списки, key, useState, поток данных",
      startTime: new Date("2026-04-15T15:00:00Z"),
      endTime: new Date("2026-04-15T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "useEffect, useLayoutEffect, жизненный цикл, useRef, Portals",
      startTime: new Date("2026-04-18T15:00:00Z"),
      endTime: new Date("2026-04-18T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title:
        "Продвинутые хуки: useContext, useReducer, useMemo, useCallback, Custom Hooks",
      startTime: new Date("2026-04-21T15:00:00Z"),
      endTime: new Date("2026-04-21T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Работа с формами, валидация (RHF + Zod)",
      startTime: new Date("2026-04-23T15:00:00Z"),
      endTime: new Date("2026-04-23T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "TypeScript: основы через React",
      startTime: new Date("2026-04-24T15:00:00Z"),
      endTime: new Date("2026-04-24T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Роутинг: React Router v6",
      startTime: new Date("2026-04-27T15:00:00Z"),
      endTime: new Date("2026-04-27T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "State Managers: Zustand vs Redux",
      startTime: new Date("2026-04-29T15:00:00Z"),
      endTime: new Date("2026-04-29T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Работа с API: TanStack Query",
      startTime: new Date("2026-04-30T15:00:00Z"),
      endTime: new Date("2026-04-30T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "UI-Kit, Atomic Design, Storybook",
      startTime: new Date("2026-05-02T15:00:00Z"),
      endTime: new Date("2026-05-02T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/storybook",
    },
    {
      streamId: activeStream.id,
      title: "Архитектура фронтенда: FSD + SSR/SSG",
      startTime: new Date("2026-05-04T15:00:00Z"),
      endTime: new Date("2026-05-04T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/SSR_and_FSD",
    },
    {
      streamId: activeStream.id,
      title: "Node.js: устройство + Fastify старт",
      startTime: new Date("2026-05-06T15:00:00Z"),
      endTime: new Date("2026-05-06T17:00:00Z"),
      recordLink:
        "https://github.com/AlexanderFromEarth/node-server-esoftsp-example",
    },
    {
      streamId: activeStream.id,
      title: "Fastify: реальное приложение",
      startTime: new Date("2026-05-08T15:00:00Z"),
      endTime: new Date("2026-05-08T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Трёхслойная архитектура",
      startTime: new Date("2026-05-12T15:00:00Z"),
      endTime: new Date("2026-05-12T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/backend-architecture",
    },
    {
      streamId: activeStream.id,
      title: "TypeScript Intermediate: Generics и Utility Types",
      startTime: new Date("2026-05-14T15:00:00Z"),
      endTime: new Date("2026-05-14T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/18_TS_GENERICS",
    },
    {
      streamId: activeStream.id,
      title: "Авторизация через JWT",
      startTime: new Date("2026-05-15T15:00:00Z"),
      endTime: new Date("2026-05-15T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/backend_auth",
    },
    {
      streamId: activeStream.id,
      title: "Введение в PostgreSQL",
      startTime: new Date("2026-05-18T15:00:00Z"),
      endTime: new Date("2026-05-18T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "DDL, DML, DQL: управление структурой и данными",
      startTime: new Date("2026-05-20T15:00:00Z"),
      endTime: new Date("2026-05-20T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Ключи, нормализация, JOIN'ы",
      startTime: new Date("2026-05-22T15:00:00Z"),
      endTime: new Date("2026-05-22T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Индексы, EXPLAIN ANALYZE, Views",
      startTime: new Date("2026-05-25T15:00:00Z"),
      endTime: new Date("2026-05-25T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Query Builder: Knex.js",
      startTime: new Date("2026-05-27T15:00:00Z"),
      endTime: new Date("2026-05-27T17:00:00Z"),
      recordLink:
        "https://github.com/AlexanderFromEarth/node-server-esoftsp-example/tree/fastify-knex",
    },
    {
      streamId: activeStream.id,
      title: "ORM: миграции, N+1, connection pool (Prisma)",
      startTime: new Date("2026-05-29T15:00:00Z"),
      endTime: new Date("2026-05-29T17:00:00Z"),
      recordLink:
        "https://github.com/AlexanderFromEarth/node-server-esoftsp-example/tree/fastify-prisma",
    },
    {
      streamId: activeStream.id,
      title: "Транзакции: ACID, уровни изоляции, deadlocks",
      startTime: new Date("2026-06-01T15:00:00Z"),
      endTime: new Date("2026-06-01T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "TypeScript Advanced: infer, mapped, conditional types",
      startTime: new Date("2026-06-03T15:00:00Z"),
      endTime: new Date("2026-06-03T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/TS-advanced",
    },
    {
      streamId: activeStream.id,
      title: "SOLID + Dependency Injection",
      startTime: new Date("2026-06-05T15:00:00Z"),
      endTime: new Date("2026-06-05T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/DI-example",
    },
    {
      streamId: activeStream.id,
      title: "Nest.js",
      startTime: new Date("2026-06-09T15:00:00Z"),
      endTime: new Date("2026-06-09T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/NEST",
    },
    {
      streamId: activeStream.id,
      title: "Тестирование бэкенда: Jest + Supertest",
      startTime: new Date("2026-06-10T15:00:00Z"),
      endTime: new Date("2026-06-10T17:00:00Z"),
      recordLink: "https://github.com/BubbaCat/L_tests_backend/tree/master",
    },
    {
      streamId: activeStream.id,
      title: "Кеширование (Redis)",
      startTime: new Date("2026-06-15T15:00:00Z"),
      endTime: new Date("2026-06-15T17:00:00Z"),
      recordLink:
        "https://github.com/AlexanderFromEarth/node-server-esoftsp-example/tree/fastify-redis",
    },
    {
      streamId: activeStream.id,
      title: "Очереди (BullMQ)",
      startTime: new Date("2026-06-17T15:00:00Z"),
      endTime: new Date("2026-06-17T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Системная архитектура (обзор)",
      startTime: new Date("2026-06-19T15:00:00Z"),
      endTime: new Date("2026-06-19T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Docker: образы, контейнеры, Dockerfile",
      startTime: new Date("2026-06-22T15:00:00Z"),
      endTime: new Date("2026-06-22T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Docker Compose + GitHub Actions + Deploy",
      startTime: new Date("2026-06-23T15:00:00Z"),
      endTime: new Date("2026-06-23T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Тестирование: виды, инструменты, зоны ответственности",
      startTime: new Date("2026-06-24T15:00:00Z"),
      endTime: new Date("2026-06-24T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Жизненный цикл ПО и Agile/Scrum",
      startTime: new Date("2026-06-26T15:00:00Z"),
      endTime: new Date("2026-06-26T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "Роли в команде и зоны ответственности",
      startTime: new Date("2026-06-29T15:00:00Z"),
      endTime: new Date("2026-06-29T17:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "HR: Позиционирование на рынке",
      startTime: new Date("2026-07-01T15:00:00Z"),
      endTime: new Date("2026-07-01T17:00:00Z"),
    },
  ]);

  const MENTORS: [string, string, string, string] = [
    "Евгений Сапов",
    "Владислав Задорожнюк",
    "Алексей Андреев",
    "Илья Киреев",
  ];

  const LESSON_META: Record<
    string,
    { type: string; host: string; description: string }
  > = {
    "Вводная лекция": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Знакомство с командой, форматом обучения и дорожной картой курса. Расскажем, что вас ждёт и как получить максимум от обучения.",
    },
    "Git: VCS, ветвление, слияние, rebase, конфликты": {
      type: "Семинар",
      host: MENTORS[1],
      description:
        "Разберём систему контроля версий Git: ветвление, слияние, rebase, разрешение конфликтов и работу с удалёнными репозиториями.",
    },
    "Войти в IT — направления разработки": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Обзор ролей и направлений в IT-индустрии. Поможем определиться с вектором развития карьеры.",
    },
    "React: Virtual DOM, JSX, CRA, ReactDOM, Fragment": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Первое знакомство с React: виртуальный DOM, JSX-синтаксис, создание приложения через CRA и работа с Fragment.",
    },
    "Reconciliation, списки, key, useState, поток данных": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Алгоритм обновления DOM в React, работа со списками и ключами, хук useState и однонаправленный поток данных.",
    },
    "useEffect, useLayoutEffect, жизненный цикл, useRef, Portals": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Управление побочными эффектами с useEffect и useLayoutEffect, жизненный цикл компонентов, работа с DOM через useRef и Portals.",
    },
    "Продвинутые хуки: useContext, useReducer, useMemo, useCallback, Custom Hooks":
      {
        type: "Семинар",
        host: MENTORS[2],
        description:
          "Углублённое изучение хуков React: управление состоянием, оптимизация рендеров и написание собственных хуков.",
      },
    "Работа с формами, валидация (RHF + Zod)": {
      type: "Семинар",
      host: MENTORS[1],
      description:
        "Управляемые и неуправляемые формы, React Hook Form, валидация схем через Zod, обработка ошибок.",
    },
    "TypeScript: основы через React": {
      type: "Лекция",
      host: MENTORS[3],
      description:
        "Введение в TypeScript: типы, интерфейсы, дженерики на практических примерах React-компонентов.",
    },
    "Роутинг: React Router v6": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Клиентская маршрутизация с React Router v6: вложенные маршруты, параметры, защищённые роуты, навигация.",
    },
    "State Managers: Zustand vs Redux": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Сравнение подходов к управлению глобальным состоянием: Zustand и Redux Toolkit, выбор инструмента под задачу.",
    },
    "Работа с API: TanStack Query": {
      type: "Семинар",
      host: MENTORS[1],
      description:
        "Загрузка данных, кеширование и синхронизация с сервером через TanStack Query (React Query).",
    },
    "UI-Kit, Atomic Design, Storybook": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Атомарный дизайн, построение переиспользуемых компонентов и документирование UI-кита в Storybook.",
    },
    "Архитектура фронтенда: FSD + SSR/SSG": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Feature-Sliced Design как подход к структуре проекта, рендеринг на сервере (SSR) и статическая генерация (SSG).",
    },
    "Node.js: устройство + Fastify старт": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Событийный цикл Node.js, модульная система, создание HTTP-сервера на Fastify.",
    },
    "Fastify: реальное приложение": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Плагины, схемы валидации, хуки жизненного цикла и построение REST API на Fastify.",
    },
    "Трёхслойная архитектура": {
      type: "Лекция",
      host: MENTORS[3],
      description:
        "Разделение на слои: контроллеры, сервисы, репозитории. Принципы чистой архитектуры бэкенда.",
    },
    "TypeScript Intermediate: Generics и Utility Types": {
      type: "Лекция",
      host: MENTORS[3],
      description:
        "Дженерики, utility types (Partial, Required, Pick, Omit), условные типы и mapped types.",
    },
    "Авторизация через JWT": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Механизм JWT: создание, проверка токенов, refresh-схема, защита роутов.",
    },
    "Введение в PostgreSQL": {
      type: "Лекция",
      host: MENTORS[1],
      description:
        "Реляционная модель данных, установка и настройка PostgreSQL, основные типы данных.",
    },
    "DDL, DML, DQL: управление структурой и данными": {
      type: "Семинар",
      host: MENTORS[1],
      description:
        "CREATE/ALTER/DROP таблиц, INSERT/UPDATE/DELETE данных, SELECT и фильтрация.",
    },
    "Ключи, нормализация, JOIN'ы": {
      type: "Семинар",
      host: MENTORS[1],
      description:
        "Первичные и внешние ключи, нормальные формы, INNER/LEFT/RIGHT/FULL JOIN.",
    },
    "Индексы, EXPLAIN ANALYZE, Views": {
      type: "Лекция",
      host: MENTORS[1],
      description:
        "Оптимизация запросов с индексами, анализ плана выполнения и использование представлений.",
    },
    "Query Builder: Knex.js": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Построение запросов через Knex.js, миграции, работа с транзакциями.",
    },
    "ORM: миграции, N+1, connection pool (Prisma)": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Prisma ORM: схема, генерация клиента, проблема N+1 и управление пулом соединений.",
    },
    "Транзакции: ACID, уровни изоляции, deadlocks": {
      type: "Лекция",
      host: MENTORS[1],
      description:
        "Свойства ACID, уровни изоляции транзакций в PostgreSQL и предотвращение дедлоков.",
    },
    "TypeScript Advanced: infer, mapped, conditional types": {
      type: "Лекция",
      host: MENTORS[3],
      description:
        "Продвинутые типы TypeScript: infer в conditional types, mapped types и рекурсивные типы.",
    },
    "SOLID + Dependency Injection": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Принципы SOLID на примерах, внедрение зависимостей и IoC-контейнеры.",
    },
    "Nest.js": {
      type: "Семинар",
      host: MENTORS[0],
      description:
        "Модули, контроллеры, провайдеры, декораторы Nest.js и сборка полноценного REST API.",
    },
    "Тестирование бэкенда: Jest + Supertest": {
      type: "Семинар",
      host: MENTORS[2],
      description:
        "Unit- и интеграционные тесты на Jest, тестирование HTTP-эндпоинтов через Supertest.",
    },
    "Кеширование (Redis)": {
      type: "Лекция",
      host: MENTORS[3],
      description:
        "Паттерны кеширования, Redis как in-memory хранилище, TTL, pub/sub.",
    },
    "Очереди (BullMQ)": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Очереди задач с BullMQ на Redis: воркеры, повторы, приоритеты.",
    },
    "Системная архитектура (обзор)": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Монолит, микросервисы, serverless — обзор архитектурных паттернов и критерии выбора.",
    },
    "Docker: образы, контейнеры, Dockerfile": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Контейнеризация приложений: написание Dockerfile, сборка образов, управление контейнерами.",
    },
    "Docker Compose + GitHub Actions + Deploy": {
      type: "Семинар",
      host: MENTORS[3],
      description:
        "Многоконтейнерные приложения с Compose, CI/CD pipeline на GitHub Actions и деплой.",
    },
    "Тестирование: виды, инструменты, зоны ответственности": {
      type: "Лекция",
      host: MENTORS[2],
      description:
        "Пирамида тестирования, юнит-, интеграционные и E2E-тесты, выбор инструментов.",
    },
    "Жизненный цикл ПО и Agile/Scrum": {
      type: "Лекция",
      host: MENTORS[0],
      description: "SDLC, Agile-манифест, Scrum: спринты, роли, церемонии.",
    },
    "Роли в команде и зоны ответственности": {
      type: "Лекция",
      host: MENTORS[0],
      description:
        "Роли разработчика, тимлида, PM, QA и DevOps — взаимодействие и ответственность.",
    },
    "HR: Позиционирование на рынке": {
      type: "Лекция",
      host: "Наталья Нестеренко",
      description:
        "Как составить резюме, пройти техническое интервью и правильно позиционировать себя на рынке труда.",
    },
  };

  const insertedLessons = await db
    .select({ id: lessons.id, title: lessons.title })
    .from(lessons);
  for (const lesson of insertedLessons) {
    const meta = LESSON_META[lesson.title];
    if (meta) {
      await db
        .update(lessons)
        .set({
          type: meta.type,
          host: meta.host,
          description: meta.description,
        })
        .where(eq(lessons.id, lesson.id));
    }
  }

  await db.insert(tasks).values([
    {
      streamId: activeStream.id,
      title: "ДЗ #1 — Git: базовый воркфлоу",
      description:
        "Создать ветки, сделать коммиты по Conventional Commits, открыть PR и попросить соседа принять его.",
      repoTemplate: "https://docs.google.com/forms/d/e/1FAIpQLSe",
      deadline: new Date("2026-04-18T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #2 — React: базовые знания",
      description:
        "Небольшое ДЗ для закрепления базовых знаний React после первой лекции. Включает тестовый опрос.",
      repoTemplate:
        "https://docs.google.com/forms/d/1zB6L_1bd46ZkEfVBwXp-1lx09CVSzo4OYERdidSw6bk",
      deadline: new Date("2026-04-25T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #3 — React: продолжение",
      description:
        "Закрепление знаний после второй лекции по React. ДЗ для фиксации знаний + тестовый опрос.",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLScrAP6h12HZ8SMi4DRo5efqZTYNhfSjrKGDJIwoBrzFddJKxw/viewform",
      deadline: new Date("2026-04-30T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #4 — React: эффекты",
      description:
        "ДЗ для закрепления знаний по эффектам в React. Есть дополнительные задания для желающих.",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLScrAP6h12HZ8SMi4DRo5efqZTYNhfSjrKGDJIwoBrzFddJKxw/viewform",
      deadline: new Date("2026-05-02T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #5 — Хуки и формы",
      description:
        "Только функциональность и логика — без стилизации. Внутри репозитория много интересного.",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLSeGz6827WXOQFLDpYVx3j2YX_AvguCyE7-Aip5r4cEtuTEKSQ/viewform",
      deadline: new Date("2026-05-08T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #6 — Backend: Fastify #1",
      description:
        "Старт блока по Backend с нуля. Пример сервера: https://github.com/AlexanderFromEarth/node-server-esoftsp-example",
      repoTemplate:
        "https://docs.google.com/forms/d/1wgGrAGKZ0Uu4Qqty7A_zaQ4taDex3EMwA2WmN8IdSnY/viewform",
      deadline: new Date("2026-05-12T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #7 — Backend: Fastify + Архитектура #2",
      description:
        "Закрепление трёхслойной архитектуры. Пример: https://github.com/BubbaCat/backend-architecture",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLSfyQlRd852Gi-IRsDcWh5GQZNFTGHVC2eKGwll-kBuQKO8doQ/viewform",
      deadline: new Date("2026-05-20T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #8 — БД: старт",
      description:
        "Проектирование структуры данных: описать сущности с типами полей, выполнить базовые SQL-операции.",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLSeZZjim_g5vX3B2Odxb-QrBsF3L8U7Bx8juqgq24evutLA3OA/viewform",
      deadline: new Date("2026-05-27T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #9 — БД: связи и ER-диаграмма",
      description:
        "Делается на основе ДЗ #8. Нарисовать ER-диаграмму. Mermaid необязателен — можно PNG.",
      repoTemplate:
        "https://docs.google.com/forms/d/e/1FAIpQLSeEMGBZE0YE_ewtW5OKuAkqj6HijdiDh6ele5wx3tDWZwiKMQ/viewform",
      deadline: new Date("2026-05-27T09:00:00Z"),
    },
    {
      streamId: activeStream.id,
      title: "ДЗ #10 — DB.Code: работа с БД на уровне кода",
      description:
        "Закрепление Knex и Prisma. Примеры: knex-ветка и prisma-ветка в репозитории Андреева.",
      repoTemplate:
        "https://docs.google.com/forms/d/114SFsazwy4hrobI-Zo9xQLDoHnmOD-CKevJ3p6gMNYY/viewform",
      deadline: new Date("2026-06-06T09:00:00Z"),
    },
  ]);

  await db.insert(leads).values([
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Михаил",
      lastName: "Орлов",
      email: "orlov@gmail.fake",
      phone: "+7 900 111-11-11",
      telegram: "@morlov",
      experience: "Год опыта в вёрстке, хочу углубиться в React.",
      status: "NEW",
    },
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Никита",
      lastName: "Волков",
      email: "volkov@gmail.fake",
      phone: "+7 900 222-22-22",
      telegram: "@nvolkov",
      experience: "Пишу скрипты на Python, хочу попробовать фронтенд.",
      status: "IN_REVIEW",
    },
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Анна",
      lastName: "Морозова",
      email: "morozova@gmail.fake",
      phone: "+7 900 333-33-33",
      experience: "Без опыта в разработке, аналитик.",
      status: "ACCEPTED",
    },
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Дмитрий",
      lastName: "Козлов",
      email: "kozlov@gmail.fake",
      telegram: "@dkozlov",
      experience: "Junior бэкенд на Django, хочу full-stack.",
      status: "ACCEPTED",
    },
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Светлана",
      lastName: "Новикова",
      email: "novikova@gmail.fake",
      phone: "+7 900 444-44-44",
      status: "REJECTED",
    },
    {
      managerId: managerProf.id,
      targetStreamId: activeStream.id,
      firstName: "Артём",
      lastName: "Зайцев",
      email: "zaitsev@gmail.fake",
      telegram: "@azaitsev",
      experience: "Нет опыта, мотивирован учиться.",
      status: "NEW",
    },
    {
      managerId: managerProf.id,
      targetStreamId: enrollingStream.id,
      firstName: "Ольга",
      lastName: "Соколова",
      email: "sokolova@gmail.fake",
      phone: "+7 900 555-55-55",
      experience: "Верстальщик 2 года, хочу в DevOps.",
      status: "IN_REVIEW",
    },
    {
      managerId: managerProf.id,
      targetStreamId: enrollingStream.id,
      firstName: "Игорь",
      lastName: "Лебедев",
      email: "lebedev@gmail.fake",
      telegram: "@ilebedev",
      experience: "Сисадмин 3 года, интересует автоматизация.",
      status: "NEW",
    },
    {
      managerId: managerProf.id,
      targetStreamId: enrollingStream.id,
      firstName: "Елена",
      lastName: "Павлова",
      email: "pavlova@gmail.fake",
      status: "IGNORED",
    },
  ]);

  console.log(`  ✓ content: 2 курса, 3 потока, 37 занятий, 10 ДЗ, 9 лидов`);

  return { activeStream, finishedStream, enrollingStream };
}
