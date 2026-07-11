```mermaid
erDiagram

    LEAD {
        INT id PK
        INT converted_user_id FK
        INT manager_id FK
        INT target_stream_id FK
        TEXT first_name
        TEXT last_name
        TEXT patronymic
        TEXT email
        TEXT phone
        TEXT telegram
        TEXT experience
        TEXT test_result
        LEAD_STATUS status "ENUM: NEW|IN_REVIEW|ACCEPTED|REJECTED|IGNORED"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    USER {
        INT id PK
        TEXT first_name
        TEXT last_name
        TEXT patronymic
        TEXT email "U"
        TEXT password_hash
        ROLES role "ENUM: ADMIN|MANAGER|MENTOR|STUDENT"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    USER_TELEGRAM {
        INT id PK
        INT user_id FK "U"
        TEXT tg_id "U"
        TEXT tg_username
        TIMESTAMP linked_at
    }

    STUDENT_PROFILE {
        INT id PK
        INT user_id FK "U"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    MENTOR_PROFILE {
        INT id PK
        INT user_id FK "U"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    MANAGER_PROFILE {
        INT id PK
        INT user_id FK "U"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    NOTIFICATION {
        INT id PK
        INT user_id FK
        TEXT message
        BOOLEAN is_silent
        TIMESTAMP send_at
        NOTIFICATION_STATUS status "ENUM: PENDING|SENT|FAILED"
        BOOLEAN is_read
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    COURSE {
        INT id PK
        TEXT name
        TEXT description
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    STREAM {
        INT id PK
        TEXT name
        INT course_id FK
        STREAM_STATUS status "ENUM: ENROLLING|IN_PROGRESS|FINISHED"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    STREAM_TELEGRAM {
        INT id PK
        INT stream_id FK "U"
        TEXT chat_id
        INT announce_thread_id
        TIMESTAMP linked_at
    }

    STREAM_STUDENT {
        INT stream_id PK "FK"
        INT student_id PK "FK"
        INT mentor_id FK
        STUDENT_STATUS status "ENUM: ACTIVE|GRADUATED|EXPELLED"
        TIMESTAMP joined_at
    }

    STREAM_MENTOR {
        INT stream_id PK "FK"
        INT mentor_id PK "FK"
        TIMESTAMP joined_at
    }

    LESSON {
        INT id PK
        INT stream_id FK
        TEXT title
        TEXT type
        TEXT host
        TEXT description
        TIMESTAMP start_time
        TIMESTAMP end_time
        TEXT meeting_link
        TEXT record_link
        TIMESTAMP announce_sent_at
        TIMESTAMP reminder_sent_at
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TASK {
        INT id PK
        INT stream_id FK
        TEXT title
        TEXT description
        TEXT repo_template
        TEXT record_link
        TIMESTAMP deadline
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    SUBMISSION {
        INT id PK
        INT task_id FK
        INT student_id FK
        TEXT repo_link
        SUBMISSION_STATUS status "ENUM: NEW|REVIEWING|CHANGES_REQUESTED|ACCEPTED|RESUBMITTED"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    REVIEW {
        INT id PK
        INT submission_id FK
        INT mentor_id FK
        INT score
        TEXT comment
        TIMESTAMP reviewed_at
    }

    USER ||--o| USER_TELEGRAM : "привязанный telegram-аккаунт"
    USER ||--o| LEAD : "конвертированный лид"
    USER ||--|{ NOTIFICATION : "уведомления пользователя"
    USER ||--o| MENTOR_PROFILE : "профиль ментора"
    USER ||--o| STUDENT_PROFILE : "профиль студента"
    USER ||--o| MANAGER_PROFILE : "профиль менеджера"
    MANAGER_PROFILE ||--o{ LEAD : "менеджер ведёт лиды"
    STREAM ||--o| STREAM_TELEGRAM : "telegram-чат потока"
    STREAM ||--|{ LEAD : "поток, на который подана заявка"
    COURSE ||--|{ STREAM : "курс содержит потоки"
    STREAM ||--|{ STREAM_STUDENT : "студенты потока"
    STREAM ||--|{ STREAM_MENTOR : "менторы потока"
    STREAM ||--|{ TASK : "задания потока"
    STREAM ||--|{ LESSON : "занятия потока"
    STUDENT_PROFILE ||--|{ STREAM_STUDENT : "студент в потоках"
    MENTOR_PROFILE ||--|{ STREAM_STUDENT : "ментор закреплён за студентами"
    MENTOR_PROFILE ||--|{ STREAM_MENTOR : "ментор в потоках"
    STUDENT_PROFILE ||--|{ SUBMISSION : "сдачи студента"
    TASK ||--|{ SUBMISSION : "сдачи по заданию"
    SUBMISSION ||--|{ REVIEW : "история ревью сдачи"
    MENTOR_PROFILE ||--|{ REVIEW : "ревью ментора"
```

### Описание связей

| Связь                           | Тип | Описание                                                                                           |
| ------------------------------- | --- | -------------------------------------------------------------------------------------------------- |
| USER → USER_TELEGRAM            | 1:1 | У пользователя может быть привязан один Telegram-аккаунт                                           |
| USER → MENTOR_PROFILE           | 1:1 | У пользователя может быть один профиль ментора                                                     |
| USER → STUDENT_PROFILE          | 1:1 | У пользователя может быть один профиль студента                                                    |
| USER → MANAGER_PROFILE          | 1:1 | У пользователя может быть один профиль менеджера                                                   |
| USER → NOTIFICATION             | 1:N | У пользователя может быть много уведомлений                                                        |
| USER → LEAD                     | 1:1 | Лид конвертируется в пользователя при зачислении (`converted_user_id`)                             |
| MANAGER_PROFILE → LEAD          | 1:N | Один менеджер ведёт много заявок                                                                   |
| COURSE → STREAM                 | 1:N | Один курс реализуется в нескольких потоках                                                         |
| STREAM → STREAM_TELEGRAM        | 1:1 | К потоку привязан один Telegram-чат (для анонсов лекций)                                           |
| STREAM → LEAD                   | 1:N | Один поток принимает много заявок                                                                  |
| STREAM → TASK                   | 1:N | Один поток содержит много заданий                                                                  |
| STREAM → LESSON                 | 1:N | Один поток содержит много занятий                                                                  |
| STUDENT_PROFILE ↔ STREAM        | M:N | Через `STREAM_STUDENT`: студент может учиться в нескольких потоках, поток содержит много студентов |
| MENTOR_PROFILE ↔ STREAM         | M:N | Через `STREAM_MENTOR`: ментор ведёт несколько потоков, поток содержит несколько менторов           |
| MENTOR_PROFILE → STREAM_STUDENT | 1:N | Ментор закреплён за конкретными студентами внутри потока                                           |
| TASK → SUBMISSION               | 1:N | По одному заданию может быть много сдач (от разных студентов)                                      |
| STUDENT_PROFILE → SUBMISSION    | 1:N | Студент может сдавать много заданий                                                                |
| SUBMISSION → REVIEW             | 1:N | Одна сдача может иметь несколько ревью (первичное + доработки)                                     |
| MENTOR_PROFILE → REVIEW         | 1:N | Ментор делает много ревью                                                                          |

### Ответы на вопросы

1. Чем связь 1:N отличается от M:N? Приведите пример каждой из вашего проекта.

_Ответ:_
1:N — один родитель, много дочерних записей, но не наоборот. Например, один `STREAM` содержит много `TASK`, но каждое задание принадлежит строго одному потоку.
M:N — оба объекта могут иметь много связей с другой стороны. Например, `STUDENT_PROFILE` и `STREAM`: студент может учиться в нескольких потоках, и в каждом потоке много студентов. Реализовано через промежуточную таблицу `STREAM_STUDENT`.

2. Почему связь M:N нельзя реализовать двумя таблицами? Зачем нужна промежуточная?

_Ответ:_
Нет способа хранить `список` в одной колонке без нарушения реляционной модели.
Если добавить в `STUDENT_PROFILE` колонку `stream_ids`, туда бы пришлось писать что-то вроде "1,2,3" — это не атомарное значение, нельзя сделать JOIN, индексировать или проверять целостность через FK.
Промежуточная таблица `STREAM_STUDENT` решает это элегантно: каждая строка — одна пара (stream_id, student_id). Плюс в неё можно добавить дополнительные данные о связи: `mentor_id`, `status`, `joined_at`.

3. Что будет, если удалить запись, на которую ссылается FK?

_Ответ:_
Зависит от настройки FK:

- `CASCADE` — зависимые строки удалятся автоматически. Например, при удалении `STREAM` удалятся все `TASK`, `LESSON`, `STREAM_STUDENT` этого потока.
- `RESTRICT` — БД вернёт ошибку и отменит операцию. Например, нельзя удалить `COURSE`, если к нему привязан хотя бы один `STREAM`.
- `SET NULL` — FK в зависимой строке станет NULL. Например, при удалении менеджера его `manager_id` в `LEAD` обнулится, заявка сохранится без ответственного.

4. Может ли FK быть NULL? Когда это полезно?

_Ответ:_
Да. Например, в таблице `LEAD`: когда заявка только поступает в CRM, у неё ещё нет ответственного менеджера — `manager_id` будет NULL. Как только менеджер берёт заявку в работу, туда записывается его ID. Аналогично `converted_user_id` — NULL до момента зачисления студента.
