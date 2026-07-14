import { Injectable, computed, effect, signal } from '@angular/core';

export type Lang = 'ru' | 'en';
const KEY = 'evo.lang';

/** A value available in both languages. */
export interface Loc<T = string> {
  en: T;
  ru: T;
}

/** Static UI strings (chrome, labels, buttons) in both languages. */
const UI = {
  ru: {
    subtitle: 'Angular 15 → 22 и TypeScript — интерактивно',
    footer1: 'Собрано на Angular 22 · Signals · Angular Material · FontAwesome',
    footer2: 'Твой прогресс сохраняется локально в этом браузере.',
    filterAll: 'Все',
    filterFlagship: 'Флагман',
    filterMajor: 'Важное',
    filterMinor: 'Удобство',
    learnedInTrack: 'изучено в этом треке',
    released: 'Вышло',
    markLearned: 'Отметить как изученное',
    marked: 'Изучено',
    officialDocs: 'Официальная документация',
    before: 'Было',
    after: 'Стало',
    tryAgain: 'Ещё раз',
    correct: 'Верно! ',
    notQuite: 'Не совсем. ',
    livePlayground: 'Живая песочница — здесь прямо сейчас работает Angular',
    comingSoon: 'Интерактивное демо скоро появится.',
    copy: 'Копировать',
    copied: 'Скопировано',
    noFeatures: 'Нет фич этого уровня.',
    levelFlagship: 'Флагман',
    levelMajor: 'Важное',
    levelMinor: 'Удобство',
    levelBreaking: 'Ломающее',
    themeToLight: 'Переключить на светлую тему',
    themeToDark: 'Переключить на тёмную тему',
    langLabel: 'Сменить язык на английский',
  },
  en: {
    subtitle: 'Angular 15 → 22 & TypeScript — interactive',
    footer1: 'Built with Angular 22 · Signals · Angular Material · FontAwesome',
    footer2: 'Your progress is saved locally in this browser.',
    filterAll: 'All',
    filterFlagship: 'Flagship',
    filterMajor: 'Major',
    filterMinor: 'Quality of life',
    learnedInTrack: 'learned in this track',
    released: 'Released',
    markLearned: 'Mark as learned',
    marked: 'Marked as learned',
    officialDocs: 'Official docs',
    before: 'Before',
    after: 'After',
    tryAgain: 'Try again',
    correct: 'Correct! ',
    notQuite: 'Not quite. ',
    livePlayground: 'Live playground — this is running Angular',
    comingSoon: 'Interactive demo coming soon.',
    copy: 'Copy',
    copied: 'Copied',
    noFeatures: 'No features at this level.',
    levelFlagship: 'Flagship',
    levelMajor: 'Major',
    levelMinor: 'Quality of life',
    levelBreaking: 'Breaking',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    langLabel: 'Switch language to Russian',
  },
} as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.initial());
  readonly ui = computed(() => UI[this.lang()]);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(KEY, this.lang());
      } catch {
        /* ignore */
      }
    });
  }

  /** Resolve a bilingual value to the active language. Works for strings and string[]. */
  pick<T>(value: Loc<T>): T {
    return value[this.lang()];
  }

  toggle(): void {
    this.lang.update((l) => (l === 'ru' ? 'en' : 'ru'));
  }

  private initial(): Lang {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === 'ru' || saved === 'en') return saved;
    } catch {
      /* ignore */
    }
    return 'ru';
  }
}
