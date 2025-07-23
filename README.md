# Task Manager 

Полноценное клиент‑серверное приложение для просмотра/редактирования/создания задач

---

## Стек

| Технология | Версия | Назначение |
|------------|--------|------------|
| Vite   | 5 / 7  | Сборка SPA, HMR |
| React  | 18     | UI |
| TypeScript | 5  | Статическая типизация (клиент + сервер) |
| Redux Toolkit | 1.9 | State‑менеджер |
| React Router | 6 | SPA‑маршрутизация |
| Material UI  | 5 | Компоненты и theming |
| Node + Express | 20 / 4 | REST‑сервер |
| Zod + `react-hook-form` | — | Валидация формы |
| Dayjs        | 1 | Форматирование дат |
| nanoid       | 5 | Генерация id |
| ESLint + Prettier | 8 / 3 | Стиль и качество кода |
| Feature‑Sliced Design | — | Архитектура слоёв |

---

## Функциональность

- CRUD: создание / редактирование / удаление / просмотр задач.
- Фильтрация + сортировка (дата создания, приоритет).
- REST API / tasks (`GET / POST / PATCH / DELETE`).
- Redux‑store с загрузкой из сервера; optimistic‑UI.
- Адаптивный дизайн (1 → 2 → 3 колонки).
- Валидация обязательных полей (Zod).
- Структура Feature‑Sliced (app / pages / features / entities / shared).
- ESLint + Prettier — единый стиль (`npm run lint / format`).

---

## Быстрый старт (локально)

```bash
#Обновите Node (требуется версия не ниже 20.19 или 22 LTS)
nvm install 22
nvm use 22

#Создайте и скачайте мой репозиторий
git clone https://github.com/your-username/task-manager-v2.git
cd task-manager-v2

#Запустите сервер
cd server
npm install
npm run dev

#Запустите клиент
cd client
npm install
npm run dev
