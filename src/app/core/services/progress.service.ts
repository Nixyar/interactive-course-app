import { Injectable, computed, effect, signal } from '@angular/core';

const KEY = 'evo.progress';

/** Tracks which feature ids the learner has marked as "understood", persisted locally. */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly done = signal<Set<string>>(this.load());

  readonly learnedIds = computed(() => this.done());
  readonly count = computed(() => this.done().size);

  constructor() {
    effect(() => {
      const ids = [...this.done()];
      try {
        localStorage.setItem(KEY, JSON.stringify(ids));
      } catch {
        /* ignore */
      }
    });
  }

  isLearned(id: string): boolean {
    return this.done().has(id);
  }

  toggle(id: string): void {
    this.done.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /** How many of the given ids are done — used for per-version progress rings. */
  completed(ids: string[]): number {
    const set = this.done();
    return ids.reduce((n, id) => (set.has(id) ? n + 1 : n), 0);
  }

  reset(): void {
    this.done.set(new Set());
  }

  private load(): Set<string> {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        return new Set(JSON.parse(raw) as string[]);
      }
    } catch {
      /* ignore */
    }
    return new Set();
  }
}
