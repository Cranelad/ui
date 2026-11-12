// @vitest-environment node
import { describe, it, expect } from 'vitest';
import * as sass from 'sass';
import { fileURLToPath } from 'node:url';

const scss = fileURLToPath(new URL('../src/scss', import.meta.url));
const nodeModules = fileURLToPath(new URL('../node_modules', import.meta.url));

// Compiles a project stylesheet that imports the kit.
function compile(source) {
  return sass.compileString(source, {
    loadPaths: [scss, nodeModules],
    quietDeps: true,
    logger: sass.Logger.silent,
  }).css;
}

// The last value a top-level `selector {}` rule gives `property`, as the
// cascade would, e.g. rule(css, '.site-header', 'background-color').
function rule(css, selector, property) {
  const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blocks = [...css.matchAll(new RegExp(`(?:^|\\n)${escape(selector)} \\{([^}]*)\\}`, 'g'))];
  const values = blocks.flatMap(b => [...b[1].matchAll(new RegExp(`(?:^|[\\s;])${escape(property)}: ([^;]+);`, 'g'))].map(m => m[1]));
  return values.at(-1);
}

describe('theming', () => {
  const themed = compile(`
    $primary: #2c457d;
    $body-bg: #f8f9fe;
    $body-color: #2c2c2c;
    $site-header-bg: $primary;
    $site-header-link-color: #fff;
    $card-box-shadow: 0 5px 25px rgba(0, 0, 0, .2);
    @import 'element-plus';
  `);

  it('keeps the Cranelad look by default', () => {
    const css = compile(`@import 'element-plus';`);
    expect(css).toContain('--bs-primary: #2196f3;');
    expect(css).toContain('--bs-body-bg: #000;');
    expect(rule(css, '.site-header', 'background-color')).toBe('#000');
    expect(rule(css, '.card', 'box-shadow')).toBeUndefined();
    expect(css).toContain('--el-color-primary: #2196f3;');
  });

  it('takes a project\'s colours set before the import', () => {
    expect(themed).toContain('--bs-primary: #2c457d;');
    expect(themed).toContain('--bs-body-bg: #f8f9fe;');
    expect(themed).toContain('--bs-body-color: #2c2c2c;');
    expect(themed).not.toContain('#2196f3');
  });

  it('derives the other tokens from the project\'s colours', () => {
    expect(themed).toContain('--bs-link-color: #2c457d;');               // $link-color: $primary
    expect(rule(themed, '.site-footer', 'color')).toBe('#2c457d');      // $site-footer-color
    expect(rule(themed, '.section-title', 'color')).toBe('#2c457d');    // $section-title-color
    expect(themed).toContain('--el-color-primary: #2c457d;');
  });

  it('themes the site header and cards', () => {
    expect(rule(themed, '.site-header', 'background-color')).toBe('#2c457d');
    expect(themed).toMatch(/--bs-navbar-color: #fff;/);
    expect(rule(themed, '.card', 'box-shadow')).toBe('var(--bs-card-box-shadow)');
    expect(themed).toContain('--bs-card-box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);');
  });

  it('derives primary buttons from the project\'s $primary', () => {
    expect(rule(themed, '.btn-primary', '--bs-btn-bg')).toBe('#2c457d');
    // 15% darker, as Sass writes it
    const darker = compile(`a { b: mix(#000, #2c457d, 15%); }`).match(/b: ([^;]+);/)[1];
    expect(rule(themed, '.btn-primary', '--bs-btn-hover-bg')).toBe(darker);
    const own = compile(`$primary: #2c457d; $btn-primary-hover-bg: #345194; @import 'index';`);
    expect(rule(own, '.btn-primary', '--bs-btn-hover-bg')).toBe('#345194');
  });

  it('keeps the deeper blue buttons for Cranelad\'s blue', () => {
    const css = compile(`@import 'index';`);
    expect(rule(css, '.btn-primary', '--bs-btn-bg')).toBe('#1976d2');
    expect(rule(css, '.btn-primary', '--bs-btn-hover-bg')).toBe('#1565c0');
  });

  it('can leave Element Plus its own colours', () => {
    const css = compile(`$primary: #2c457d; $element-plus-colors: false; @import 'element-plus';`);
    expect(css).not.toContain('--el-color-primary:');
    expect(css).not.toContain('--el-text-color-primary:');
    expect(css).toContain('--el-font-family:');
  });

  it('works with @use ... with ()', () => {
    const css = compile(`@use 'index' with ($primary: #2c457d, $body-bg: #f8f9fe);`);
    expect(css).toContain('--bs-primary: #2c457d;');
    expect(css).toContain('--bs-body-bg: #f8f9fe;');
  });
});
