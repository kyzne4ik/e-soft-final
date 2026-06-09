## Основные команды Drizzle

| Команда                    | Описание                                       |
| -------------------------- | ---------------------------------------------- |
| `npx drizzle-kit generate` | Сгенерировать SQL миграции из схемы            |
| `npx drizzle-kit migrate`  | Применить миграции к БД                        |
| `npx drizzle-kit push`     | Синхронизировать схему напрямую (без миграций) |
| `npx drizzle-kit studio`   | Открыть Drizzle Studio для просмотра данных    |
| `npx drizzle-kit check`    | Проверить целостность миграций                 |
| `npx drizzle-kit up`       | Применить следующую миграцию                   |
| `npx drizzle-kit down`     | Откатить последнюю миграцию                    |

## Рабочий процесс с миграциями

### Первый запуск

```bash
# 1. Сгенерировать миграцию
npx drizzle-kit generate

# 2. Применить миграцию к БД
npx drizzle-kit migrate

# 3. (Опционально) Открыть UI для просмотра данных
npx drizzle-kit studio
```

### Изменение схемы

1. Измените файл `schema.ts`
2. Выполните:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Примеры запросов в коде

```typescript
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

// SELECT
const allUsers = await db.select().from(users);

// INSERT
const newUser = await db
  .insert(users)
  .values({
    name: "Анна",
    email: "anna@example.com",
  })
  .returning();

// UPDATE
await db.update(users).set({ name: "Анна Смирнова" }).where(eq(users.id, 1));

// DELETE
await db.delete(users).where(eq(users.id, 1));
```

## Переменные окружения

Создайте `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
# или для MySQL: mysql://user:password@localhost:3306/mydb
# или для SQLite: sqlite:./dev.db
```

## Быстрый старт с Docker (PostgreSQL)

```bash
docker run --name postgres-drizzle -e POSTGRES_PASSWORD=mysecret -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
```

## Полезные ссылки

- [Drizzle Docs](https://orm.drizzle.team)
- [Drizzle Kit Reference](https://orm.drizzle.team/kit-docs)
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio)

---

**Совет**: Для продакшена используйте `drizzle-kit migrate` в CI/CD, а не `push`.  
Для быстрой разработки локально удобен `drizzle-kit push`.

```

```
