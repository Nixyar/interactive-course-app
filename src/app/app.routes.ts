import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'angular' },
  {
    path: 'angular',
    loadComponent: () => import('./features/track/track-page').then((m) => m.TrackPage),
    // route data binds to the `track` input via withComponentInputBinding()
    data: { track: 'angular' },
  },
  {
    path: 'typescript',
    loadComponent: () => import('./features/track/track-page').then((m) => m.TrackPage),
    data: { track: 'typescript' },
  },
  { path: '**', redirectTo: 'angular' },
];
