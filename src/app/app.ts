import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, faFlask } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faJs } from '@fortawesome/free-brands-svg-icons';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly theme = inject(ThemeService);
  protected readonly i18n = inject(LanguageService);

  protected readonly angular = faAngular;
  protected readonly js = faJs;
  protected readonly flask = faFlask;
  protected readonly moon = faMoon;
  protected readonly sun = faSun;

  protected readonly mode = this.theme.mode;
  protected readonly lang = this.i18n.lang;

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleLang(): void {
    this.i18n.toggle();
  }
}
