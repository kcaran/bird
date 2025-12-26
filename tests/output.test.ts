import { describe, expect, it } from 'vitest';
import { labelPrefix, resolveOutputConfigFromArgv, statusPrefix } from '../src/lib/output.js';

describe('output', () => {
  it('plain disables emoji + color', () => {
    const cfg = resolveOutputConfigFromArgv(['--plain'], {}, true);
    expect(cfg).toEqual({ plain: true, emoji: false, color: false });
    expect(statusPrefix('ok', cfg)).toBe('[ok] ');
    expect(labelPrefix('url', cfg)).toBe('url: ');
  });

  it('NO_COLOR disables colors by default', () => {
    const cfg = resolveOutputConfigFromArgv([], { NO_COLOR: '1' }, true);
    expect(cfg.color).toBe(false);
  });

  it('--no-emoji switches to text prefixes', () => {
    const cfg = resolveOutputConfigFromArgv(['--no-emoji'], {}, true);
    expect(cfg.emoji).toBe(false);
    expect(statusPrefix('warn', cfg)).toBe('Warning: ');
  });
});
