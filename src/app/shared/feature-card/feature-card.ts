import { Component, computed, inject, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faPlus, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Feature, FeatureLevel } from '../../core/models/content.model';
import { icon } from '../../core/icons';
import { ProgressService } from '../../core/services/progress.service';
import { LanguageService } from '../../core/services/language.service';
import { CodeBlock } from '../code-block/code-block';
import { BeforeAfter } from '../before-after/before-after';
import { Quiz } from '../quiz/quiz';
import { DemoHost } from '../demos/demo-host';

@Component({
  selector: 'app-feature-card',
  imports: [MatExpansionModule, FontAwesomeModule, CodeBlock, BeforeAfter, Quiz, DemoHost],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  private readonly progress = inject(ProgressService);
  protected readonly i18n = inject(LanguageService);
  readonly feature = input.required<Feature>();

  protected readonly check = faCheck;
  protected readonly plus = faPlus;
  protected readonly external = faArrowUpRightFromSquare;

  protected readonly faIcon = computed(() => icon(this.feature().icon));
  protected readonly learned = computed(() => this.progress.isLearned(this.feature().id));

  protected readonly levelLabel = computed(() => {
    const ui = this.i18n.ui();
    const map: Record<FeatureLevel, string> = {
      flagship: ui.levelFlagship,
      major: ui.levelMajor,
      minor: ui.levelMinor,
      breaking: ui.levelBreaking,
    };
    return map[this.feature().level];
  });

  protected toggleLearned(event: Event): void {
    event.stopPropagation();
    this.progress.toggle(this.feature().id);
  }
}
