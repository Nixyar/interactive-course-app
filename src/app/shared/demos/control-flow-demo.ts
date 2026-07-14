import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

interface Item {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-control-flow-demo',
  template: `
    <div class="demo-panel">
      <div class="controls">
        <input
          class="grow"
          [value]="draft()"
          (input)="draft.set($any($event.target).value)"
          (keyup.enter)="add()"
          [placeholder]="ru() ? 'Новая задача…' : 'New task…'"
          [attr.aria-label]="ru() ? 'Новая задача' : 'New task'"
        />
        <button class="evo-btn primary" (click)="add()">&#64;for add</button>
        <button class="evo-btn ghost" (click)="hideDone.update((v) => !v)">
          {{ hideDone() ? (ru() ? 'показать сделанные' : 'show done') : (ru() ? 'скрыть сделанные' : 'hide done') }}
        </button>
      </div>

      <!-- @for with mandatory track + @empty -->
      <ul class="list">
        @for (item of visible(); track item.id) {
          <li [class.done]="item.done">
            <button class="check" (click)="toggle(item.id)" [attr.aria-pressed]="item.done">
              {{ item.done ? '☑' : '☐' }}
            </button>
            <span>{{ item.title }}</span>
            <button class="x" (click)="remove(item.id)" aria-label="remove">✕</button>
          </li>
        } @empty {
          <li class="empty">{{ ru() ? 'Пусто — добавь задачу выше.' : 'Nothing here — add a task above.' }}</li>
        }
      </ul>

      <!-- @switch on a derived status -->
      <div class="status" [attr.data-s]="status()">
        @switch (status()) {
          @case ('empty') { <span>{{ ru() ? '📭 Задач пока нет.' : '📭 No tasks yet.' }}</span> }
          @case ('all-done') { <span>{{ ru() ? '🎉 Всё сделано — отлично!' : '🎉 All done — great job!' }}</span> }
          @default {
            <span>📌 {{ remaining() }} {{ ru() ? 'из' : 'of' }} {{ items().length }} {{ ru() ? 'осталось' : 'remaining' }}</span>
          }
        }
      </div>

      @if (ru()) {
        <p class="hint">
          Живые <code>&#64;for</code> (с обязательным <code>track item.id</code>),
          <code>&#64;empty</code> и <code>&#64;switch</code> — без импортов, всё встроено в шаблон.
        </p>
      } @else {
        <p class="hint">
          Live <code>&#64;for</code> (with required <code>track item.id</code>),
          <code>&#64;empty</code>, and <code>&#64;switch</code> — no imports, all built into the template.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .grow { flex: 1 1 auto; }
      .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
      .list li {
        display: flex; align-items: center; gap: 0.6rem;
        padding: 0.5rem 0.7rem; border: 1px solid var(--evo-border); border-radius: 10px;
        background: var(--mat-sys-surface);
      }
      .list li.done span { text-decoration: line-through; color: var(--mat-sys-on-surface-variant); }
      .list li.empty { justify-content: center; color: var(--mat-sys-on-surface-variant); }
      .check, .x { background: none; border: none; cursor: pointer; font-size: 1rem; color: inherit; }
      .x { margin-inline-start: auto; color: var(--mat-sys-error); }
      .list li span:not(.empty) { flex: 0 1 auto; }
      .status {
        padding: 0.6rem 0.8rem; border-radius: 10px; font-size: 0.9rem;
        background: color-mix(in srgb, var(--mat-sys-tertiary) 10%, transparent);
      }
      .status[data-s='all-done'] { background: color-mix(in srgb, var(--evo-success) 16%, transparent); }
    `,
  ],
})
export class ControlFlowDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  private seq = 3;
  protected readonly items = signal<Item[]>([
    { id: 1, title: 'Learn @if / @for', done: true },
    { id: 2, title: 'Master signals', done: false },
    { id: 3, title: 'Try Signal Forms', done: false },
  ]);
  protected readonly draft = signal('');
  protected readonly hideDone = signal(false);

  protected readonly visible = computed(() =>
    this.hideDone() ? this.items().filter((i) => !i.done) : this.items(),
  );
  protected readonly remaining = computed(() => this.items().filter((i) => !i.done).length);
  protected readonly status = computed(() => {
    const list = this.items();
    if (list.length === 0) return 'empty';
    if (list.every((i) => i.done)) return 'all-done';
    return 'partial';
  });

  protected add(): void {
    const title = this.draft().trim();
    if (!title) return;
    this.items.update((l) => [...l, { id: ++this.seq, title, done: false }]);
    this.draft.set('');
  }
  protected toggle(id: number): void {
    this.items.update((l) => l.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }
  protected remove(id: number): void {
    this.items.update((l) => l.filter((i) => i.id !== id));
  }
}
