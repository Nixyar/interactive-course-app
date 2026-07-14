import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import { CodeLang } from './models/content.model';

let registered = false;
function ensure(): void {
  if (registered) return;
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('html', xml);
  hljs.registerLanguage('scss', scss);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('json', json);
  registered = true;
}

const HLJS_LANG: Record<CodeLang, string> = {
  typescript: 'typescript',
  html: 'html',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
};

export function highlight(code: string, language: CodeLang): string {
  ensure();
  try {
    return hljs.highlight(code, { language: HLJS_LANG[language] }).value;
  } catch {
    return escapeHtml(code);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);
}
