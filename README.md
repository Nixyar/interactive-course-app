# Evolution Lab 🧪

Интерактивное обучающее приложение по нововведениям **Angular 15 → 22** и **TypeScript 4.9 → 6.0**.
Две вкладки (Angular / TypeScript), выбор версии, а ниже — разбор фич с примерами кода
«до/после», **живыми интерактивными демо** и мини-квизами. Прогресс сохраняется в браузере.

Собрано на **Angular 22 · Signals · Angular Material · Tailwind · FontAwesome**.

## ⚠️ Требуется свежий Node

Angular 22 CLI требует **Node ≥ 22.22.3 / 24 / 26**. Твой системный Node — 14, поэтому
запускай через `nvm` (Node 24 уже установлен):

```bash
nvm use 24        # или: nvm install 24
cd evolution
npm start         # dev-сервер на http://localhost:4200
```

Прод-сборка:

```bash
npm run build     # dist/evolution
```

## Что внутри

- **Два языка (RU/EN)** — переключатель в шапке, по умолчанию русский. Весь контент, интерфейс и
  живые демо переведены; выбор языка сохраняется в localStorage и переключается мгновенно (сигналы,
  без перезагрузки). Тексты — в `{ en, ru }`; резолвит `LanguageService.pick()`.
- **Живые демо** (реально работают, это же Angular 22): песочница сигналов, control flow
  `@if/@for/@switch`, `@defer` (с код-сплиттингом в отдельный чанк), signal `input()/model()/output()`,
  `linkedSignal()`, `resource()`, и флагманские **Signal Forms** (`form()` + `[formField]`).
- **Данные контента** — `src/app/data/angular.data.ts` и `typescript.data.ts`. Чтобы добавить
  версию/фичу — просто дополни массив (модель в `src/app/core/models/content.model.ts`).
- **Добавить новое живое демо**: создай компонент в `src/app/shared/demos/`, зарегистрируй ключ
  в `demo-host.ts`, и укажи `demo: '<ключ>'` у нужной фичи в data-файле.

## Структура

```
src/app/
  core/            модели, сервисы (тема, прогресс, контент), иконки, подсветка кода
  data/            весь обучающий контент (Angular + TypeScript)
  shared/          code-block, before-after, quiz, feature-card, progress-ring, demos/
  features/track/  страница трека (рельс версий + аккордеон фич)
```
