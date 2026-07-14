import { Loc } from '../services/language.service';

export type { Loc };

export type Track = 'angular' | 'typescript';

export type CodeLang = 'typescript' | 'html' | 'scss' | 'bash' | 'json';

export interface CodeSample {
  language: CodeLang;
  code: string;
  /** localized caption */
  label?: Loc;
}

export interface BeforeAfter {
  before: CodeSample;
  after: CodeSample;
  note?: Loc;
}

/** flagship = the marquee feature, major = notable, minor = quality-of-life, breaking = watch out */
export type FeatureLevel = 'flagship' | 'major' | 'minor' | 'breaking';

export interface QuizOption {
  text: Loc;
  correct: boolean;
}

export interface Quiz {
  question: Loc;
  options: QuizOption[];
  explanation: Loc;
}

export interface Feature {
  /** stable slug, unique across the whole app; used for progress tracking + anchors */
  id: string;
  title: Loc;
  /** key into the ICONS registry (core/icons.ts) */
  icon: string;
  level: FeatureLevel;
  /** short technical tags — not translated (e.g. #signals) */
  tags: string[];
  summary: Loc;
  /** longer explanation paragraphs / bullets */
  details?: Loc<string[]>;
  /** standalone annotated code examples (code is universal, only labels are localized) */
  code?: CodeSample[];
  /** side-by-side old vs new */
  beforeAfter?: BeforeAfter;
  /** key referencing a live interactive demo component (demos/demo-host.ts) */
  demo?: string;
  quiz?: Quiz;
  /** deep-link to official docs */
  docs?: string;
}

export interface VersionInfo {
  /** e.g. "17" or "5.5" */
  version: string;
  track: Track;
  codename?: Loc;
  released: string;
  headline: Loc;
  /** short bullets shown on the version header card */
  highlights: Loc<string[]>;
  features: Feature[];
}
