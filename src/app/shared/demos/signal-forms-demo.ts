import { Component, inject, signal } from '@angular/core';
import { form, required, email, minLength, submit, FormField } from '@angular/forms/signals';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-signal-forms-demo',
  imports: [FormField],
  template: `
    <div class="demo-panel">
      <div class="fields">
        <div class="field">
          <label for="sf-name">{{ ru() ? 'Имя — required, minLength(2)' : 'Name — required, minLength(2)' }}</label>
          <input id="sf-name" [formField]="f.name" [placeholder]="ru() ? 'Твоё имя' : 'Your name'" />
          @if (f.name().touched() && f.name().errors().length) {
            <p class="err">{{ ru() ? 'Имя: обязательно, минимум 2 символа' : 'Name: required, at least 2 characters' }}</p>
          }
        </div>

        <div class="field">
          <label for="sf-email">{{ ru() ? 'Email — required, email()' : 'Email — required, email()' }}</label>
          <input id="sf-email" [formField]="f.email" placeholder="you@example.com" />
          @if (f.email().touched() && f.email().errors().length) {
            <p class="err">{{ ru() ? 'Email: обязательный и валидный' : 'Email: required and valid' }}</p>
          }
        </div>

        <button class="evo-btn primary" [disabled]="f().invalid() || done()" (click)="save()">
          {{ done() ? (ru() ? '✓ Отправлено' : '✓ Submitted') : (ru() ? 'Отправить' : 'Submit') }}
        </button>
      </div>

      <div class="live">
        <div class="demo-output">
          <div class="out-head">{{ ru() ? 'model() — единственный источник истины' : 'model() — the single source of truth' }}</div>
          <div class="line">{{ prettyModel() }}</div>
        </div>
        <div class="flags">
          <span class="flag" [class.on]="f().valid()">{{ ru() ? 'форма валидна' : 'form valid' }}: {{ f().valid() }}</span>
          <span class="flag" [class.on]="f.name().valid()">{{ ru() ? 'имя валидно' : 'name valid' }}: {{ f.name().valid() }}</span>
          <span class="flag" [class.on]="f.email().valid()">{{ ru() ? 'email валиден' : 'email valid' }}: {{ f.email().valid() }}</span>
        </div>
        @if (done()) {
          <p class="ok-badge">{{ ru() ? '🎉 submit() сработал — форма валидна.' : '🎉 submit() ran — form was valid.' }}</p>
        }
      </div>

      @if (ru()) {
        <p class="hint">
          Никаких <code>FormControl</code> / <code>FormGroup</code>. Ты владеешь <code>signal()</code>; схема
          навешивает валидаторы на пути полей, а <code>[formField]</code> привязывает инпуты. Всё состояние
          поля — сигналы.
        </p>
      } @else {
        <p class="hint">
          No <code>FormControl</code> / <code>FormGroup</code>. You own a <code>signal()</code>; the schema
          attaches validators to field paths, and <code>[formField]</code> binds inputs. All field state is
          signals.
        </p>
      }
    </div>
  `,
  styleUrl: './demo.scss',
  styles: [
    `
      .fields { display: flex; flex-direction: column; gap: 0.85rem; max-width: 420px; }
      .live { display: flex; flex-direction: column; gap: 0.7rem; }
      .flags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .flag {
        font-family: var(--evo-mono); font-size: 0.74rem; padding: 0.2rem 0.6rem;
        border-radius: 999px; border: 1px solid var(--evo-border);
        color: var(--mat-sys-error);
      }
      .flag.on { color: var(--evo-success);
        border-color: color-mix(in srgb, var(--evo-success) 50%, var(--evo-border)); }
    `,
  ],
})
export class SignalFormsDemo {
  private readonly i18n = inject(LanguageService);
  protected readonly ru = () => this.i18n.lang() === 'ru';
  protected readonly model = signal({ name: '', email: '' });
  protected readonly done = signal(false);

  protected readonly f = form(this.model, (path) => {
    required(path.name, { message: 'Name is required' });
    minLength(path.name, 2, { message: 'At least 2 characters' });
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Must be a valid email' });
  });

  protected prettyModel(): string {
    return JSON.stringify(this.model());
  }

  protected save(): void {
    submit(this.f, async () => {
      this.done.set(true);
      setTimeout(() => this.done.set(false), 2500);
      return undefined;
    });
  }
}
