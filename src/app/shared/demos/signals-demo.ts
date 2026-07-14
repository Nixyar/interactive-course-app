import { Component, computed, effect, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-signals-demo',
  template: `
    <div class="demo-panel">
      <div class="row">
        <div class="stat">
          <span class="k">count()</span>
          <span class="v">{{ count() }}</span>
        </div>
        <div class="stat">
          <span class="k">double = computed()</span>
          <span class="v">{{ double() }}</span>
        </div>
        <div class="stat">
          <span class="k">parity = computed()</span>
          <span class="v">{{ parity() }}</span>
        </div>
      </div>

      <div class="controls">
        <button class="evo-btn" (click)="count.update((c) => c - 1)">− decrement</button>
        <button class="evo-btn primary" (click)="count.update((c) => c + 1)">+ increment</button>
        <button class="evo-btn ghost" (click)="count.set(0)">reset</button>
      </div>

      @if (i18n.lang() === 'ru') {
        <p class="hint">
          <code>double</code> и <code>parity</code> пересчитываются автоматически — и только когда
          <code>count()</code> реально меняется. <code>effect()</code> ниже логирует каждое изменение.
        </p>
      } @else {
        <p class="hint">
          <code>double</code> and <code>parity</code> recompute automatically — and only when
          <code>count()</code> actually changes. The <code>effect()</code> below logs every change.
        </p>
      }

      <div class="demo-output">
        <div class="out-head">effect() log</div>
        @for (line of log(); track $index) {
          <div class="line">{{ line }}</div>
        } @empty {
          <div class="line muted">{{ i18n.lang() === 'ru' ? '— измени счётчик, чтобы сработал effect —' : '— change the count to see the effect fire —' }}</div>
        }
      </div>
    </div>
  `,
  styleUrl: './demo.scss',
})
export class SignalsDemo {
  protected readonly i18n = inject(LanguageService);
  protected readonly count = signal(0);
  protected readonly double = computed(() => this.count() * 2);
  protected readonly parity = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));
  protected readonly log = signal<string[]>([]);

  constructor() {
    effect(() => {
      const c = this.count();
      this.log.update((l) => [`count changed → ${c} (double=${c * 2})`, ...l].slice(0, 6));
    });
  }
}
