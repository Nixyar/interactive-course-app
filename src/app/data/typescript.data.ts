import { VersionInfo } from '../core/models/content.model';

/**
 * TypeScript evolution 4.9 → 6.0 (you are currently on 4.8.4).
 * Prose is bilingual; type-level features lean on before/after and quizzes.
 */
export const TYPESCRIPT_VERSIONS: VersionInfo[] = [
  // ─────────────────────────────────────────────────────────── 4.9
  {
    version: '4.9',
    track: 'typescript',
    released: 'Nov 2022',
    headline: {
      en: 'The `satisfies` operator — validate a value against a type without widening it.',
      ru: 'Оператор `satisfies` — проверить значение по типу, не расширяя его.',
    },
    highlights: {
      en: ['satisfies operator', 'auto-accessors (accessor)', 'in-operator narrowing', 'stricter NaN checks'],
      ru: ['Оператор satisfies', 'Авто-аксессоры (accessor)', 'Сужение через оператор in', 'Строже проверки NaN'],
    },
    features: [
      {
        id: 'ts49-satisfies',
        title: { en: 'The `satisfies` operator', ru: 'Оператор `satisfies`' },
        icon: 'fingerprint',
        level: 'flagship',
        tags: ['types', 'inference'],
        summary: {
          en: 'Check that a value conforms to a type while keeping its precise, inferred literal type. Best of both: validation *and* narrow inference.',
          ru: 'Проверяет соответствие значения типу, сохраняя его точный выведенный литеральный тип. Лучшее из двух: проверка *и* узкий вывод.',
        },
        details: {
          en: [
            'A type annotation (`: T`) validates but *widens* the value to `T`, losing specifics.',
            '`satisfies T` validates against `T` but preserves the literal/narrow type for later use.',
          ],
          ru: [
            'Аннотация типа (`: T`) проверяет, но *расширяет* значение до `T`, теряя детали.',
            '`satisfies T` проверяет по `T`, но сохраняет литеральный/узкий тип для дальнейшего использования.',
          ],
        },
        beforeAfter: {
          note: {
            en: 'With the annotation, `config.port` is `string | number`. With `satisfies`, it stays `number`.',
            ru: 'С аннотацией `config.port` — `string | number`. С `satisfies` он остаётся `number`.',
          },
          before: {
            language: 'typescript',
            label: { en: 'Annotation widens', ru: 'Аннотация расширяет' },
            code: `type Config = Record<string, string | number>;
const config: Config = { host: 'localhost', port: 8080 };
config.port.toFixed(); // ❌ Error: string | number has no toFixed`,
          },
          after: {
            language: 'typescript',
            label: { en: '`satisfies` preserves', ru: '`satisfies` сохраняет' },
            code: `type Config = Record<string, string | number>;
const config = { host: 'localhost', port: 8080 } satisfies Config;
config.port.toFixed(); // ✅ port is inferred as number
config.host.toUpperCase(); // ✅ host is string`,
          },
        },
        quiz: {
          question: {
            en: 'After `const c = { port: 8080 } satisfies Record<string, number>`, what is the type of `c.port`?',
            ru: 'После `const c = { port: 8080 } satisfies Record<string, number>` какой тип у `c.port`?',
          },
          options: [
            { text: { en: '`number` (the narrow, inferred type is preserved)', ru: '`number` (сохраняется узкий выведенный тип)' }, correct: true },
            { text: { en: '`string | number`', ru: '`string | number`' }, correct: false },
            { text: { en: '`any`', ru: '`any`' }, correct: false },
          ],
          explanation: {
            en: '`satisfies` checks assignability to the target type but leaves the value with its narrowly inferred type — here, `number`.',
            ru: '`satisfies` проверяет присваиваемость целевому типу, но оставляет значению его узко выведенный тип — здесь `number`.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html',
      },
      {
        id: 'ts49-accessor',
        title: { en: 'Auto-accessors with `accessor`', ru: 'Авто-аксессоры через `accessor`' },
        icon: 'lock',
        level: 'minor',
        tags: ['classes', 'decorators'],
        summary: {
          en: 'The `accessor` keyword creates a get/set pair backed by a private field — designed to pair with the new standard decorators.',
          ru: 'Ключевое слово `accessor` создаёт пару get/set поверх приватного поля — сделано в паре с новыми стандартными декораторами.',
        },
        code: [
          {
            language: 'typescript',
            code: `class Person {
  accessor name = 'Ada';
}
// desugars to a private #name field + getter/setter`,
          },
        ],
      },
      {
        id: 'ts49-in-narrowing',
        title: { en: 'Narrowing with `in`', ru: 'Сужение через `in`' },
        icon: 'branch',
        level: 'minor',
        tags: ['narrowing'],
        summary: {
          en: 'The `in` operator narrows even for properties not present in the declared type.',
          ru: 'Оператор `in` сужает тип даже для свойств, отсутствующих в объявленном типе.',
        },
        code: [
          {
            language: 'typescript',
            code: `function f(x: unknown) {
  if (x && typeof x === 'object' && 'a' in x) {
    // x now has an 'a' property
  }
}`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.0
  {
    version: '5.0',
    track: 'typescript',
    released: 'Mar 2023',
    headline: {
      en: 'Standard (Stage 3) decorators, const type parameters, and a leaner compiler.',
      ru: 'Стандартные декораторы (Stage 3), const-параметры типов и более лёгкий компилятор.',
    },
    highlights: {
      en: ['Stage 3 decorators (no flag)', 'const type parameters', 'All enums are union enums', 'extends arrays in tsconfig'],
      ru: ['Декораторы Stage 3 (без флага)', 'const-параметры типов', 'Все enum — union-типы', 'Массив extends в tsconfig'],
    },
    features: [
      {
        id: 'ts50-decorators',
        title: { en: 'Standard ECMAScript decorators', ru: 'Стандартные декораторы ECMAScript' },
        icon: 'star',
        level: 'flagship',
        tags: ['decorators', 'classes'],
        summary: {
          en: 'Decorators per the TC39 Stage 3 proposal — no more `--experimentalDecorators`. A decorator is a function receiving the target and a context object.',
          ru: 'Декораторы по предложению TC39 Stage 3 — без `--experimentalDecorators`. Декоратор — это функция, получающая цель и объект контекста.',
        },
        details: {
          en: [
            'The new decorators have a standardized signature and run without `emitDecoratorMetadata`.',
            'Angular still uses its own decorator flavour, but framework-free TS code should adopt the standard.',
          ],
          ru: [
            'У новых декораторов стандартизированная сигнатура, и они работают без `emitDecoratorMetadata`.',
            'Angular пока использует свой вариант декораторов, но во фреймворк-независимом TS стоит переходить на стандарт.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `function logged<T, A extends any[], R>(
  target: (this: T, ...args: A) => R,
  ctx: ClassMethodDecoratorContext,
) {
  return function (this: T, ...args: A): R {
    console.log(\`calling \${String(ctx.name)}\`);
    return target.call(this, ...args);
  };
}

class Api {
  @logged fetchUser(id: number) { /* ... */ }
}`,
          },
        ],
        quiz: {
          question: {
            en: 'What compiler flag did Stage 3 decorators make unnecessary?',
            ru: 'Какой флаг компилятора стал ненужным благодаря декораторам Stage 3?',
          },
          options: [
            { text: { en: '`--experimentalDecorators`', ru: '`--experimentalDecorators`' }, correct: true },
            { text: { en: '`--strict`', ru: '`--strict`' }, correct: false },
            { text: { en: '`--noImplicitAny`', ru: '`--noImplicitAny`' }, correct: false },
          ],
          explanation: {
            en: 'The standard decorators work out of the box. `--experimentalDecorators` remains only for the legacy (and Angular-style) decorator semantics.',
            ru: 'Стандартные декораторы работают из коробки. `--experimentalDecorators` остаётся только для устаревшей (и Angular-стиля) семантики.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html',
      },
      {
        id: 'ts50-const-type-params',
        title: { en: 'const type parameters', ru: 'const-параметры типов' },
        icon: 'tags',
        level: 'major',
        tags: ['generics', 'inference'],
        summary: {
          en: 'Add `const` to a type parameter so call-site arguments are inferred as narrow, readonly literals — without callers writing `as const`.',
          ru: 'Добавь `const` к параметру типа, и аргументы выводятся как узкие readonly-литералы — без `as const` на стороне вызова.',
        },
        beforeAfter: {
          before: {
            language: 'typescript',
            code: `function names<T>(arg: T[]): T[] { return arg; }
const n = names(['a', 'b']); // string[]`,
          },
          after: {
            language: 'typescript',
            code: `function names<const T>(arg: T[]): T[] { return arg; }
const n = names(['a', 'b']); // readonly ['a', 'b']`,
          },
        },
      },
      {
        id: 'ts50-enums-union',
        title: { en: 'All enums are union enums', ru: 'Все enum — union-типы' },
        icon: 'group',
        level: 'minor',
        tags: ['enums'],
        summary: {
          en: 'Every enum member becomes its own literal type, improving narrowing and giving better errors on invalid comparisons.',
          ru: 'Каждый член enum становится своим литеральным типом — лучше сужение и понятнее ошибки при некорректных сравнениях.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.2
  {
    version: '5.2',
    track: 'typescript',
    released: 'Aug 2023',
    headline: {
      en: '`using` declarations bring deterministic cleanup (explicit resource management).',
      ru: 'Объявления `using` дают детерминированную очистку (явное управление ресурсами).',
    },
    highlights: {
      en: ['using / await using', 'Symbol.dispose', 'named tuple elements', 'decorator metadata'],
      ru: ['using / await using', 'Symbol.dispose', 'именованные элементы кортежей', 'метаданные декораторов'],
    },
    features: [
      {
        id: 'ts52-using',
        title: { en: '`using` declarations & disposal', ru: 'Объявления `using` и освобождение' },
        icon: 'recycle',
        level: 'flagship',
        tags: ['resources', 'runtime'],
        summary: {
          en: 'A `using` variable is disposed automatically at the end of its scope via `Symbol.dispose` — RAII-style cleanup for files, locks, connections.',
          ru: 'Переменная `using` автоматически освобождается в конце области видимости через `Symbol.dispose` — очистка в стиле RAII для файлов, блокировок, соединений.',
        },
        details: {
          en: [
            'Implement `[Symbol.dispose]()` (or `[Symbol.asyncDispose]()` for `await using`).',
            'Disposal runs when the block exits — even on early return or throw. No more forgotten `finally` blocks.',
          ],
          ru: [
            'Реализуй `[Symbol.dispose]()` (или `[Symbol.asyncDispose]()` для `await using`).',
            'Освобождение срабатывает при выходе из блока — даже при раннем return или throw. Забытых `finally` больше нет.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `function openFile(path: string) {
  return {
    read() { /* ... */ },
    [Symbol.dispose]() { console.log('file closed'); },
  };
}

function work() {
  using file = openFile('data.txt');
  file.read();
} // <- file automatically closed here`,
          },
        ],
        quiz: {
          question: { en: 'When is a `using` resource disposed?', ru: 'Когда освобождается ресурс `using`?' },
          options: [
            { text: { en: 'When the enclosing block/scope exits, including on throw', ru: 'При выходе из блока/области видимости, в том числе при throw' }, correct: true },
            { text: { en: 'Only when you call `.dispose()` manually', ru: 'Только когда вручную вызовешь `.dispose()`' }, correct: false },
            { text: { en: 'On the next garbage-collection cycle', ru: 'На следующем цикле сборки мусора' }, correct: false },
          ],
          explanation: {
            en: 'Disposal is deterministic: `[Symbol.dispose]()` runs when the block exits by any path, which is exactly what makes it safer than manual cleanup.',
            ru: 'Освобождение детерминировано: `[Symbol.dispose]()` вызывается при любом выходе из блока — именно поэтому это безопаснее ручной очистки.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html',
      },
      {
        id: 'ts52-named-tuples',
        title: { en: 'Named and anonymous tuple elements', ru: 'Именованные и анонимные элементы кортежей' },
        icon: 'tags',
        level: 'minor',
        tags: ['tuples'],
        summary: {
          en: 'Mix labeled and unlabeled elements in tuple types for clearer signatures.',
          ru: 'Смешивай подписанные и неподписанные элементы в кортежах для более понятных сигнатур.',
        },
        code: [{ language: 'typescript', code: `type Range = [first: number, second: number];` }],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.3
  {
    version: '5.3',
    track: 'typescript',
    released: 'Nov 2023',
    headline: {
      en: 'Import attributes and smarter `switch (true)` narrowing.',
      ru: 'Import attributes и умное сужение в `switch (true)`.',
    },
    highlights: {
      en: ['Import attributes (with { type })', 'switch(true) narrowing', 'narrowing on const comparisons'],
      ru: ['Import attributes (with { type })', 'Сужение в switch(true)', 'Сужение при сравнении с const'],
    },
    features: [
      {
        id: 'ts53-import-attributes',
        title: { en: 'Import attributes', ru: 'Import attributes' },
        icon: 'box',
        level: 'major',
        tags: ['modules'],
        summary: {
          en: 'The standardized `with { type: "json" }` syntax tells the runtime how to interpret an imported module (replaces the older `assert`).',
          ru: 'Стандартный синтаксис `with { type: "json" }` сообщает рантайму, как трактовать импортируемый модуль (замена старому `assert`).',
        },
        code: [{ language: 'typescript', code: `import config from './config.json' with { type: 'json' };` }],
      },
      {
        id: 'ts53-switch-true',
        title: { en: '`switch (true)` narrowing', ru: 'Сужение в `switch (true)`' },
        icon: 'branch',
        level: 'flagship',
        tags: ['narrowing'],
        summary: {
          en: 'TypeScript now narrows types inside `switch (true)` branches the way it does for chained `if/else`.',
          ru: 'TypeScript теперь сужает типы в ветках `switch (true)` так же, как в цепочке `if/else`.',
        },
        code: [
          {
            language: 'typescript',
            code: `function area(shape: Circle | Square) {
  switch (true) {
    case shape.kind === 'circle':
      return Math.PI * shape.radius ** 2; // shape: Circle
    case shape.kind === 'square':
      return shape.side ** 2;             // shape: Square
  }
}`,
          },
        ],
        quiz: {
          question: {
            en: 'Before 5.3, what happened to narrowing inside `switch (true)` cases?',
            ru: 'Что было с сужением в ветках `switch (true)` до версии 5.3?',
          },
          options: [
            { text: { en: 'It did not narrow — you had to use if/else chains', ru: 'Сужения не было — приходилось использовать цепочки if/else' }, correct: true },
            { text: { en: 'It narrowed the same as now', ru: 'Сужение работало так же, как сейчас' }, correct: false },
            { text: { en: '`switch (true)` was a syntax error', ru: '`switch (true)` был синтаксической ошибкой' }, correct: false },
          ],
          explanation: {
            en: 'Prior to 5.3, `switch (true)` cases did not benefit from control-flow narrowing, so many teams fell back to `if/else`. Now it just works.',
            ru: 'До 5.3 ветки `switch (true)` не получали сужения по потоку управления, поэтому многие возвращались к `if/else`. Теперь работает как надо.',
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.4
  {
    version: '5.4',
    track: 'typescript',
    released: 'Mar 2024',
    headline: {
      en: 'Narrowing survives closures, and `NoInfer<T>` gives you control over inference.',
      ru: 'Сужение переживает замыкания, а `NoInfer<T>` даёт контроль над выводом типов.',
    },
    highlights: {
      en: ['Preserved narrowing in closures', 'NoInfer<T> utility', 'Object.groupBy / Map.groupBy'],
      ru: ['Сохранение сужения в замыканиях', 'Утилита NoInfer<T>', 'Object.groupBy / Map.groupBy'],
    },
    features: [
      {
        id: 'ts54-noinfer',
        title: { en: 'The `NoInfer<T>` utility type', ru: 'Утилитный тип `NoInfer<T>`' },
        icon: 'shield',
        level: 'flagship',
        tags: ['generics', 'inference'],
        summary: {
          en: 'Block a type parameter from being inferred from a particular argument, forcing inference to come from where you intend.',
          ru: 'Запрещает выводить параметр типа из конкретного аргумента, заставляя вывод идти оттуда, откуда нужно тебе.',
        },
        code: [
          {
            language: 'typescript',
            code: `function createStreet<C extends string>(
  colors: C[],
  defaultColor: NoInfer<C>,   // must be one of colors, doesn't drive inference
) { /* ... */ }

createStreet(['red', 'green'], 'red');   // ✅
createStreet(['red', 'green'], 'blue');  // ❌ 'blue' not in the list`,
          },
        ],
        quiz: {
          question: { en: 'What does `NoInfer<C>` do in a parameter position?', ru: 'Что делает `NoInfer<C>` в позиции параметра?' },
          options: [
            { text: { en: 'Stops that argument from being used to infer `C`', ru: 'Не даёт использовать этот аргумент для вывода `C`' }, correct: true },
            { text: { en: 'Forces `C` to be `any`', ru: 'Делает `C` равным `any`' }, correct: false },
            { text: { en: 'Makes the parameter optional', ru: 'Делает параметр необязательным' }, correct: false },
          ],
          explanation: {
            en: '`NoInfer` excludes an argument from the inference process, so `C` is fixed by the other arguments and this one is merely validated against it.',
            ru: '`NoInfer` исключает аргумент из вывода, поэтому `C` фиксируется другими аргументами, а этот лишь проверяется на соответствие.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html',
      },
      {
        id: 'ts54-closure-narrowing',
        title: { en: 'Preserved narrowing in closures', ru: 'Сохранение сужения в замыканиях' },
        icon: 'eye',
        level: 'major',
        tags: ['narrowing'],
        summary: {
          en: 'Narrowing based on `const` variables now survives inside function expressions created after the last assignment.',
          ru: 'Сужение по `const`-переменным теперь сохраняется внутри функций, созданных после последнего присваивания.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.5
  {
    version: '5.5',
    track: 'typescript',
    released: 'Jun 2024',
    headline: {
      en: 'Inferred type predicates — TypeScript writes your `x is T` for you.',
      ru: 'Выводимые type predicates — TypeScript сам напишет твой `x is T`.',
    },
    highlights: {
      en: [
        'Inferred type predicates',
        'Control-flow narrowing for constant indexed access',
        'Regex syntax checking',
        'Isolated declarations',
      ],
      ru: [
        'Выводимые type predicates',
        'Сужение по потоку для константного доступа по индексу',
        'Проверка синтаксиса регулярок',
        'Isolated declarations',
      ],
    },
    features: [
      {
        id: 'ts55-inferred-predicates',
        title: { en: 'Inferred type predicates', ru: 'Выводимые type predicates' },
        icon: 'brain',
        level: 'flagship',
        tags: ['narrowing', 'inference'],
        summary: {
          en: 'A function whose body clearly checks a type now gets an inferred type-guard signature automatically — filters just work.',
          ru: 'Функция, тело которой явно проверяет тип, автоматически получает сигнатуру type-guard — фильтры просто работают.',
        },
        beforeAfter: {
          note: {
            en: 'Previously `.filter(Boolean)` still left `(string | null)[]`. Now inference narrows it.',
            ru: 'Раньше `.filter(Boolean)` оставлял `(string | null)[]`. Теперь вывод сужает тип.',
          },
          before: {
            language: 'typescript',
            label: { en: 'Before 5.5 — hand-written guard', ru: 'До 5.5 — ручной guard' },
            code: `const list = ['a', null, 'b'];
function isString(x: unknown): x is string {
  return typeof x === 'string';
}
const strings = list.filter(isString); // string[]`,
          },
          after: {
            language: 'typescript',
            label: { en: '5.5 — predicate inferred', ru: '5.5 — предикат выводится' },
            code: `const list = ['a', null, 'b'];
// no explicit "x is string" needed — TS infers it:
const strings = list.filter(x => x !== null); // string[]`,
          },
        },
        quiz: {
          question: {
            en: 'In 5.5, what lets `list.filter(x => x !== null)` return `string[]` instead of `(string | null)[]`?',
            ru: 'Что в 5.5 позволяет `list.filter(x => x !== null)` вернуть `string[]` вместо `(string | null)[]`?',
          },
          options: [
            { text: { en: 'TypeScript infers a type predicate from the arrow function body', ru: 'TypeScript выводит type predicate из тела стрелочной функции' }, correct: true },
            { text: { en: 'A new `filter` overload for null', ru: 'Новая перегрузка `filter` для null' }, correct: false },
            { text: { en: 'Nothing — you still need an explicit guard', ru: 'Ничего — всё ещё нужен явный guard' }, correct: false },
          ],
          explanation: {
            en: 'When a function’s return expression is a clear type check on a parameter, TS 5.5 infers a `x is T` predicate, so downstream calls like `filter` narrow correctly.',
            ru: 'Когда возвращаемое выражение функции — явная проверка типа параметра, TS 5.5 выводит предикат `x is T`, и вызовы вроде `filter` сужают корректно.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html',
      },
      {
        id: 'ts55-isolated-declarations',
        title: { en: 'Isolated declarations', ru: 'Isolated declarations' },
        icon: 'gauge',
        level: 'major',
        tags: ['build', 'performance'],
        summary: {
          en: '`--isolatedDeclarations` requires enough explicit types that `.d.ts` files can be generated per-file in parallel by external tools — big monorepo build wins.',
          ru: '`--isolatedDeclarations` требует достаточно явных типов, чтобы `.d.ts` можно было генерировать по файлам параллельно внешними инструментами — большой выигрыш для монорепо.',
        },
      },
      {
        id: 'ts55-regex',
        title: { en: 'Regular expression syntax checking', ru: 'Проверка синтаксиса регулярных выражений' },
        icon: 'bug',
        level: 'minor',
        tags: ['dx'],
        summary: {
          en: 'The compiler now flags invalid regex literals (bad groups, backreferences, flags) at build time.',
          ru: 'Компилятор теперь помечает некорректные литералы регулярок (плохие группы, обратные ссылки, флаги) на этапе сборки.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.6 / 5.7
  {
    version: '5.6 – 5.7',
    track: 'typescript',
    released: 'Sep 2024 – Nov 2024',
    headline: {
      en: 'Iterator helpers, safer truthiness checks, and used-before-assigned detection.',
      ru: 'Iterator helpers, безопасные проверки на истинность и детект «использовано до присваивания».',
    },
    highlights: {
      en: [
        'Disallowed always-truthy/nullish checks',
        'Iterator helper methods (.map/.filter/.take on iterators)',
        'Used-before-assigned across functions',
        'ES2024 lib & --target es2024',
      ],
      ru: [
        'Запрет всегда-истинных/нулевых проверок',
        'Методы-хелперы итераторов (.map/.filter/.take)',
        'Использование до присваивания через функции',
        'Библиотека ES2024 и --target es2024',
      ],
    },
    features: [
      {
        id: 'ts56-truthy-checks',
        title: { en: 'Disallowed nonsensical truthiness checks', ru: 'Запрет бессмысленных проверок на истинность' },
        icon: 'warn',
        level: 'major',
        tags: ['safety'],
        summary: {
          en: 'Expressions that are always truthy or always nullish (e.g. comparing a regex/function directly) are now flagged as likely bugs.',
          ru: 'Выражения, которые всегда истинны или всегда nullish (например, прямое сравнение регулярки/функции), теперь помечаются как вероятные баги.',
        },
        code: [
          {
            language: 'typescript',
            code: `if (/re/) {}        // ❌ always truthy — probably meant /re/.test(x)
if (someFn) {}       // ❌ a function reference is always truthy`,
          },
        ],
      },
      {
        id: 'ts56-iterator-helpers',
        title: { en: 'Iterator helper methods', ru: 'Методы-хелперы итераторов' },
        icon: 'nodes',
        level: 'major',
        tags: ['stdlib', 'runtime'],
        summary: {
          en: 'Typings for the new iterator helpers let you chain `.map`, `.filter`, `.take`, `.drop` lazily on any iterator.',
          ru: 'Типы для новых хелперов итераторов позволяют лениво чейнить `.map`, `.filter`, `.take`, `.drop` на любом итераторе.',
        },
        code: [
          {
            language: 'typescript',
            code: `const firstThreeEven = numbers()
  .filter(n => n % 2 === 0)
  .take(3)
  .toArray();`,
          },
        ],
      },
      {
        id: 'ts57-used-before-assigned',
        title: { en: 'Used-before-assigned across functions', ru: 'Использование до присваивания через функции' },
        icon: 'bug',
        level: 'minor',
        tags: ['safety'],
        summary: {
          en: 'The compiler catches more cases of variables read before they are definitely assigned, even across nested functions.',
          ru: 'Компилятор ловит больше случаев чтения переменной до её гарантированного присваивания, даже через вложенные функции.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 5.8 / 5.9
  {
    version: '5.8 – 5.9',
    track: 'typescript',
    released: '2025',
    headline: {
      en: 'Erasable-syntax alignment with Node type-stripping, and deferred imports.',
      ru: 'Согласование стираемого синтаксиса с type-stripping в Node и отложенные импорты.',
    },
    highlights: {
      en: [
        '--erasableSyntaxOnly (Node type stripping)',
        'require() of ESM (--module node18/node20)',
        'Granular return-branch checking',
        'import defer',
      ],
      ru: [
        '--erasableSyntaxOnly (стирание типов в Node)',
        'require() для ESM (--module node18/node20)',
        'Точная проверка веток return',
        'import defer',
      ],
    },
    features: [
      {
        id: 'ts58-erasable',
        title: { en: '--erasableSyntaxOnly', ru: '--erasableSyntaxOnly' },
        icon: 'feather',
        level: 'flagship',
        tags: ['build', 'node'],
        summary: {
          en: 'Restrict your code to TypeScript syntax that can be *erased* to plain JS — so runtimes like Node (and Deno/Bun) can strip types without a real compile step.',
          ru: 'Ограничивает код синтаксисом TypeScript, который можно *стереть* в чистый JS — чтобы рантаймы вроде Node (и Deno/Bun) убирали типы без настоящей компиляции.',
        },
        details: {
          en: [
            'Bans runtime-affecting TS-only constructs: `enum`, `namespace` with runtime code, parameter properties, and legacy `experimentalDecorators` emit.',
            'Aligns your codebase with native Node type stripping (`node --experimental-strip-types` / stable in newer Node).',
          ],
          ru: [
            'Запрещает влияющие на рантайм TS-конструкции: `enum`, `namespace` с рантайм-кодом, параметр-свойства и эмит старых `experimentalDecorators`.',
            'Согласует код с нативным стиранием типов в Node (`node --experimental-strip-types` / стабильно в свежих Node).',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `// ❌ not erasable — emits runtime code
enum Color { Red, Green }
class P { constructor(private x: number) {} }

// ✅ erasable equivalents
const Color = { Red: 0, Green: 1 } as const;
class P2 { constructor(x: number) { this.x = x; } x: number; }`,
          },
        ],
        quiz: {
          question: {
            en: 'Why does `--erasableSyntaxOnly` ban `enum` and parameter properties?',
            ru: 'Почему `--erasableSyntaxOnly` запрещает `enum` и параметр-свойства?',
          },
          options: [
            { text: { en: 'They emit real runtime JS, so they can’t be stripped away like pure types', ru: 'Они порождают реальный рантайм-JS, поэтому их нельзя стереть как чистые типы' }, correct: true },
            { text: { en: 'They are deprecated and being removed', ru: 'Они устарели и удаляются' }, correct: false },
            { text: { en: 'They are slow to type-check', ru: 'Они медленно проверяются по типам' }, correct: false },
          ],
          explanation: {
            en: 'Type stripping only removes syntax that has no runtime effect. `enum`, runtime `namespace`, and parameter properties generate JS, so they’re disallowed under erasable-only mode.',
            ru: 'Стирание типов убирает только синтаксис без рантайм-эффекта. `enum`, рантайм-`namespace` и параметр-свойства порождают JS, поэтому в режиме erasable-only они запрещены.',
          },
        },
        docs: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html',
      },
      {
        id: 'ts58-require-esm',
        title: { en: 'require() of ESM in Node', ru: 'require() для ESM в Node' },
        icon: 'box',
        level: 'major',
        tags: ['modules', 'node'],
        summary: {
          en: 'With `--module node18`/`node20`, TypeScript models Node’s ability to `require()` an ES module, easing CJS↔ESM interop.',
          ru: 'С `--module node18`/`node20` TypeScript моделирует способность Node делать `require()` ES-модуля, упрощая взаимодействие CJS↔ESM.',
        },
      },
      {
        id: 'ts59-import-defer',
        title: { en: 'import defer', ru: 'import defer' },
        icon: 'hourglass',
        level: 'minor',
        tags: ['modules', 'performance'],
        summary: {
          en: 'Deferred module evaluation: `import defer * as m from "..."` loads a module but delays running its top-level code until first use.',
          ru: 'Отложенное выполнение модуля: `import defer * as m from "..."` загружает модуль, но откладывает выполнение его верхнеуровневого кода до первого использования.',
        },
        code: [{ language: 'typescript', code: `import defer * as heavy from './heavy.js';` }],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 6.0
  {
    version: '6.0',
    track: 'typescript',
    released: '2026',
    headline: {
      en: 'The bridge to the native, Go-based compiler (TypeScript 7 “Corsa”).',
      ru: 'Мост к нативному компилятору на Go (TypeScript 7 «Corsa»).',
    },
    highlights: {
      en: [
        'Preps deprecations ahead of the native port',
        'tsgo — ~10× faster type-checking & builds',
        'Stricter defaults; removes long-deprecated flags',
      ],
      ru: [
        'Подготавливает депрекейты перед нативным портом',
        'tsgo — ~в 10× быстрее проверка типов и сборка',
        'Строже дефолты; удаляет давно устаревшие флаги',
      ],
    },
    features: [
      {
        id: 'ts60-native',
        title: { en: 'Toward the native compiler (tsgo / TS 7)', ru: 'К нативному компилятору (tsgo / TS 7)' },
        icon: 'rocket',
        level: 'flagship',
        tags: ['performance', 'tooling'],
        summary: {
          en: 'TypeScript is being ported to Go for roughly an order-of-magnitude speedup in compilation, editor load and memory. 6.0 is the last JS-line release that prepares the migration.',
          ru: 'TypeScript переписывают на Go ради ускорения примерно на порядок в компиляции, загрузке редактора и памяти. 6.0 — последний релиз JS-линейки, готовящий миграцию.',
        },
        details: {
          en: [
            'The native port (codename Corsa, shipped as `tsgo`) targets ~10× faster builds and near-instant editor startup on large codebases.',
            '6.0 tightens defaults and removes deprecated compiler options so projects are ready for TS 7.',
            'Your app already runs on the 6.0 line — check `npx tsc --version`.',
          ],
          ru: [
            'Нативный порт (кодовое имя Corsa, поставляется как `tsgo`) нацелен на ~10× ускорение сборки и почти мгновенный старт редактора на больших кодовых базах.',
            '6.0 ужесточает дефолты и убирает устаревшие опции компилятора, чтобы проекты были готовы к TS 7.',
            'Твоё приложение уже на линейке 6.0 — проверь `npx tsc --version`.',
          ],
        },
        quiz: {
          question: {
            en: 'What is the headline goal of the native TypeScript compiler effort?',
            ru: 'Какая главная цель работы над нативным компилятором TypeScript?',
          },
          options: [
            { text: { en: 'Roughly 10× faster builds and editor responsiveness via a Go port', ru: 'Ускорение сборки и отзывчивости редактора примерно в 10× через порт на Go' }, correct: true },
            { text: { en: 'Dropping support for generics', ru: 'Отказ от поддержки дженериков' }, correct: false },
            { text: { en: 'Replacing JavaScript output with WebAssembly', ru: 'Замена вывода JavaScript на WebAssembly' }, correct: false },
          ],
          explanation: {
            en: 'The Go-based port (tsgo → TypeScript 7) is about performance — large projects see roughly 10× faster type-checking and much lower editor latency. The language semantics stay the same.',
            ru: 'Порт на Go (tsgo → TypeScript 7) — про производительность: большие проекты получают ~10× ускорение проверки типов и куда меньшую задержку редактора. Семантика языка не меняется.',
          },
        },
        docs: 'https://devblogs.microsoft.com/typescript/',
      },
      {
        id: 'ts60-deprecations',
        title: { en: 'Removed deprecated options & stricter defaults', ru: 'Удалены устаревшие опции и строже дефолты' },
        icon: 'tools',
        level: 'major',
        tags: ['config', 'migration'],
        summary: {
          en: 'Long-deprecated flags and behaviours are removed. Audit your tsconfig — options warned about in the 5.x line are gone in 6.0.',
          ru: 'Давно устаревшие флаги и поведения удалены. Проверь свой tsconfig — опции, о которых предупреждали в линейке 5.x, в 6.0 исчезли.',
        },
      },
    ],
  },
];
