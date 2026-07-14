import { Component, inject, signal } from '@angular/core';
import { DeferChild } from './defer-child';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-defer-demo',
  imports: [DeferChild],
  template: `
    <div class="demo-panel">
      <div class="controls">
        <button class="evo-btn primary" (click)="load.set(true)" [disabled]="load()">
          {{ ru() ? 'Запустить' : 'Trigger' }} &#64;defer (when load())
        </button>
        <button class="evo-btn ghost" (click)="load.set(false)">reset</button>
      </div>

      @defer (when load()) {
        <app-defer-child />
      } @placeholder {
        <div class="ph">{{ ru() ? '💤 Плейсхолдер — тяжёлого компонента ещё нет в бандле.' : "💤 Placeholder — the heavy component isn't in the bundle yet." }}</div>
      } @loading (minimum 400ms) {
        <div class="ph">{{ ru() ? '⏳ Загружаю чанк…' : '⏳ Loading chunk…' }}</div>
      } @error {
        <div class="ph err">{{ ru() ? 'Ошибка загрузки.' : 'Failed to load.' }}</div>
      }

      @if (ru()) {
        <p class="hint">
          Код дочернего компонента выделяется в отдельный чанк и скачивается только при срабатывании
          триггера. Реальные триггеры: <code>on viewport</code>, <code>on interaction</code>,
          <code>on idle</code>, <code>on hover</code>.
        </p>
      } @else {
        <p class="hint">
          The child's code is split into its own chunk and only downloaded when the trigger fires.
          Real triggers include <code>on viewport</code>, <code>on interaction</code>,
          <code>on idle</code>, and <code>on hover</code>.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .ph {
        padding: 0.9rem 1rem; border: 1px dashed var(--evo-border); border-radius: 12px;
        color: var(--mat-sys-on-surface-variant); font-size: 0.9rem;
        background: color-mix(in srgb, var(--mat-sys-on-surface) 3%, transparent);
      }
      .ph.err { color: var(--mat-sys-error); border-color: var(--mat-sys-error); }
    `,
  ],
})
export class DeferDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly load = signal(false);
}
