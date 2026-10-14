# 🏗️ Руководство по архитектуре проекта (Next.js App Router + Drizzle + SCSS)

Данный документ описывает структуру папок, правила разделения ответственности (Server vs Client Components), поток данных и соглашения по разработке для приложения учёта финансов.

---

## 1. Структура каталогов (`src/`)

```text
src/
├── app/                          # ТОЛЬКО роутинг, лейауты и страницы-компоновщики
│   ├── (auth)/                   # Группа маршрутов авторизации (свой layout)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Защищённая рабочая область (свой layout со sidebar/header)
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── transactions/         # Страница транзакций
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx       # Скелетон загрузки (Streaming SSR)
│   │   │   └── error.tsx         # Граница ошибок сегмента (Error Boundary)
│   │   ├── budgets/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx                # Корневой RootLayout
│   ├── globals.css               # Глобальные стили, CSS-переменные тем
│   └── not-found.tsx             # Глобальная страница 404
│
├── actions/                      # Server Actions ('use server') — мутации данных
│   ├── auth.ts                   # Регистрация, вход, выход
│   ├── transactions.ts           # Создание, редактирование, удаление транзакций
│   ├── categories.ts             # Управление категориями
│   └── budgets.ts                # Управление бюджетами
│
├── components/                   # Общие переиспользуемые UI-компоненты
│   ├── ui/                       # «Глупые» (Dumb/Primitive) компоненты дизайн-системы
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.scss
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Select/
│   │   └── Badge/
│   └── common/                   # Составные виджеты (ThemeToggleButton, UserMenu, Logo)
│
├── features/                     # Бизнес-модули (Feature-Sliced подход)
│   ├── transactions/             # Всё, что специфично ТОЛЬКО для транзакций
│   │   ├── components/           # Специфичные UI-блоки
│   │   │   ├── TransactionList/
│   │   │   ├── TransactionCard/
│   │   │   ├── TransactionForm/  # Форма добавления ('use client')
│   │   │   └── TransactionFilter/
│   │   └── types.ts              # DTO и типы для фичи
│   ├── budgets/                  # Всё, что специфично для бюджетов
│   │   └── components/
│   │       ├── BudgetCard/
│   │       └── BudgetProgressBar/
│   └── analytics/                # Графика и статистика (Charts, Balances)
│
├── lib/                          # Инфраструктура, утилиты, синглтоны
│   ├── db/                       # База данных (Drizzle ORM)
│   │   ├── index.ts              # Экземпляр подключения `db`
│   │   └── schema.ts             # Описание таблиц и relations
│   ├── validation/               # Zod-схемы валидации форм и actions
│   │   ├── auth.ts
│   │   └── transaction.ts
│   ├── session.ts                # Сессии, JWT, cookies
│   ├── user.ts                   # Серверные функции получения текущего пользователя
│   └── utils.ts                  # Форматирование валют (formatCurrency), дат (formatDate)
│
├── providers/                    # React Context провайдеры ('use client')
│   └── ThemeProvider/
│
└── middleware.ts                 # Системный middleware Next.js (проверка сессий, редиректы)
```

---

## 2. Ключевые архитектурные принципы

### 2.1 «Тощие» страницы (`app/**/page.tsx`)
Страницы в `app` не должны содержать сложную разметку и стили. Их задачи:
1. Быть **Server Component** по умолчанию.
2. Прочитать параметры (`params`, `searchParams`).
3. Запросить данные напрямую из БД (`drizzle`) без промежуточных `fetch` к собственным API.
4. Скомпоновать готовые блоки из `features/`.

*Пример хорошей страницы:*
```tsx
// src/app/(dashboard)/transactions/page.tsx
import { getCurrentUser } from '@/lib/user';
import { db } from '@/lib/db';
import { transactionsTable } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { AddTransactionModal } from '@/features/transactions/components/AddTransactionModal';

export default async function TransactionsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const transactions = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, user.id))
    .orderBy(desc(transactionsTable.date));

  return (
    <div className="container">
      <header className="page-header">
        <h1>Транзакции</h1>
        <AddTransactionModal />
      </header>
      <TransactionList items={transactions} />
    </div>
  );
}
```

---

### 2.2 Разделение Server vs Client Components
* **Server Components (по умолчанию):**
  * Доступ к БД, файловой системе, приватным секретам (ENV).
  * 0 байт в JS-бандле браузера.
  * Быстрый первоначальный рендеринг.
* **Client Components (`'use client'`):**
  * Опускаются максимально **вниз по дереву** (Leaf Components).
  * Нужны только там, где есть: хуки состояния (`useState`, `useActionState`), слушатели событий (`onClick`, `onChange`), доступ к браузерным API (`window`, `localStorage`).
  * Не делай всю страницу `'use client'` только ради одной кнопки. Оберни в `'use client'` только саму кнопку или форму.

---

### 2.3 Server Actions (`actions/`) как контроллеры
Server Actions используются для мутаций (создание, изменение, удаление):

```text
[Клиентская форма (useActionState)]
              │
              ▼ (вызов Server Action)
[actions/transactions.ts ('use server')]
  1. Валидация входных данных через Zod
  2. Проверка авторизации через getCurrentUser() / verifySession()
  3. Выполнение запроса в PostgreSQL через Drizzle
  4. revalidatePath('/transactions')  <-- обновляет кэш страницы в Next.js
  5. Возврат результата { success: true } или { error: 'Сообщение' }
```

---

### 2.4 Разделение `components/ui` и `features/`
- **`components/ui/`**: Кнопки, инпуты, карточки, чекбоксы. Не знают ничего о пользователях, деньгах, бюджетах. Могут быть вынесены в отдельную UI-библиотеку.
- **`features/<name>/`**: Знают о доменной модели. Например, `TransactionCard` знает, как подсветить сумму зелёным (доход) или красным (расход) и как выглядит объект `Transaction`.

---

### 2.5 Middleware в Next.js
- Файл проверки маршрутов **обязан** называться `middleware.ts` и лежать в `src/` (или корне проекта).
- Название `proxy.ts` не распознаётся Next.js автоматически. Переименуй `src/proxy.ts` в `src/middleware.ts`.

