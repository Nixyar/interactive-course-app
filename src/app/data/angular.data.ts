import { VersionInfo } from '../core/models/content.model';

/**
 * Angular evolution 15 → 22.
 * All prose is bilingual ({ en, ru }); code samples are shared (universal).
 * `demo` keys map to live playgrounds in shared/demos.
 */
export const ANGULAR_VERSIONS: VersionInfo[] = [
  // ─────────────────────────────────────────────────────────── v15
  {
    version: '15',
    track: 'angular',
    codename: { en: 'Standalone stable', ru: 'Standalone стабилен' },
    released: 'Nov 2022',
    headline: {
      en: 'Standalone APIs go stable — the beginning of the end for NgModules.',
      ru: 'Standalone API стабильны — начало конца эпохи NgModules.',
    },
    highlights: {
      en: [
        'Standalone components/directives/pipes are production-ready',
        'Directive composition API (hostDirectives)',
        'NgOptimizedImage stable',
        'Functional router guards & provideRouter',
      ],
      ru: [
        'Standalone компоненты/директивы/пайпы готовы к продакшену',
        'Directive composition API (hostDirectives)',
        'NgOptimizedImage стабилен',
        'Функциональные гварды и provideRouter',
      ],
    },
    features: [
      {
        id: 'ng15-standalone',
        title: { en: 'Standalone components (stable)', ru: 'Standalone-компоненты (стабильно)' },
        icon: 'box',
        level: 'flagship',
        tags: ['standalone', 'architecture'],
        summary: {
          en: 'Components declare their own dependencies via `imports` — no more NgModule boilerplate. This is your current baseline on v15.',
          ru: 'Компонент сам объявляет зависимости через `imports` — без бойлерплейта NgModule. Это твоя текущая база на v15.',
        },
        details: {
          en: [
            'A standalone component sets `standalone: true` and lists what it uses in `imports`.',
            'Bootstrap the app with `bootstrapApplication(App, appConfig)` instead of an AppModule.',
            'From v17 `ng new` scaffolds standalone by default; from v19 it is the default flag; in v20 the `standalone: true` line is implicit and should be omitted.',
          ],
          ru: [
            'Standalone-компонент ставит `standalone: true` и перечисляет всё используемое в `imports`.',
            'Запуск приложения через `bootstrapApplication(App, appConfig)` вместо AppModule.',
            'С v17 `ng new` генерирует standalone по умолчанию; с v19 это дефолт; в v20 строка `standalone: true` подразумевается и её опускают.',
          ],
        },
        beforeAfter: {
          note: {
            en: 'The NgModule wrapper disappears — the component owns its dependencies.',
            ru: 'Обёртка NgModule исчезает — компонент сам владеет зависимостями.',
          },
          before: {
            language: 'typescript',
            label: { en: 'NgModule world (≤ v14 style)', ru: 'Мир NgModule (стиль ≤ v14)' },
            code: `@Component({ selector: 'user-card', templateUrl: './user-card.html' })
export class UserCardComponent {}

@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}`,
          },
          after: {
            language: 'typescript',
            label: { en: 'Standalone (v15+)', ru: 'Standalone (v15+)' },
            code: `@Component({
  selector: 'user-card',
  standalone: true,            // implicit from v20+
  imports: [NgIf, NgFor],      // the component owns its deps
  templateUrl: './user-card.html',
})
export class UserCard {}`,
          },
        },
        quiz: {
          question: {
            en: 'How does a standalone component get access to another component/pipe/directive?',
            ru: 'Как standalone-компонент получает доступ к другому компоненту/пайпу/директиве?',
          },
          options: [
            { text: { en: 'By listing it in the component `imports` array', ru: 'Перечислив его в массиве `imports` компонента' }, correct: true },
            { text: { en: 'By declaring it in an NgModule', ru: 'Объявив его в NgModule' }, correct: false },
            { text: { en: 'It is available globally, no import needed', ru: 'Он доступен глобально, импорт не нужен' }, correct: false },
          ],
          explanation: {
            en: 'Standalone components are self-contained: everything used in the template must appear in `imports` (or be a built-in like the new control flow).',
            ru: 'Standalone-компоненты самодостаточны: всё, что используется в шаблоне, должно быть в `imports` (или быть встроенным, как новый control flow).',
          },
        },
        docs: 'https://angular.dev/guide/components/importing',
      },
      {
        id: 'ng15-host-directives',
        title: { en: 'Directive composition API', ru: 'Directive composition API' },
        icon: 'puzzle',
        level: 'major',
        tags: ['directives', 'reuse'],
        summary: {
          en: 'Attach directives to a host component/directive via `hostDirectives`, composing behaviour without inheritance.',
          ru: 'Навешивай директивы на хост через `hostDirectives`, компонуя поведение без наследования.',
        },
        code: [
          {
            language: 'typescript',
            label: { en: 'Compose behaviour onto a host', ru: 'Композиция поведения на хосте' },
            code: `@Component({
  selector: 'admin-menu',
  hostDirectives: [
    HasColor,
    { directive: CdkMenu, inputs: ['cdkMenuDisabled: disabled'] },
  ],
})
export class AdminMenu {}`,
          },
        ],
        docs: 'https://angular.dev/guide/directives/directive-composition-api',
      },
      {
        id: 'ng15-image',
        title: { en: 'NgOptimizedImage (stable)', ru: 'NgOptimizedImage (стабильно)' },
        icon: 'image',
        level: 'major',
        tags: ['performance', 'images'],
        summary: {
          en: 'Drop-in `ngSrc` directive that enforces sizing, lazy-loads by default, and generates srcsets — big LCP wins.',
          ru: 'Директива `ngSrc`: требует размеры, лениво грузит по умолчанию и генерирует srcset — большой выигрыш по LCP.',
        },
        beforeAfter: {
          before: { language: 'html', code: `<img src="/hero.jpg" width="800" height="400" />` },
          after: {
            language: 'html',
            label: { en: 'Priority hint + automatic optimization', ru: 'Приоритет + автоматическая оптимизация' },
            code: `<img ngSrc="/hero.jpg" width="800" height="400" priority />`,
          },
        },
        docs: 'https://angular.dev/guide/image-optimization',
      },
      {
        id: 'ng15-functional-guards',
        title: { en: 'Functional router guards & provideRouter', ru: 'Функциональные гварды и provideRouter' },
        icon: 'route',
        level: 'minor',
        tags: ['router'],
        summary: {
          en: 'Guards become plain functions using `inject()`; routing is configured with `provideRouter()` in providers.',
          ru: 'Гварды становятся обычными функциями с `inject()`; роутинг настраивается через `provideRouter()` в провайдерах.',
        },
        code: [
          {
            language: 'typescript',
            code: `export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn() || inject(Router).createUrlTree(['/login']);
};`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v16
  {
    version: '16',
    track: 'angular',
    codename: { en: 'Signals arrive', ru: 'Приходят сигналы' },
    released: 'May 2023',
    headline: {
      en: 'Reactivity is reborn: Signals land in developer preview.',
      ru: 'Реактивность перерождается: сигналы приходят в developer preview.',
    },
    highlights: {
      en: [
        'Signals: signal / computed / effect',
        'Required inputs',
        'Router data as component inputs',
        'takeUntilDestroyed & DestroyRef',
      ],
      ru: [
        'Сигналы: signal / computed / effect',
        'Обязательные inputs',
        'Данные роута как inputs компонента',
        'takeUntilDestroyed и DestroyRef',
      ],
    },
    features: [
      {
        id: 'ng16-signals',
        title: { en: 'Signals (developer preview)', ru: 'Сигналы (developer preview)' },
        icon: 'signal',
        level: 'flagship',
        tags: ['signals', 'reactivity'],
        summary: {
          en: 'A signal is a reactive value container. Read it as a function `count()`; write with `set`/`update`. `computed()` derives, `effect()` reacts.',
          ru: 'Сигнал — реактивный контейнер значения. Читается как функция `count()`, пишется через `set`/`update`. `computed()` вычисляет производное, `effect()` реагирует.',
        },
        details: {
          en: [
            'Signals give Angular fine-grained reactivity independent of Zone.js — the groundwork for zoneless.',
            'computed() is lazy and memoized; it only recomputes when a dependency it actually read changes.',
            'effect() runs side effects when its dependencies change (logging, sync to storage, etc.).',
          ],
          ru: [
            'Сигналы дают точечную реактивность без Zone.js — фундамент для zoneless.',
            'computed() ленив и мемоизирован: пересчитывается только когда меняется реально прочитанная зависимость.',
            'effect() выполняет побочные эффекты при изменении зависимостей (логирование, синхронизация в хранилище и т.д.).',
          ],
        },
        code: [
          {
            language: 'typescript',
            label: { en: 'The three primitives', ru: 'Три примитива' },
            code: `count = signal(0);
double = computed(() => this.count() * 2);

constructor() {
  effect(() => console.log('count is', this.count()));
}

inc() { this.count.update(c => c + 1); }`,
          },
        ],
        demo: 'signals',
        quiz: {
          question: {
            en: 'Why is `computed()` cheaper than a getter that does the same calculation?',
            ru: 'Почему `computed()` дешевле геттера, который делает то же вычисление?',
          },
          options: [
            { text: { en: 'It memoizes and only recomputes when a read dependency changes', ru: 'Он мемоизирует и пересчитывается только при изменении прочитанной зависимости' }, correct: true },
            { text: { en: 'It runs on a Web Worker', ru: 'Он выполняется в Web Worker' }, correct: false },
            { text: { en: 'It caches forever and never updates', ru: 'Он кэширует навсегда и не обновляется' }, correct: false },
          ],
          explanation: {
            en: 'A getter recomputes on every access. `computed()` tracks the signals it reads and returns the cached value until one of them actually changes.',
            ru: 'Геттер пересчитывается при каждом обращении. `computed()` отслеживает прочитанные сигналы и отдаёт кэш, пока один из них реально не изменится.',
          },
        },
        docs: 'https://angular.dev/guide/signals',
      },
      {
        id: 'ng16-required-inputs',
        title: { en: 'Required inputs', ru: 'Обязательные inputs' },
        icon: 'checklist',
        level: 'minor',
        tags: ['inputs', 'dx'],
        summary: {
          en: 'Mark an input mandatory; the compiler errors if a consumer forgets it.',
          ru: 'Помечаешь input обязательным — компилятор ругается, если его забыли передать.',
        },
        code: [{ language: 'typescript', code: `@Input({ required: true }) userId!: string;` }],
      },
      {
        id: 'ng16-router-inputs',
        title: { en: 'Route params as component inputs', ru: 'Параметры роута как inputs компонента' },
        icon: 'route',
        level: 'major',
        tags: ['router', 'dx'],
        summary: {
          en: 'Enable `withComponentInputBinding()` and route params, query params and resolved data bind straight to `@Input()`s.',
          ru: 'Включаешь `withComponentInputBinding()` — параметры роута, query и resolved-данные привязываются прямо к `@Input()`.',
        },
        beforeAfter: {
          before: {
            language: 'typescript',
            label: { en: 'Subscribe to the ActivatedRoute', ru: 'Подписка на ActivatedRoute' },
            code: `id = '';
constructor(route: ActivatedRoute) {
  route.paramMap.subscribe(p => this.id = p.get('id')!);
}`,
          },
          after: {
            language: 'typescript',
            label: { en: 'Just declare an input with the same name', ru: 'Просто объяви input с тем же именем' },
            code: `// provideRouter(routes, withComponentInputBinding())
@Input() id!: string;   // route: 'user/:id'`,
          },
        },
      },
      {
        id: 'ng16-takeuntildestroyed',
        title: { en: 'takeUntilDestroyed & DestroyRef', ru: 'takeUntilDestroyed и DestroyRef' },
        icon: 'recycle',
        level: 'minor',
        tags: ['rxjs', 'cleanup'],
        summary: {
          en: 'Auto-unsubscribe tied to the injection context — no more manual `destroy$` Subjects.',
          ru: 'Автоотписка, привязанная к контексту инъекции — больше не нужны ручные `destroy$`.',
        },
        code: [
          {
            language: 'typescript',
            code: `ngOnInit() {
  this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
}
// or, in a field initializer, no destroyRef arg needed`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v17
  {
    version: '17',
    track: 'angular',
    codename: { en: 'The renaissance', ru: 'Ренессанс' },
    released: 'Nov 2023',
    headline: {
      en: 'New control flow, deferrable views, esbuild by default, and angular.dev.',
      ru: 'Новый control flow, deferrable views, esbuild по умолчанию и angular.dev.',
    },
    highlights: {
      en: [
        'Built-in control flow: @if / @for / @switch',
        'Deferrable views: @defer',
        'Signals stable; new esbuild/Vite builder default',
        'afterRender / afterNextRender hooks',
      ],
      ru: [
        'Встроенный control flow: @if / @for / @switch',
        'Deferrable views: @defer',
        'Сигналы стабильны; новый билдер esbuild/Vite по умолчанию',
        'Хуки afterRender / afterNextRender',
      ],
    },
    features: [
      {
        id: 'ng17-control-flow',
        title: { en: 'Built-in control flow (@if / @for / @switch)', ru: 'Встроенный control flow (@if / @for / @switch)' },
        icon: 'branch',
        level: 'flagship',
        tags: ['templates', 'control-flow'],
        summary: {
          en: 'A new block syntax replaces the structural directives. Faster, less code, and `@for` requires `track` for identity.',
          ru: 'Новый блочный синтаксис вместо структурных директив. Быстрее, меньше кода, а `@for` требует `track` для идентичности.',
        },
        details: {
          en: [
            'No imports needed — the blocks are built into the template compiler.',
            '`@for` mandates a `track` expression, which fixes the historical `trackBy` performance footgun.',
            '`@if` supports `@else if` / `@else`; `@for` supports an `@empty` block.',
            'The old `*ngIf` / `*ngFor` still work; `ng generate @angular/core:control-flow` migrates automatically.',
          ],
          ru: [
            'Импорты не нужны — блоки встроены в компилятор шаблонов.',
            '`@for` обязательно требует `track`, что закрывает давнюю проблему производительности `trackBy`.',
            '`@if` поддерживает `@else if` / `@else`; `@for` — блок `@empty`.',
            'Старые `*ngIf` / `*ngFor` продолжают работать; `ng generate @angular/core:control-flow` мигрирует автоматически.',
          ],
        },
        beforeAfter: {
          note: {
            en: 'Note the mandatory `track` and the built-in `@empty`.',
            ru: 'Обрати внимание на обязательный `track` и встроенный `@empty`.',
          },
          before: {
            language: 'html',
            label: { en: '*ngIf / *ngFor', ru: '*ngIf / *ngFor' },
            code: `<div *ngIf="user; else guest">{{ user.name }}</div>
<ng-template #guest>Guest</ng-template>

<li *ngFor="let t of todos; trackBy: trackById">{{ t.title }}</li>`,
          },
          after: {
            language: 'html',
            label: { en: '@if / @for', ru: '@if / @for' },
            code: `@if (user) {
  <div>{{ user.name }}</div>
} @else {
  Guest
}

@for (t of todos; track t.id) {
  <li>{{ t.title }}</li>
} @empty {
  <li>No todos yet</li>
}`,
          },
        },
        demo: 'control-flow',
        quiz: {
          question: {
            en: 'What must every `@for` block include that `*ngFor` only optionally had?',
            ru: 'Что обязан включать каждый блок `@for`, что у `*ngFor` было лишь опционально?',
          },
          options: [
            { text: { en: 'A `track` expression for stable identity', ru: 'Выражение `track` для стабильной идентичности' }, correct: true },
            { text: { en: 'An `@empty` block', ru: 'Блок `@empty`' }, correct: false },
            { text: { en: 'An explicit `index` variable', ru: 'Явную переменную `index`' }, correct: false },
          ],
          explanation: {
            en: '`track` is mandatory in `@for`. It lets Angular reuse DOM nodes across changes and prevents needless re-rendering.',
            ru: '`track` обязателен в `@for`. Он позволяет Angular переиспользовать DOM-узлы и избегать лишних перерисовок.',
          },
        },
        docs: 'https://angular.dev/guide/templates/control-flow',
      },
      {
        id: 'ng17-defer',
        title: { en: 'Deferrable views (@defer)', ru: 'Deferrable views (@defer)' },
        icon: 'hourglass',
        level: 'flagship',
        tags: ['templates', 'performance', 'lazy'],
        summary: {
          en: 'Declaratively lazy-load a chunk of template (and its dependencies) on a trigger — viewport, interaction, idle, timer…',
          ru: 'Декларативно лениво загружай кусок шаблона (и его зависимости) по триггеру — viewport, взаимодействие, простой, таймер…',
        },
        details: {
          en: [
            '`@defer` code-splits everything used only inside the block, shrinking the initial bundle.',
            'Companion blocks: `@placeholder` (before load), `@loading` (during), `@error` (on failure).',
            'Triggers: `on idle`, `on viewport`, `on interaction`, `on hover`, `on timer(...)`, or `when <condition>`.',
          ],
          ru: [
            '`@defer` выносит в отдельный чанк всё, что используется только внутри блока, уменьшая начальный бандл.',
            'Сопутствующие блоки: `@placeholder` (до загрузки), `@loading` (во время), `@error` (при ошибке).',
            'Триггеры: `on idle`, `on viewport`, `on interaction`, `on hover`, `on timer(...)` или `when <условие>`.',
          ],
        },
        code: [
          {
            language: 'html',
            code: `@defer (on viewport) {
  <heavy-chart [data]="data" />
} @placeholder {
  <div class="skeleton">Chart loads when scrolled into view…</div>
} @loading (minimum 300ms) {
  <spinner />
}`,
          },
        ],
        demo: 'defer',
        docs: 'https://angular.dev/guide/templates/defer',
      },
      {
        id: 'ng17-after-render',
        title: { en: 'afterRender / afterNextRender', ru: 'afterRender / afterNextRender' },
        icon: 'eye',
        level: 'minor',
        tags: ['lifecycle', 'dom'],
        summary: {
          en: 'Run code after the DOM has been rendered — the safe place for manual DOM measurement or third-party libraries. SSR-safe (browser only).',
          ru: 'Запуск кода после отрисовки DOM — безопасное место для ручных замеров DOM или сторонних библиотек. SSR-безопасно (только в браузере).',
        },
        code: [
          {
            language: 'typescript',
            code: `afterNextRender(() => {
  // runs once, browser-only, after first paint
  chart.init(this.canvas.nativeElement);
});`,
          },
        ],
      },
      {
        id: 'ng17-builder',
        title: { en: 'esbuild application builder (default)', ru: 'Билдер приложения на esbuild (по умолчанию)' },
        icon: 'rocket',
        level: 'major',
        tags: ['tooling', 'performance'],
        summary: {
          en: 'New `@angular/build` application builder uses esbuild + Vite for dramatically faster builds and an instant dev server with HMR.',
          ru: 'Новый билдер `@angular/build` на esbuild + Vite: кратно быстрее сборка и мгновенный dev-сервер с HMR.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v17.1–17.3
  {
    version: '17.x',
    track: 'angular',
    codename: { en: 'Signal I/O', ru: 'Signal I/O' },
    released: 'Jan–Mar 2024',
    headline: {
      en: 'Components become signal-native: signal inputs, model() and output().',
      ru: 'Компоненты становятся signal-native: сигнальные inputs, model() и output().',
    },
    highlights: {
      en: ['Signal inputs: input() / input.required()', 'Two-way model()', 'Function-based output()'],
      ru: ['Сигнальные inputs: input() / input.required()', 'Двусторонний model()', 'Функциональный output()'],
    },
    features: [
      {
        id: 'ng17-signal-inputs',
        title: { en: 'Signal inputs — input()', ru: 'Сигнальные inputs — input()' },
        icon: 'signal',
        level: 'flagship',
        tags: ['signals', 'inputs'],
        summary: {
          en: 'Inputs as signals. Read them reactively, derive with `computed()`, and use `transform`. `input.required()` for mandatory ones.',
          ru: 'Inputs как сигналы. Читаешь реактивно, вычисляешь через `computed()`, используешь `transform`. `input.required()` — для обязательных.',
        },
        beforeAfter: {
          before: {
            language: 'typescript',
            label: { en: 'Decorator input', ru: 'Input через декоратор' },
            code: `@Input() firstName = '';
@Input() lastName = '';
get fullName() { return this.firstName + ' ' + this.lastName; }`,
          },
          after: {
            language: 'typescript',
            label: { en: 'Signal input', ru: 'Сигнальный input' },
            code: `firstName = input('');
lastName = input.required<string>();
fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);`,
          },
        },
        demo: 'signal-inputs',
        docs: 'https://angular.dev/guide/components/inputs',
      },
      {
        id: 'ng17-model',
        title: { en: 'Two-way binding — model()', ru: 'Двусторонняя привязка — model()' },
        icon: 'rotate',
        level: 'major',
        tags: ['signals', 'two-way'],
        summary: {
          en: 'A `model()` signal is a writable input that also emits changes, enabling `[(value)]` on your own components.',
          ru: 'Сигнал `model()` — это записываемый input, который ещё и эмитит изменения, позволяя `[(value)]` на своих компонентах.',
        },
        code: [
          {
            language: 'typescript',
            code: `// in a custom <toggle> component:
checked = model(false);
flip() { this.checked.update(v => !v); }

// usage: <toggle [(checked)]="isOn" />`,
          },
        ],
      },
      {
        id: 'ng17-output',
        title: { en: 'Function-based output()', ru: 'Функциональный output()' },
        icon: 'forward',
        level: 'minor',
        tags: ['outputs'],
        summary: {
          en: 'A lighter `output()` replaces `@Output() new EventEmitter()`.',
          ru: 'Более лёгкий `output()` заменяет `@Output() new EventEmitter()`.',
        },
        beforeAfter: {
          before: { language: 'typescript', code: `@Output() saved = new EventEmitter<User>();` },
          after: { language: 'typescript', code: `saved = output<User>();` },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v18
  {
    version: '18',
    track: 'angular',
    codename: { en: 'Zoneless preview', ru: 'Zoneless preview' },
    released: 'May 2024',
    headline: {
      en: 'Control flow & deferrable views go stable; zoneless change detection appears.',
      ru: 'Control flow и deferrable views стабильны; появляется zoneless change detection.',
    },
    highlights: {
      en: [
        'Zoneless change detection (experimental)',
        'Material 3 stable',
        '@if/@for/@defer stable',
        'Unified form status events observable',
      ],
      ru: [
        'Zoneless change detection (экспериментально)',
        'Material 3 стабилен',
        '@if/@for/@defer стабильны',
        'Единый observable событий формы',
      ],
    },
    features: [
      {
        id: 'ng18-zoneless',
        title: { en: 'Zoneless change detection (experimental)', ru: 'Zoneless change detection (экспериментально)' },
        icon: 'bolt',
        level: 'flagship',
        tags: ['signals', 'performance', 'zoneless'],
        summary: {
          en: 'Drop Zone.js entirely. Change detection is driven by signals, async pipe and explicit notifications — smaller bundle, faster, cleaner stack traces.',
          ru: 'Полный отказ от Zone.js. Change detection управляется сигналами, async-пайпом и явными уведомлениями — меньше бандл, быстрее, чище стектрейсы.',
        },
        details: {
          en: [
            'Enable with `provideExperimentalZonelessChangeDetection()` and remove `zone.js` from polyfills.',
            'Your components should use signals (or `markForCheck`) so Angular knows when to re-render.',
            'By v22 this is stable and the default for new apps — the provider is now `provideZonelessChangeDetection()`.',
          ],
          ru: [
            'Включается через `provideExperimentalZonelessChangeDetection()`; `zone.js` убирается из полифилов.',
            'Компоненты должны использовать сигналы (или `markForCheck`), чтобы Angular знал, когда перерисовывать.',
            'К v22 это стабильно и по умолчанию для новых приложений — провайдер теперь `provideZonelessChangeDetection()`.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()],
});`,
          },
        ],
        quiz: {
          question: {
            en: 'In a zoneless app, what tells Angular a component needs re-rendering?',
            ru: 'В zoneless-приложении что сообщает Angular, что компонент нужно перерисовать?',
          },
          options: [
            { text: { en: 'Signal reads in the template, async pipe, or markForCheck', ru: 'Чтение сигналов в шаблоне, async-пайп или markForCheck' }, correct: true },
            { text: { en: 'Zone.js monkey-patching setTimeout', ru: 'Zone.js, патчащий setTimeout' }, correct: false },
            { text: { en: 'A full document re-render every frame', ru: 'Полная перерисовка документа каждый кадр' }, correct: false },
          ],
          explanation: {
            en: 'Without Zone.js, Angular relies on signals consumed in templates, the async pipe, host listeners, and explicit `markForCheck()` to schedule change detection.',
            ru: 'Без Zone.js Angular опирается на сигналы в шаблонах, async-пайп, host-listeners и явный `markForCheck()`, чтобы запланировать change detection.',
          },
        },
        docs: 'https://angular.dev/guide/zoneless',
      },
      {
        id: 'ng18-material3',
        title: { en: 'Material 3 (stable)', ru: 'Material 3 (стабильно)' },
        icon: 'layers',
        level: 'major',
        tags: ['material', 'design'],
        summary: {
          en: 'Angular Material adopts Material Design 3 with token-based theming via the `mat.theme()` Sass API and CSS system variables.',
          ru: 'Angular Material переходит на Material Design 3 с токен-темизацией через Sass-API `mat.theme()` и системные CSS-переменные.',
        },
        code: [
          {
            language: 'scss',
            code: `@use '@angular/material' as mat;
html {
  @include mat.theme((
    color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette),
    typography: Roboto,
    density: 0,
  ));
}`,
          },
        ],
      },
      {
        id: 'ng18-form-events',
        title: { en: 'Unified form events', ru: 'Единые события форм' },
        icon: 'nodes',
        level: 'minor',
        tags: ['forms', 'rxjs'],
        summary: {
          en: 'A single `form.events` observable emits value, status, touched, pristine and submit events in one stream.',
          ru: 'Единый observable `form.events` эмитит value, status, touched, pristine и submit в одном потоке.',
        },
        code: [
          {
            language: 'typescript',
            code: `form.events.subscribe(e => {
  if (e instanceof TouchedChangeEvent) { /* ... */ }
});`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v19
  {
    version: '19',
    track: 'angular',
    codename: { en: 'Signals everywhere', ru: 'Сигналы повсюду' },
    released: 'Nov 2024',
    headline: {
      en: 'linkedSignal, resource(), incremental hydration and standalone-by-default.',
      ru: 'linkedSignal, resource(), инкрементальная гидратация и standalone по умолчанию.',
    },
    highlights: {
      en: [
        'linkedSignal — writable state that resets from a source',
        'resource() / rxResource — async as signals',
        'Incremental hydration (@defer hydrate)',
        '@let template variables; standalone is now the default',
      ],
      ru: [
        'linkedSignal — записываемое состояние, сбрасываемое от источника',
        'resource() / rxResource — асинхронность как сигналы',
        'Инкрементальная гидратация (@defer hydrate)',
        'Шаблонные переменные @let; standalone теперь по умолчанию',
      ],
    },
    features: [
      {
        id: 'ng19-linkedsignal',
        title: { en: 'linkedSignal()', ru: 'linkedSignal()' },
        icon: 'branch',
        level: 'flagship',
        tags: ['signals', 'state'],
        summary: {
          en: 'A writable signal that is derived from a source but can be locally overridden — and re-derives when the source changes.',
          ru: 'Записываемый сигнал, производный от источника, который можно локально переопределить — и который пересчитывается при изменении источника.',
        },
        details: {
          en: [
            'Perfect for "selected item resets when the list changes" scenarios.',
            'Unlike `computed()` (read-only) you can `.set()` a linkedSignal; unlike a plain `signal()` it recomputes from its source.',
          ],
          ru: [
            'Идеально для сценария «выбранный элемент сбрасывается при смене списка».',
            'В отличие от `computed()` (только чтение), linkedSignal можно `.set()`; в отличие от обычного `signal()` — он пересчитывается от источника.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `options = input<string[]>([]);
// defaults to the first option, but the user can pick another;
// resets whenever options change
choice = linkedSignal(() => this.options()[0]);`,
          },
        ],
        demo: 'linked-signal',
        quiz: {
          question: { en: 'How does `linkedSignal` differ from `computed`?', ru: 'Чем `linkedSignal` отличается от `computed`?' },
          options: [
            { text: { en: 'linkedSignal is writable and re-derives from its source; computed is read-only', ru: 'linkedSignal записываем и пересчитывается от источника; computed — только чтение' }, correct: true },
            { text: { en: 'They are identical', ru: 'Они идентичны' }, correct: false },
            { text: { en: 'computed can be set but linkedSignal cannot', ru: 'computed можно присвоить, а linkedSignal нельзя' }, correct: false },
          ],
          explanation: {
            en: '`computed()` is read-only. `linkedSignal()` gives you a writable value that still snaps back to its computed source when that source changes.',
            ru: '`computed()` — только чтение. `linkedSignal()` даёт записываемое значение, которое всё равно сбрасывается к своему источнику при его изменении.',
          },
        },
        docs: 'https://angular.dev/guide/signals/linked-signal',
      },
      {
        id: 'ng19-resource',
        title: { en: 'resource() — async state as signals', ru: 'resource() — асинхронное состояние как сигналы' },
        icon: 'database',
        level: 'flagship',
        tags: ['signals', 'async', 'http'],
        summary: {
          en: 'Wrap an async loader in a signal-based resource that exposes `value()`, `status()`, `error()` and reloads when its request signal changes.',
          ru: 'Оборачивает асинхронный загрузчик в сигнальный resource с `value()`, `status()`, `error()`, который перезагружается при изменении сигнала запроса.',
        },
        code: [
          {
            language: 'typescript',
            code: `userId = signal(1);
user = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params }) => fetch(\`/api/users/\${params.id}\`).then(r => r.json()),
});
// template: @if (user.isLoading()) {…} @else { {{ user.value()?.name }} }`,
          },
        ],
        demo: 'resource',
        docs: 'https://angular.dev/guide/signals/resource',
      },
      {
        id: 'ng19-let',
        title: { en: '@let template variables', ru: 'Шаблонные переменные @let' },
        icon: 'code',
        level: 'major',
        tags: ['templates'],
        summary: {
          en: 'Declare local template variables — great for aliasing async pipe results or expensive expressions.',
          ru: 'Объявляй локальные переменные шаблона — удобно для алиасов результата async-пайпа или дорогих выражений.',
        },
        beforeAfter: {
          before: {
            language: 'html',
            code: `<ng-container *ngIf="user$ | async as user">
  {{ user.name }}
</ng-container>`,
          },
          after: {
            language: 'html',
            code: `@let user = user$ | async;
{{ user?.name }}`,
          },
        },
      },
      {
        id: 'ng19-incremental-hydration',
        title: { en: 'Incremental hydration', ru: 'Инкрементальная гидратация' },
        icon: 'server',
        level: 'major',
        tags: ['ssr', 'performance'],
        summary: {
          en: 'Combine `@defer` with hydration triggers so server-rendered chunks hydrate only on demand (viewport, interaction), cutting TBT.',
          ru: 'Совмещай `@defer` с триггерами гидратации, чтобы серверные блоки гидратировались по требованию (viewport, взаимодействие), снижая TBT.',
        },
        code: [
          {
            language: 'html',
            code: `@defer (hydrate on interaction) {
  <comments-section />
}`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v20
  {
    version: '20',
    track: 'angular',
    codename: { en: 'Signals stable', ru: 'Сигналы стабильны' },
    released: 'May 2025',
    headline: {
      en: 'The signals suite stabilizes; httpResource and richer templates arrive.',
      ru: 'Набор сигналов стабилизируется; приходят httpResource и более богатые шаблоны.',
    },
    highlights: {
      en: [
        'effect / linkedSignal / toSignal stable',
        'httpResource — declarative HTTP as a signal',
        'afterRenderEffect; richer template expressions',
        'New file naming (app.ts, foo.service.ts → foo.ts)',
      ],
      ru: [
        'effect / linkedSignal / toSignal стабильны',
        'httpResource — декларативный HTTP как сигнал',
        'afterRenderEffect; более богатые выражения в шаблонах',
        'Новые имена файлов (app.ts, foo.service.ts → foo.ts)',
      ],
    },
    features: [
      {
        id: 'ng20-signals-stable',
        title: { en: 'Signals suite is stable', ru: 'Набор сигналов стабилен' },
        icon: 'signal',
        level: 'flagship',
        tags: ['signals'],
        summary: {
          en: '`effect()`, `linkedSignal()` and `toSignal()` graduate from preview. Signal-based reactivity is now the recommended default.',
          ru: '`effect()`, `linkedSignal()` и `toSignal()` выходят из preview. Сигнальная реактивность — теперь рекомендованный дефолт.',
        },
        details: {
          en: [
            'Use signals for local component state, `computed()` for derived values, and reserve RxJS for event streams and complex async orchestration.',
            '`toSignal()` bridges an Observable into a signal for the template.',
          ],
          ru: [
            'Сигналы — для локального состояния, `computed()` — для производных значений, а RxJS оставь для потоков событий и сложной асинхронной оркестрации.',
            '`toSignal()` превращает Observable в сигнал для шаблона.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `search = signal('');
results = toSignal(
  toObservable(this.search).pipe(
    debounceTime(300),
    switchMap(q => this.api.search(q)),
  ),
  { initialValue: [] },
);`,
          },
        ],
      },
      {
        id: 'ng20-httpresource',
        title: { en: 'httpResource()', ru: 'httpResource()' },
        icon: 'network',
        level: 'flagship',
        tags: ['signals', 'http', 'async'],
        summary: {
          en: 'A resource specialised for HttpClient: pass a reactive URL/request and get a typed, auto-refetching signal resource.',
          ru: 'Resource, заточенный под HttpClient: передаёшь реактивный URL/запрос и получаешь типизированный, авто-перезапрашивающий сигнальный resource.',
        },
        code: [
          {
            language: 'typescript',
            code: `id = signal(1);
user = httpResource<User>(() => \`/api/users/\${this.id()}\`);
// user.value(), user.isLoading(), user.error() — refetches when id() changes`,
          },
        ],
        docs: 'https://angular.dev/guide/http/http-resource',
      },
      {
        id: 'ng20-templates',
        title: { en: 'Richer template expressions', ru: 'Более богатые выражения в шаблонах' },
        icon: 'code',
        level: 'minor',
        tags: ['templates'],
        summary: {
          en: 'Templates gain the exponentiation operator `**`, the `in` operator, untagged template literals and void expressions.',
          ru: 'В шаблонах появляются оператор возведения в степень `**`, оператор `in`, шаблонные строки и void-выражения.',
        },
        code: [
          {
            language: 'html',
            code: `{{ \`Hello \${name()}\` }}
@if ('id' in obj) { … }
<button (click)="items().length && doThing()">Go</button>`,
          },
        ],
      },
      {
        id: 'ng20-afterrendereffect',
        title: { en: 'afterRenderEffect()', ru: 'afterRenderEffect()' },
        icon: 'eye',
        level: 'minor',
        tags: ['lifecycle', 'signals'],
        summary: {
          en: 'A signal-aware render effect: re-runs after render whenever the signals it reads change — ideal for imperative DOM sync.',
          ru: 'Render-эффект, знающий о сигналах: повторяется после рендера при изменении прочитанных сигналов — идеально для императивной синхронизации DOM.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v21
  {
    version: '21',
    track: 'angular',
    codename: { en: 'Signal Forms preview', ru: 'Signal Forms preview' },
    released: 'Nov 2025',
    headline: {
      en: 'Signal Forms preview, zoneless as default, and Vitest as the test runner.',
      ru: 'Signal Forms в preview, zoneless по умолчанию и Vitest как тест-раннер.',
    },
    highlights: {
      en: [
        'Signal Forms (developer preview)',
        'Zoneless is the default for new apps',
        'Vitest replaces Karma as the default runner',
        'Selectorless components (experimental)',
      ],
      ru: [
        'Signal Forms (developer preview)',
        'Zoneless по умолчанию в новых приложениях',
        'Vitest вместо Karma как тест-раннер по умолчанию',
        'Selectorless-компоненты (экспериментально)',
      ],
    },
    features: [
      {
        id: 'ng21-signal-forms-preview',
        title: { en: 'Signal Forms (developer preview)', ru: 'Signal Forms (developer preview)' },
        icon: 'checklist',
        level: 'flagship',
        tags: ['forms', 'signals'],
        summary: {
          en: 'A brand-new forms system built entirely on signals: your model is a signal, and a schema function attaches validation to field paths.',
          ru: 'Совершенно новая система форм целиком на сигналах: модель — это сигнал, а функция-схема навешивает валидацию на пути полей.',
        },
        details: {
          en: [
            'No FormControl/FormGroup ceremony — the source of truth is your own signal.',
            'Field state (`value`, `errors`, `valid`, `touched`) is all signals.',
            'Stabilizes in v22; see the v22 entry for the full live demo.',
          ],
          ru: [
            'Без церемоний FormControl/FormGroup — источник истины это твой собственный сигнал.',
            'Состояние поля (`value`, `errors`, `valid`, `touched`) — всё сигналы.',
            'Стабилизируется в v22; полное живое демо смотри в разделе v22.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `import { form, required, email } from '@angular/forms/signals';

model = signal({ name: '', email: '' });
f = form(this.model, (path) => {
  required(path.name);
  email(path.email);
});`,
          },
        ],
      },
      {
        id: 'ng21-vitest',
        title: { en: 'Vitest is the default test runner', ru: 'Vitest — тест-раннер по умолчанию' },
        icon: 'flask',
        level: 'major',
        tags: ['tooling', 'testing'],
        summary: {
          en: 'New projects use Vitest (fast, ESM-native, Vite-powered) instead of Karma/Jasmine. This very app was scaffolded with Vitest.',
          ru: 'Новые проекты используют Vitest (быстрый, ESM-нативный, на Vite) вместо Karma/Jasmine. Это приложение сгенерировано именно с Vitest.',
        },
        code: [
          {
            language: 'typescript',
            code: `import { describe, it, expect } from 'vitest';

describe('adder', () => {
  it('adds', () => expect(1 + 1).toBe(2));
});`,
          },
        ],
      },
      {
        id: 'ng21-zoneless-default',
        title: { en: 'Zoneless by default', ru: 'Zoneless по умолчанию' },
        icon: 'bolt',
        level: 'major',
        tags: ['zoneless', 'performance'],
        summary: {
          en: 'New apps ship without Zone.js. There is no `zone.js` polyfill and no `NgZone` machinery — change detection is signal-driven out of the box.',
          ru: 'Новые приложения идут без Zone.js. Нет полифила `zone.js` и механики `NgZone` — change detection управляется сигналами из коробки.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── v22
  {
    version: '22',
    track: 'angular',
    codename: { en: 'Signal Forms stable', ru: 'Signal Forms стабильны' },
    released: 'May 2026',
    headline: {
      en: 'Signal Forms stable, OnPush by default, the @Service decorator, zoneless stable.',
      ru: 'Signal Forms стабильны, OnPush по умолчанию, декоратор @Service, стабильный zoneless.',
    },
    highlights: {
      en: [
        'Signal Forms are stable',
        'OnPush is the default change detection',
        '@Service decorator for singletons',
        'provideZonelessChangeDetection() is stable',
      ],
      ru: [
        'Signal Forms стабильны',
        'OnPush — change detection по умолчанию',
        'Декоратор @Service для синглтонов',
        'provideZonelessChangeDetection() стабилен',
      ],
    },
    features: [
      {
        id: 'ng22-signal-forms',
        title: { en: 'Signal Forms (stable)', ru: 'Signal Forms (стабильно)' },
        icon: 'checklist',
        level: 'flagship',
        tags: ['forms', 'signals'],
        summary: {
          en: 'Type-safe, signal-based forms. Build from a model signal with `form()`, attach validators (`required`, `email`, `minLength`…) in a schema, and bind fields with the `[formField]` directive.',
          ru: 'Типобезопасные формы на сигналах. Строишь из сигнала-модели через `form()`, навешиваешь валидаторы (`required`, `email`, `minLength`…) в схеме и привязываешь поля директивой `[formField]`.',
        },
        details: {
          en: [
            'The model signal is the single source of truth — read `f().value()`, per-field `f.email().errors()`, and overall `f().valid()`.',
            'Bind an input with `<input [formField]="f.email">`; state like touched/dirty is tracked automatically.',
            'Schema logic supports conditional `disabled`/`hidden`/`readonly` and async validators.',
          ],
          ru: [
            'Сигнал-модель — единственный источник истины: читаешь `f().value()`, по полю `f.email().errors()` и в целом `f().valid()`.',
            'Привязка инпута: `<input [formField]="f.email">`; состояние touched/dirty отслеживается автоматически.',
            'Логика схемы поддерживает условные `disabled`/`hidden`/`readonly` и асинхронные валидаторы.',
          ],
        },
        code: [
          {
            language: 'typescript',
            code: `import { form, required, email, minLength, submit } from '@angular/forms/signals';

model = signal({ name: '', email: '' });
f = form(this.model, (path) => {
  required(path.name, { message: 'Name is required' });
  minLength(path.name, 2);
  required(path.email);
  email(path.email);
});

save() {
  submit(this.f, async () => { await this.api.save(this.model()); });
}`,
          },
          {
            language: 'html',
            label: { en: 'Template', ru: 'Шаблон' },
            code: `<input [formField]="f.name" placeholder="Name" />
@if (f.name().touched() && f.name().errors().length) {
  <small>{{ f.name().errors()[0].message }}</small>
}
<button [disabled]="!f().valid()" (click)="save()">Save</button>`,
          },
        ],
        demo: 'signal-forms',
        quiz: {
          question: {
            en: 'In Signal Forms, what is the single source of truth for the form value?',
            ru: 'В Signal Forms что является единственным источником истины для значения формы?',
          },
          options: [
            { text: { en: 'Your own `signal()` model passed to `form()`', ru: 'Твой собственный сигнал-модель, переданный в `form()`' }, correct: true },
            { text: { en: 'A FormGroup instance', ru: 'Экземпляр FormGroup' }, correct: false },
            { text: { en: 'The DOM input values', ru: 'Значения DOM-инпутов' }, correct: false },
          ],
          explanation: {
            en: 'Signal Forms invert the classic model: you own a plain signal, and `form()` layers validation/state on top of it. The signal is always the source of truth.',
            ru: 'Signal Forms переворачивают классику: ты владеешь обычным сигналом, а `form()` наслаивает поверх него валидацию и состояние. Сигнал — всегда источник истины.',
          },
        },
        docs: 'https://angular.dev/guide/forms/signals',
      },
      {
        id: 'ng22-onpush-default',
        title: { en: 'OnPush by default', ru: 'OnPush по умолчанию' },
        icon: 'gauge',
        level: 'major',
        tags: ['performance', 'change-detection'],
        summary: {
          en: 'Components use OnPush change detection by default — you no longer set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly.',
          ru: 'Компоненты используют OnPush по умолчанию — больше не нужно явно ставить `changeDetection: ChangeDetectionStrategy.OnPush`.',
        },
        details: {
          en: [
            'Combined with zoneless + signals, this is the fast path: Angular only checks components whose signal dependencies changed.',
            'Setting OnPush manually is now redundant and discouraged by the style guide.',
          ],
          ru: [
            'В связке с zoneless + сигналами это быстрый путь: Angular проверяет только компоненты, чьи сигнальные зависимости изменились.',
            'Ставить OnPush вручную теперь избыточно и не рекомендуется style guide.',
          ],
        },
      },
      {
        id: 'ng22-service-decorator',
        title: { en: '@Service decorator', ru: 'Декоратор @Service' },
        icon: 'gears',
        level: 'major',
        tags: ['di', 'services'],
        summary: {
          en: 'A dedicated `@Service()` decorator for root singletons, cleaner than `@Injectable({ providedIn: "root" })`.',
          ru: 'Отдельный декоратор `@Service()` для корневых синглтонов, чище чем `@Injectable({ providedIn: "root" })`.',
        },
        beforeAfter: {
          before: {
            language: 'typescript',
            code: `@Injectable({ providedIn: 'root' })
export class UserApi {}`,
          },
          after: {
            language: 'typescript',
            label: { en: 'v22+', ru: 'v22+' },
            code: `@Service()
export class UserApi {}`,
          },
        },
      },
      {
        id: 'ng22-zoneless-stable',
        title: { en: 'provideZonelessChangeDetection() stable', ru: 'provideZonelessChangeDetection() стабилен' },
        icon: 'bolt',
        level: 'minor',
        tags: ['zoneless'],
        summary: {
          en: 'The zoneless provider drops its "experimental" name and is the recommended, stable way to run without Zone.js.',
          ru: 'Zoneless-провайдер теряет приставку «experimental» и становится рекомендованным стабильным способом работать без Zone.js.',
        },
        code: [
          {
            language: 'typescript',
            code: `bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection()],
});`,
          },
        ],
      },
    ],
  },
];
