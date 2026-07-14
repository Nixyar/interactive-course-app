import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../core/services/language.service';
import { SignalsDemo } from './signals-demo';
import { ControlFlowDemo } from './control-flow-demo';
import { DeferDemo } from './defer-demo';
import { SignalInputsDemo } from './signal-inputs-demo';
import { LinkedSignalDemo } from './linked-signal-demo';
import { ResourceDemo } from './resource-demo';
import { SignalFormsDemo } from './signal-forms-demo';

/** Renders the live playground matching a feature's `demo` key. */
@Component({
  selector: 'app-demo-host',
  imports: [
    FontAwesomeModule,
    SignalsDemo,
    ControlFlowDemo,
    DeferDemo,
    SignalInputsDemo,
    LinkedSignalDemo,
    ResourceDemo,
    SignalFormsDemo,
  ],
  template: `
    <div class="demo-shell">
      <div class="demo-banner">
        <fa-icon [icon]="flask" />
        <span>{{ i18n.ui().livePlayground }} {{ ngVersion }}.</span>
      </div>
      @switch (key()) {
        @case ('signals') { <app-signals-demo /> }
        @case ('control-flow') { <app-control-flow-demo /> }
        @case ('defer') { <app-defer-demo /> }
        @case ('signal-inputs') { <app-signal-inputs-demo /> }
        @case ('linked-signal') { <app-linked-signal-demo /> }
        @case ('resource') { <app-resource-demo /> }
        @case ('signal-forms') { <app-signal-forms-demo /> }
        @default {
          <p class="muted">{{ i18n.ui().comingSoon }}</p>
        }
      }
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .demo-shell {
        border: 1px solid color-mix(in srgb, var(--mat-sys-primary) 30%, var(--evo-border));
        border-radius: 16px;
        padding: 1rem 1.1rem 1.2rem;
        background:
          radial-gradient(120% 120% at 100% 0%,
            color-mix(in srgb, var(--mat-sys-primary) 8%, transparent), transparent 60%),
          var(--mat-sys-surface);
      }
      .demo-banner {
        display: flex; align-items: center; gap: 0.55rem; margin-bottom: 1rem;
        font-size: 0.78rem; font-weight: 600; color: var(--mat-sys-primary);
      }
      .muted { color: var(--mat-sys-on-surface-variant); }
    `,
  ],
})
export class DemoHost {
  protected readonly i18n = inject(LanguageService);
  readonly key = input.required<string>();
  protected readonly flask = faFlask;
  protected readonly ngVersion = '22';
}
