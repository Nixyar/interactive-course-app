import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

/** Child: signal inputs + a two-way model() + an output(). */
@Component({
  selector: 'app-greeting-card',
  template: `
    <div class="card">
      <button class="star" (click)="fav.set(!fav())" [attr.aria-pressed]="fav()">
        {{ fav() ? '★' : '☆' }}
      </button>
      <div class="name">{{ fullName() }}</div>
      <div class="role">{{ role() }}</div>
      <button class="evo-btn" (click)="greet.emit(fullName())">
        {{ i18n.lang() === 'ru' ? 'помахать 👋' : 'wave 👋' }}
      </button>
    </div>
  `,
  styles: [
    `
      .card {
        position: relative; padding: 1rem 1.1rem; border-radius: 14px; min-width: 190px;
        border: 1px solid var(--evo-border);
        background: linear-gradient(135deg,
          color-mix(in srgb, var(--mat-sys-primary) 10%, var(--mat-sys-surface)),
          var(--mat-sys-surface));
      }
      .name { font-size: 1.15rem; font-weight: 700; }
      .role { font-size: 0.8rem; color: var(--mat-sys-on-surface-variant); margin-bottom: 0.6rem; }
      .star { position: absolute; top: 0.6rem; right: 0.7rem; background: none; border: none;
        font-size: 1.2rem; cursor: pointer; color: var(--mat-sys-tertiary); }
    `,
  ],
})
export class GreetingCard {
  protected readonly i18n = inject(LanguageService);
  readonly firstName = input('Ada');
  readonly lastName = input.required<string>();
  readonly role = input('Developer');
  readonly fav = model(false);
  readonly greet = output<string>();

  readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}

@Component({
  selector: 'app-signal-inputs-demo',
  imports: [GreetingCard],
  template: `
    <div class="demo-panel">
      <div class="split">
        <div class="fields">
          <div class="field">
            <label for="fn">firstName = input()</label>
            <input id="fn" [value]="first()" (input)="first.set($any($event.target).value)" />
          </div>
          <div class="field">
            <label for="ln">lastName = input.required()</label>
            <input id="ln" [value]="last()" (input)="last.set($any($event.target).value)" />
          </div>
          <label class="chk">
            <input type="checkbox" [checked]="fav()" (change)="fav.set($any($event.target).checked)" />
            {{ ru() ? 'fav = model() — двусторонняя привязка' : 'fav = model() — two-way bound' }}
          </label>
        </div>

        <app-greeting-card
          [firstName]="first()"
          [lastName]="last()"
          [(fav)]="fav"
          (greet)="onGreet($event)"
        />
      </div>

      <div class="demo-output">
        <div class="out-head">output() events</div>
        @for (line of log(); track $index) {
          <div class="line">{{ line }}</div>
        } @empty {
          <div class="line muted">{{ ru() ? '— нажми «помахать» на карточке —' : '— click "wave" on the card —' }}</div>
        }
      </div>
      @if (ru()) {
        <p class="hint">
          Печатай в полях (сигнальный <code>input()</code>), переключай звезду и чекбокс — они
          синхронны через <code>model()</code>. «Помахать» вызывает <code>output()</code>.
        </p>
      } @else {
        <p class="hint">
          Type in the fields (signal <code>input()</code>), toggle the star and the checkbox — both stay
          in sync via <code>model()</code>. "Wave" fires an <code>output()</code>.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .split { display: flex; flex-wrap: wrap; gap: 1.2rem; align-items: flex-start; }
      .fields { flex: 1 1 240px; display: flex; flex-direction: column; gap: 0.7rem; }
      .chk { display: flex; align-items: center; gap: 0.5rem; font-size: 0.83rem;
        color: var(--mat-sys-on-surface-variant); }
    `,
  ],
})
export class SignalInputsDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly first = signal('Ada');
  protected readonly last = signal('Lovelace');
  protected readonly fav = signal(true);
  protected readonly log = signal<string[]>([]);

  protected onGreet(name: string): void {
    const msg = this.ru() ? `👋 ${name} машет рукой` : `👋 ${name} says hi`;
    this.log.update((l) => [`${msg} (${new Date().toLocaleTimeString()})`, ...l].slice(0, 5));
  }
}
