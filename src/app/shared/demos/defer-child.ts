import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

/** A "heavy" component that only loads when its @defer block triggers. */
@Component({
  selector: 'app-defer-child',
  template: `
    <div class="child">
      <strong>{{ ru() ? '🚀 Отложенный компонент загружен!' : '🚀 Deferred component loaded!' }}</strong>
      @if (ru()) {
        <p>
          JavaScript этого компонента лежал в <em>отдельном чанке</em> и подгрузился только когда
          сработал триггер <code>&#64;defer</code>. Загляни во вкладку Network — появился новый чанк.
        </p>
      } @else {
        <p>
          This component's JavaScript was in a <em>separate chunk</em>, fetched only when the
          <code>&#64;defer</code> trigger fired. Check the Network tab — a new chunk appeared.
        </p>
      }
      <div class="bars">
        @for (h of heights; track $index) {
          <span class="bar" [style.height.%]="h"></span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .child { padding: 0.5rem 0; }
      .child strong { color: var(--evo-success); }
      .child p { font-size: 0.85rem; color: var(--mat-sys-on-surface-variant); }
      .child code { font-family: var(--evo-mono); }
      .bars { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin-top: 0.5rem; }
      .bar {
        width: 14px; border-radius: 3px 3px 0 0;
        background: linear-gradient(var(--mat-sys-primary), var(--mat-sys-tertiary));
      }
    `,
  ],
})
export class DeferChild {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly heights = [40, 75, 55, 90, 30, 65, 80];
}
