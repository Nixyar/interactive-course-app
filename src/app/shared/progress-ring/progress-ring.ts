import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.viewBox]="viewBox()">
      <circle
        [attr.cx]="c()" [attr.cy]="c()" [attr.r]="r()"
        fill="none" [attr.stroke-width]="stroke()"
        class="track"
      />
      <circle
        [attr.cx]="c()" [attr.cy]="c()" [attr.r]="r()"
        fill="none" [attr.stroke-width]="stroke()" stroke-linecap="round"
        class="value"
        [attr.stroke-dasharray]="circumference()"
        [attr.stroke-dashoffset]="offset()"
        [attr.transform]="'rotate(-90 ' + c() + ' ' + c() + ')'"
      />
      <text [attr.x]="c()" [attr.y]="c()" text-anchor="middle" dominant-baseline="central" class="lbl">
        {{ done() }}/{{ total() }}
      </text>
    </svg>
  `,
  styles: [
    `
      :host { display: inline-flex; line-height: 0; }
      .track { stroke: color-mix(in srgb, var(--mat-sys-on-surface) 14%, transparent); }
      .value { stroke: var(--mat-sys-primary); transition: stroke-dashoffset 0.5s ease; }
      .lbl { fill: var(--mat-sys-on-surface); font-size: 12px; font-weight: 700; font-family: var(--evo-mono); }
    `,
  ],
})
export class ProgressRing {
  readonly done = input(0);
  readonly total = input(0);
  readonly size = input(44);

  protected readonly stroke = computed(() => Math.max(3, this.size() * 0.1));
  protected readonly c = computed(() => this.size() / 2);
  protected readonly r = computed(() => this.c() - this.stroke());
  protected readonly circumference = computed(() => 2 * Math.PI * this.r());
  protected readonly viewBox = computed(() => `0 0 ${this.size()} ${this.size()}`);
  protected readonly offset = computed(() => {
    const t = this.total();
    const frac = t === 0 ? 0 : this.done() / t;
    return this.circumference() * (1 - frac);
  });
}
