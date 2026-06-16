```mermaid
erDiagram

    LEAD {
        INT id PK
        INT converted_user_id FK
        INT manager_id FK
        TEXT first_name
        TEXT last_name
        TEXT patronymic
        TEXT email
        TEXT phone
        TEXT telegram
        TEXT experience
        TEXT test_result
        LEAD_STATUS status "ENUM: NEW|IN_REVIEW|ACCEPTED|REJECTED|IGNORED|LOST|ARCHIVED"
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
        BOOLEAN is_activated
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
        STUDENT_STATUS status "ENUM: ACTIVE|GRADUATED|EXPELLED"
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
        INT mentor_id FK
        STREAM_STATUS status "ENUM: ENROLLING|IN_PROGRESS|FINISHED"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    REVIEW {
        INT id PK
        INT submission_id FK
        INT mentor_id FK
        INTEGER score
        TEXT comment
        TIMESTAMP reviewed_at
    }

    SUBMISSION {
        INT id PK
        INT task_id FK
        INT student_id FK
        TEXT repo_link
        SUBMISSION_STATUS status "ENUM: NEW|REVIEWING|CHANGES_REQUESTED|ACCEPTED|RESUBMITTED|ARCHIVED"
        BOOLEAN is_activate
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    STREAM_STUDENT {
        INT stream_id PK "FK"
        INT student_id PK "FK"
        TIMESTAMP joined_at
    }

    LESSON {
        INT id PK
        INT stream_id FK
        TEXT title
        TIMESTAMP start_time
        TIMESTAMP end_time
        TEXT meeting_link
        TEXT record_link
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TASK {
        INT id PK
        INT stream_id FK
        TEXT title
        TEXT description
        TEXT repo_template
        TIMESTAMP deadline
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    USER ||--o| USER_TELEGRAM : "у пользователя есть telegram-аккаунт"
    USER ||--o| LEAD : "конвертированный лид"
    USER ||--|{ NOTIFICATION : "у пользователя есть уведомления"
    USER ||--o| MENTOR_PROFILE : "пользователь может быть ментором"
    USER ||--o| STUDENT_PROFILE : "пользователь может быть студентом"
    USER ||--o| MANAGER_PROFILE : "пользователь может быть менеджером"
    MANAGER_PROFILE ||--o{ LEAD : "менеджер ведёт лиды"
    STUDENT_PROFILE ||--|{ SUBMISSION : "студент сдаёт домашние задания"
    STUDENT_PROFILE ||--|{ STREAM_STUDENT : "студент есть в разных потоках"
    STREAM ||--|{ STREAM_STUDENT : "поток содержит студентов"
    MENTOR_PROFILE ||--|{ REVIEW : "ментор делает ревью домашних заданий"
    SUBMISSION ||--|{ REVIEW : "по домашним заданиям делают ревью"
    TASK ||--|{ SUBMISSION : "у домашних заданий есть решения"
    STREAM ||--|{ TASK : "потоки содержат домашние задания"
    COURSE ||--|{ STREAM : "курсы есть в разных потоках"
    MENTOR_PROFILE ||--|{ STREAM : "ментор учит в разных потоках"
    STREAM ||--|{ LESSON : "у потока есть домашние задания"
```

### Описание связей

| Связь                            | Тип | Описание                                                                                                      |
| -------------------------------- | --- | ------------------------------------------------------------------------------------------------------------- |
| MANAGER_PROFILE → LEAD           | 1:N | Один менеджер может управлять разными лидами                                                                  |
| LEAD → USER                      | 1:1 | Один лид, может быть конвертирован в одного пользователя                                                      |
| USER → NOTIFICATION              | 1:N | У одного пользователя может быть много уведомлений                                                            |
| USER → MENTOR_PROFILE            | 1:1 | У одного пользователя может быть лишь один профиль ментора                                                    |
| USER → STUDENT_PROFILE           | 1:1 | У одного пользователя может быть лишь один профиль студента                                                   |
| USER → MANAGER_PROFILE           | 1:1 | У одного пользователя может быть лишь один профиль менеджера                                                  |
| USER → USER_TELEGRAM             | 1:1 | У одного пользователя может быть привязан один telegram-аккаунт                                               |
| STUDENT_PROFILE → SUBMISSION     | 1:N | У студента может быть много сданных работ                                                                     |
| STUDENT_PROFILE → STREAM_STUDENT | 1:N | Студент может быть в множестве потоков                                                                        |
| STREAM → STREAM_STUDENT          | 1:N | Поток может быть у множества студентов                                                                        |
| STUDENT_PROFILE ↔ STREAM         | M:N | Через промежуточную таблицу `STREAM_STUDENT` - студент содержит много потоков, поток входит в много студентов |
| MENTOR_PROFILE → REVIEW          | 1:N | У одного ментора может быть множество ревью                                                                   |
| SUBMISSION → REVIEW              | 1:N | У одной сданной работы может быть множество ревью                                                             |
| TASK → SUBMISSION                | 1:N | У одного ТЗ может быть много сданных работ                                                                    |
| STREAM → TASK                    | 1:N | У одного потока может быть много ТЗ                                                                           |
| COURSE → STREAM                  | 1:N | У одного курса может быть много потоков                                                                       |
| MENTOR_PROFILE → STREAM          | 1:N | У одного ментора может быть много потоков                                                                     |
| STREAM → LESSON                  | 1:N | У одного потока может быть много занятий                                                                      |

### Ответы на вопросы:

1. Чем связь 1:N отличается от M:N? Приведите пример каждой из вашего проекта.

_Ответ:_
1:N - это когда один родитель, много дочерних записей, но не наоборот. Например, один `STREAM` содержит много `TASK`, но каждое задание принадлежит строго одному потоку.
M:N - оба объекта могут иметь много связей с другой стороны. Например, `STUDENT_PROFILE` и `STREAM`: студент может учиться в нескольких потоках, и в каждом потоке много студентов.

2. Почему связь M:N нельзя реализовать двумя таблицами? Зачем нужна промежуточная?

_Ответ:_
Потому нету способа хранить `список` в одной колонке без нарушения реляционной модели.
Если мы добавим в `STUDENT_PROFILE` колонку stream_ids, то тогда туда бы пришлось писать что-то вроде "1,2,3" - это уже не атомарное зн-е, следовательно, нельзя сделать JOIN, индексировать или проверять целостность через *FK*.
Промежуточная таблица `STREAM_STUDENT` решает это элегантно: каждая строка - одна пара (stream_id, student_id). Хочешь добавить студента в поток, добавляешь строку. Хочешь убрать - удаляешь строку.

3. Что будет, если удалить запись, на которую ссылается FK? (Подумайте, мы разберём это на лекции)

_Ответ:_
Это зависит от того, какое удаление мы указали.
Если у нас `каскадное (cascade)` удаление, то зависимые записи (строки) имеющие в себе fk-колонку просто удалятся.
Если у нас `ограничивающие (restrict)` удаление, то бдшка вернёт ошибку и полностью отменит операцию на удаление.

4. Может ли FK быть NULL? Когда это полезно?

_Ответ:_
Да. Полезно может быть, например, в моём проекте с таблицами `lead` и `user`, когда заявка только падает в CRM от незарегистрированного кандидата, у неё ещё нет ответственного менежера, а значит `manager_id` будет **NULL**. Как только менеджер берёт заявку в работу, туда записывается его **ID**.
