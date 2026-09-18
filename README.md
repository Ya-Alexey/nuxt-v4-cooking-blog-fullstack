# Кулинарный блог с каталогом рецептов
Фулстек-блог с рецептами, построенный на архитектуре **Nuxt 4** и **Drizzle ORM** с применением доменной архитектуры (Domain-Driven Design).

## ✨ Ключевые особенности

* **Nuxt 4 Architecture**: использование новой структуры директорий (`app/`) и встроенного серверного движка Nitro.
* **Type-Safe Fullstack**: сквозная типизация данных благодаря связке TypeScript + Drizzle ORM.
* **Secure Authentication**: полноценная авторизация пользователей на базе **better-auth** (сессии, регистрация, вход).
* **Domain-Driven Design (DDD)**: изоляция модулей приложения с жестким контролем границ (Bounded Contexts) через автоматизированный Public API.
* **Automated Scaffolding**: быстрая и стандартизированная генерация новых модулей проекта с помощью **Plop.js**.
* **CI/CD & Testing**: автоматическая проверка кодовой базы через GitHub Actions и unit-тестирование ключевой логики.

## 🛠 Стек технологий

* **Frontend & Backend**: Nuxt 4 (Vue 3, Composition API)
* **Аутентификация**: better-auth
* **База данных & ORM**: PostgreSQL + Drizzle ORM
* **Тестирование & CI/CD**: Vitest + GitHub Actions
* **Линтинг & Архитектурный контроль**: ESLint (Flat Config + `no-restricted-imports`)
* **Автоматизация (Scaffolding)**: Plop.js
* **Стилизация**: SCSS
* **Валидация данных**: Zod


## 🧩 Доменная архитектура (Domain-Driven Design)

В проекте реализовано модульное разделение кодовой базы по контекстам (доменам). Все домены изолированы друг от друга, а их взаимодействие строго регламентировано.

### 🛡️ Архитектурные границы и Public API
Каждый домен представляет собой замкнутую экосистему. Взаимодействие между доменами или глобальной зоной `app` разрешено **только через точку входа (Public API)** — файл `index.ts` в корне домена.

Для обеспечения изоляции настроены парные алиасы путей (Path Mapping):
* `#domain_имя_домена_public` — **Public API домена**. Доступен для внешнего мира (других доменов и зоны `app`). Экспортирует наружу только те компоненты, функции и типы, которые домен готов предоставить для переиспользования.
* `#domain_имя_домена` — **Внутреннее пространство**. Доступно только для файлов внутри самого домена. Позволяет удобно импортировать внутренние компоненты (`#catalog/components/...`), `composables` и `utils` от корня домена.

> ⚠️ **Важно:** Прямой импорт во внутреннюю структуру чужого домена (как через `~~/domains/...`, так и по относительным путям `../../`) **строго запрещен и блокируется на этапе компиляции правилами ESLint**.

### 🛠️ Создание нового домена
В проекте настроена автоматизация рутинных действий. Чтобы развернуть новый домен с правильной структурой, выполните команду:
```bash
npm run generate-plop
```
* **Имя домена** при создании следует вводить строго в формате `snake_case` (например: `user_profile`, `recipe_catalog`).
* Скрипт автоматически создаст базовую структуру папок (`components/`, `composables/`, `utils/`), сгенерирует файл `index.ts` и зарегистрирует домен в системе ограничений ESLint.
* После создания нового домена рекомендуется **перезапустить TypeScript-сервер в вашей IDE**, чтобы корректно подхватились новые алиасы и правила линтера.


## 🧪 Тестирование

В проекте настроено unit-тестирование с использованием **Vitest**. Тестами выборочно покрыты:
* Основные утилиты (`utils`)
* Композитные функции (`composables`)

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
