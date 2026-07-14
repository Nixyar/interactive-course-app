import { Component, computed, inject, input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark, faLightbulb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Quiz as QuizModel } from '../../core/models/content.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-quiz',
  imports: [FontAwesomeModule],
  template: `
    <div class="quiz">
      <p class="q"><fa-icon [icon]="q" /> {{ i18n.pick(quiz().question) }}</p>
      <div class="options">
        @for (opt of quiz().options; track $index; let i = $index) {
          <button
            type="button"
            class="opt"
            [class.correct]="answered() && opt.correct"
            [class.wrong]="answered() && selected() === i && !opt.correct"
            [disabled]="answered()"
            (click)="pick(i)"
          >
            <span class="marker">
              @if (answered() && opt.correct) {
                <fa-icon [icon]="ok" />
              } @else if (answered() && selected() === i) {
                <fa-icon [icon]="no" />
              } @else {
                {{ letters[i] }}
              }
            </span>
            {{ i18n.pick(opt.text) }}
          </button>
        }
      </div>
      @if (answered()) {
        <p class="result" [class.win]="isCorrect()">
          {{ isCorrect() ? i18n.ui().correct : i18n.ui().notQuite }}
        </p>
        <p class="explain"><fa-icon [icon]="bulb" /> {{ i18n.pick(quiz().explanation) }}</p>
        <button type="button" class="retry" (click)="reset()">{{ i18n.ui().tryAgain }}</button>
      }
    </div>
  `,
  styleUrl: './quiz.scss',
})
export class Quiz {
  protected readonly i18n = inject(LanguageService);
  readonly quiz = input.required<QuizModel>();
  protected readonly letters = ['A', 'B', 'C', 'D'];

  protected readonly q = faQuestion;
  protected readonly ok = faCircleCheck;
  protected readonly no = faCircleXmark;
  protected readonly bulb = faLightbulb;

  protected readonly selected = signal<number | null>(null);
  protected readonly answered = computed(() => this.selected() !== null);
  protected readonly isCorrect = computed(() => {
    const i = this.selected();
    return i !== null && !!this.quiz().options[i]?.correct;
  });

  protected pick(i: number): void {
    if (this.selected() === null) this.selected.set(i);
  }
  protected reset(): void {
    this.selected.set(null);
  }
}
