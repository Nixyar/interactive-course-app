import { Component, inject, linkedSignal, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

const SETS: Record<string, string[]> = {
  Fruit: ['Apple', 'Banana', 'Cherry'],
  Colors: ['Red', 'Green', 'Blue'],
  Cities: ['Oslo', 'Paris', 'Tokyo'],
};

@Component({
  selector: 'app-linked-signal-demo',
  template: `
    <div class="demo-panel">
      <div class="controls">
        <span class="lbl">{{ ru() ? 'Набор-источник:' : 'Source set:' }}</span>
        @for (name of setNames; track name) {
          <button
            class="evo-btn"
            [class.primary]="current() === name"
            (click)="current.set(name)"
          >
            {{ name }}
          </button>
        }
      </div>

      <div class="field">
        <label>choice = linkedSignal(() =&gt; options()[0])</label>
        <div class="chips">
          @for (opt of options(); track opt) {
            <button class="chip" [class.on]="choice() === opt" (click)="choice.set(opt)">
              {{ opt }}
            </button>
          }
        </div>
      </div>

      <div class="row">
        <div class="stat">
          <span class="k">options()[0]</span>
          <span class="v">{{ options()[0] }}</span>
        </div>
        <div class="stat">
          <span class="k">choice() (writable)</span>
          <span class="v">{{ choice() }}</span>
        </div>
      </div>

      @if (ru()) {
        <p class="hint">
          Выбери чип, чтобы <strong>переопределить</strong> значение. Затем переключи набор-источник —
          выбор <strong>сбрасывается</strong> на первый вариант автоматически. Это и есть
          <code>linkedSignal</code>: записываемый, но пересчитываемый при изменении источника.
        </p>
      } @else {
        <p class="hint">
          Pick a chip to <strong>override</strong> the choice. Then switch the source set — the choice
          <strong>resets</strong> to the first option automatically. That's <code>linkedSignal</code>:
          writable, but re-derived when its source changes.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .lbl { align-self: center; font-size: 0.83rem; color: var(--mat-sys-on-surface-variant); }
      .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .chip {
        padding: 0.4rem 0.85rem; border-radius: 999px; cursor: pointer;
        border: 1px solid var(--evo-border); background: var(--mat-sys-surface);
        color: var(--mat-sys-on-surface); font-size: 0.85rem;
      }
      .chip.on { background: var(--mat-sys-primary); color: var(--mat-sys-on-primary);
        border-color: var(--mat-sys-primary); }
    `,
  ],
})
export class LinkedSignalDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly setNames = Object.keys(SETS);
  protected readonly current = signal(this.setNames[0]);
  protected readonly options = linkedSignal(() => SETS[this.current()]);
  // choice derives from options, but is user-writable and resets when options change
  protected readonly choice = linkedSignal(() => this.options()[0]);
}
