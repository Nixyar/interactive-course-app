import { Component, inject, resource, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

interface Profile {
  id: number;
  name: string;
  planet: string;
}

const DB: Record<number, Profile> = {
  1: { id: 1, name: 'Ada Lovelace', planet: 'Earth' },
  2: { id: 2, name: 'Grace Hopper', planet: 'Earth' },
  3: { id: 3, name: 'Alan Turing', planet: 'Earth' },
};

@Component({
  selector: 'app-resource-demo',
  template: `
    <div class="demo-panel">
      <div class="controls">
        <span class="lbl">userId():</span>
        @for (id of ids; track id) {
          <button class="evo-btn" [class.primary]="userId() === id" (click)="userId.set(id)">
            {{ id }}
          </button>
        }
        <button class="evo-btn" [class.primary]="userId() === 99" (click)="userId.set(99)">
          99 ({{ ru() ? 'ошибка' : 'error' }})
        </button>
        <button class="evo-btn ghost" (click)="user.reload()">reload()</button>
      </div>

      <div class="result">
        @if (user.isLoading()) {
          <div class="box loading">{{ ru() ? '⏳ загрузка…' : '⏳ loading…' }} <span class="spin"></span></div>
        } @else if (user.error()) {
          <div class="box err">❌ {{ $any(user.error()).message }}</div>
        } @else if (user.value(); as u) {
          <div class="box ok">
            <div class="big">{{ u.name }}</div>
            <div class="sub">id {{ u.id }} · {{ u.planet }}</div>
          </div>
        }
      </div>

      <div class="row">
        <div class="stat"><span class="k">status()</span><span class="v small">{{ user.status() }}</span></div>
        <div class="stat"><span class="k">isLoading()</span><span class="v small">{{ user.isLoading() }}</span></div>
      </div>

      @if (ru()) {
        <p class="hint">
          Меняй <code>userId()</code> — и <code>resource</code> автоматически перезапускает загрузчик,
          отдавая <code>value()</code>, <code>isLoading()</code>, <code>error()</code> и
          <code>status()</code> как сигналы. Попробуй id 99, чтобы увидеть обработку ошибки.
        </p>
      } @else {
        <p class="hint">
          Change <code>userId()</code> and the <code>resource</code> re-runs its loader automatically —
          exposing <code>value()</code>, <code>isLoading()</code>, <code>error()</code> and
          <code>status()</code> as signals. Try id 99 to see error handling.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .lbl { align-self: center; font-size: 0.83rem; color: var(--mat-sys-on-surface-variant); }
      .result { min-height: 74px; }
      .box { padding: 0.9rem 1.1rem; border-radius: 12px; border: 1px solid var(--evo-border); }
      .box.ok { background: color-mix(in srgb, var(--evo-success) 12%, transparent); }
      .box.err { background: color-mix(in srgb, var(--mat-sys-error) 12%, transparent);
        color: var(--mat-sys-error); }
      .box.loading { color: var(--mat-sys-on-surface-variant); display: flex; align-items: center; gap: 0.6rem; }
      .big { font-size: 1.25rem; font-weight: 700; }
      .sub { font-size: 0.82rem; color: var(--mat-sys-on-surface-variant); }
      .v.small { font-size: 1rem; }
      .spin { width: 14px; height: 14px; border-radius: 50%;
        border: 2px solid var(--mat-sys-primary); border-top-color: transparent;
        display: inline-block; animation: sp 0.7s linear infinite; }
      @keyframes sp { to { transform: rotate(360deg); } }
    `,
  ],
})
export class ResourceDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly ids = [1, 2, 3];
  protected readonly userId = signal(1);

  protected readonly user = resource<Profile, { id: number }>({
    params: () => ({ id: this.userId() }),
    loader: ({ params }) =>
      new Promise<Profile>((resolve, reject) =>
        setTimeout(() => {
          const found = DB[params.id];
          const msg =
            this.i18n.lang() === 'ru'
              ? `Нет пользователя с id ${params.id}`
              : `No user with id ${params.id}`;
          found ? resolve(found) : reject(new Error(msg));
        }, 700),
      ),
  });
}
