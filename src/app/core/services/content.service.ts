import { Injectable } from '@angular/core';
import { Track, VersionInfo } from '../models/content.model';
import { ANGULAR_VERSIONS } from '../../data/angular.data';
import { TYPESCRIPT_VERSIONS } from '../../data/typescript.data';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly byTrack: Record<Track, VersionInfo[]> = {
    angular: ANGULAR_VERSIONS,
    typescript: TYPESCRIPT_VERSIONS,
  };

  versions(track: Track): VersionInfo[] {
    return this.byTrack[track];
  }

  version(track: Track, version: string): VersionInfo | undefined {
    return this.byTrack[track].find((v) => v.version === version);
  }

  /** All feature ids for a track — used for global progress totals. */
  allFeatureIds(track: Track): string[] {
    return this.byTrack[track].flatMap((v) => v.features.map((f) => f.id));
  }

  featureIds(version: VersionInfo): string[] {
    return version.features.map((f) => f.id);
  }
}
