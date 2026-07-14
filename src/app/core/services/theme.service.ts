import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

type Mode = 'light' | 'dark';
const KEY = 'evo.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly mode = signal<Mode>(this.initial());

  constructor() {
    effect(() => {
      const mode = this.mode();
      const root = this.doc.documentElement;
      root.classList.toggle('dark', mode === 'dark');
      root.style.colorScheme = mode;
      try {
        localStorage.setItem(KEY, mode);
      } catch {
        /* storage may be unavailable */
      }
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private initial(): Mode {
    try {
      const saved = localStorage.getItem(KEY) as Mode | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    const prefersDark =
      typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
