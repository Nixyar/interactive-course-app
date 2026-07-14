import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FeatureLevel, Track } from '../../core/models/content.model';
import { icon } from '../../core/icons';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { LanguageService } from '../../core/services/language.service';
import { FeatureCard } from '../../shared/feature-card/feature-card';
import { ProgressRing } from '../../shared/progress-ring/progress-ring';

type LevelFilter = FeatureLevel | 'all';

@Component({
  selector: 'app-track-page',
  imports: [MatExpansionModule, FontAwesomeModule, FeatureCard, ProgressRing],
  templateUrl: './track-page.html',
  styleUrl: './track-page.scss',
})
export class TrackPage {
  private readonly content = inject(ContentService);
  private readonly progress = inject(ProgressService);
  protected readonly i18n = inject(LanguageService);

  /** Bound from route `data: { track }` via withComponentInputBinding(). */
  readonly track = input.required<Track>();

  protected readonly check = faCircleCheck;

  protected readonly filters = computed<{ key: LevelFilter; label: string }[]>(() => {
    const ui = this.i18n.ui();
    return [
      { key: 'all', label: ui.filterAll },
      { key: 'flagship', label: ui.filterFlagship },
      { key: 'major', label: ui.filterMajor },
      { key: 'minor', label: ui.filterMinor },
    ];
  });

  protected readonly versions = computed(() => this.content.versions(this.track()));

  /** Default to the newest version; resets when the track changes; user can override. */
  protected readonly selectedVersion = linkedSignal<string>(() => {
    const list = this.versions();
    return list[list.length - 1]?.version ?? '';
  });

  protected readonly level = signal<LevelFilter>('all');

  protected readonly current = computed(() =>
    this.versions().find((v) => v.version === this.selectedVersion()),
  );

  protected readonly visibleFeatures = computed(() => {
    const v = this.current();
    if (!v) return [];
    const lvl = this.level();
    return lvl === 'all' ? v.features : v.features.filter((f) => f.level === lvl);
  });

  /** Track-wide progress. */
  protected readonly totalCount = computed(() => this.content.allFeatureIds(this.track()).length);
  protected readonly doneCount = computed(() =>
    this.progress.completed(this.content.allFeatureIds(this.track())),
  );

  protected iconFor = icon;

  protected versionDone(version: { features: { id: string }[] }): number {
    return this.progress.completed(version.features.map((f) => f.id));
  }

  protected select(version: string): void {
    this.selectedVersion.set(version);
    this.level.set('all');
  }
}
