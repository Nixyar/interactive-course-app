import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CodeSample } from '../../core/models/content.model';
import { highlight } from '../../core/highlight';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-code-block',
  imports: [FontAwesomeModule],
  template: `
    <div class="code-block">
      <div class="code-head">
        <span class="lang">{{ sample().language }}</span>
        @if (sample().label; as label) {
          <span class="label">{{ i18n.pick(label) }}</span>
        }
        <button type="button" class="copy" (click)="copy()" [attr.aria-label]="i18n.ui().copy">
          <fa-icon [icon]="copied() ? check : copy_" />
          {{ copied() ? i18n.ui().copied : i18n.ui().copy }}
        </button>
      </div>
      <pre><code [innerHTML]="html()"></code></pre>
    </div>
  `,
  styleUrl: './code-block.scss',
})
export class CodeBlock {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly i18n = inject(LanguageService);
  readonly sample = input.required<CodeSample>();

  protected readonly copy_ = faCopy;
  protected readonly check = faCheck;
  protected readonly copied = signal(false);

  protected readonly html = computed<SafeHtml>(() => {
    const s = this.sample();
    return this.sanitizer.bypassSecurityTrustHtml(highlight(s.code, s.language));
  });

  protected copy(): void {
    navigator.clipboard?.writeText(this.sample().code).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
