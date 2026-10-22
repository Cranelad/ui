import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CraneladUi, { DropDown, NavLink } from '../src/index.js';

const global = { plugins: [CraneladUi] };

describe('DropDown', () => {
  it('renders a closed li dropdown with a toggle', () => {
    const w = mount(DropDown, { global, props: { title: 'Menu', icon: 'ic' }, slots: { default: '<a class="dropdown-item">One</a>' } });
    expect(w.element.tagName).toBe('LI');
    expect(w.classes()).toEqual(['dropdown']);
    expect(w.attributes('aria-haspopup')).toBe('true');
    expect(w.attributes('aria-expanded')).toBe('false');
    const toggle = w.find('a.dropdown-toggle.nav-link');
    expect(toggle.find('i.ic').exists()).toBe(true);
    expect(toggle.find('span.no-icon').text()).toBe('Menu');
    expect(w.find('ul.dropdown-menu').classes()).toEqual(['dropdown-menu']);
    expect(w.find('ul.dropdown-menu .dropdown-item').text()).toBe('One');
  });

  it('toggles open on click and emits change', async () => {
    const w = mount(DropDown, { global });
    await w.trigger('click');
    expect(w.classes()).toContain('show');
    expect(w.attributes('aria-expanded')).toBe('true');
    expect(w.find('.dropdown-menu').classes()).toContain('show');
    await w.trigger('click');
    expect(w.classes()).not.toContain('show');
    expect(w.emitted('change')).toEqual([[true], [false]]);
  });

  it('closes when clicking outside', async () => {
    const w = mount(DropDown, { global, attachTo: document.body });
    await w.trigger('click');
    document.body.click();
    await w.vm.$nextTick();
    expect(w.classes()).not.toContain('show');
    expect(w.emitted('change').at(-1)).toEqual([false]);
    w.unmount();
  });

  it('closes when a NavLink inside is clicked', async () => {
    const w = mount({
      components: { DropDown, NavLink },
      template: '<drop-down><nav-link class="x">Item</nav-link></drop-down>'
    }, { global });
    const dd = w.findComponent(DropDown);
    await dd.trigger('click');
    expect(dd.classes()).toContain('show');
    await w.find('.x').trigger('click');
    expect(dd.classes()).not.toContain('show');
  });

  it('supports position, direction, hideArrow, tag and a title slot', () => {
    const w = mount(DropDown, { global, props: { position: 'right', direction: 'up', hideArrow: true, tag: 'div' } });
    expect(w.element.tagName).toBe('DIV');
    expect(w.classes()).toContain('dropup');
    expect(w.classes()).not.toContain('dropdown-menu');
    expect(w.find('.dropdown-menu').classes()).toContain('dropdown-menu-right');
    expect(w.find('.dropdown-toggle').classes()).toContain('no-caret');
    const t = mount(DropDown, { global, slots: { title: '<button class="mine">T</button>' } });
    expect(t.find('.mine').exists()).toBe(true);
    expect(t.find('.dropdown-toggle').exists()).toBe(false);
  });

  it('is registered as drop-down', () => {
    expect(DropDown.name).toBe('drop-down');
  });
});
