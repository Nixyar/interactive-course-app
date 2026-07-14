import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightLong, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { BeforeAfter as BeforeAfterModel } from '../../core/models/content.model';
import { CodeBlock } from '../code-block/code-block';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-before-after',
  imports: [FontAwesomeModule, CodeBlock],
  template: `
    <div class="grid">
      <div class="col before">
        <div class="tag">{{ i18n.ui().before }}</div>
        <app-code-block [sample]="data().before" />
      </div>
      <div class="arrow" aria-hidden="true"><fa-icon [icon]="arrow" /></div>
      <div class="col after">
        <div class="tag good">{{ i18n.ui().after }}</div>
        <app-code-block [sample]="data().after" />
      </div>
    </div>
    @if (data().note; as note) {
      <p class="note"><fa-icon [icon]="bulb" /> {{ i18n.pick(note) }}</p>
    }
  `,
  styleUrl: './before-after.scss',
})
export class BeforeAfter {
  protected readonly i18n = inject(LanguageService);
  readonly data = input.required<BeforeAfterModel>();
  protected readonly arrow = faArrowRightLong;
  protected readonly bulb = faLightbulb;
}
