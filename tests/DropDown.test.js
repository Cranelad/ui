import { describe, it, expect, afterEach } from 'vitest';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { DropDown, NavLink } from '../src/index.js';

enableAutoUnmount(afterEach);

const items = '<li><nav-link>One</nav-link></li>';

describe('DropDown', () => {
  it('renders a closed dropdown with a button toggle', () => {
    const w = mount(DropDown, { props: { title: 'Menu', icon: 'ti ti-user' } });
    expect(w.element.tagName).toBe('DIV');
    expect(w.classes()).toEqual(['dropdown']);
    const toggle = w.find('button.dropdown-toggle');
    expect(toggle.classes()).toEqual(expect.arrayContaining(['btn', 'btn-primary']));
    expect(toggle.attributes('aria-expanded')).toBe('false');
    expect(toggle.text()).toBe('Menu');
    expect(toggle.find('i').classes()).toEqual(['ti', 'ti-user']);
    expect(w.find('.dropdown-menu').classes()).not.toContain('show');
  });

  it('opens and closes from the toggle, emitting change once each time', async () => {
    const w = mount(DropDown, { props: { title: 'Menu' } });
    await w.find('.dropdown-toggle').trigger('click');
    expect(w.find('.dropdown-menu').classes()).toContain('show');
    expect(w.find('.dropdown-toggle').attributes('aria-expanded')).toBe('true');
    await w.find('.dropdown-toggle').trigger('click');
    expect(w.find('.dropdown-menu').classes()).not.toContain('show');
    expect(w.emitted('change')).toEqual([[true], [false]]);
  });

  it('closes on a click outside, without emitting when already closed', async () => {
    const w = mount(DropDown, { attachTo: document.body });
    document.body.click();
    expect(w.emitted('change')).toBeUndefined();
    await w.find('.dropdown-toggle').trigger('click');
    document.body.click();
    await w.vm.$nextTick();
    expect(w.find('.dropdown-menu').classes()).not.toContain('show');
    expect(w.emitted('change')).toEqual([[true], [false]]);
  });

  it('closes when one of its links is clicked; links are dropdown items', async () => {
    const w = mount({ components: { DropDown, NavLink }, template: `<drop-down>${items}</drop-down>` });
    await w.find('.dropdown-toggle').trigger('click');
    const link = w.find('.dropdown-menu a');
    expect(link.classes()).toContain('dropdown-item');
    await link.trigger('click');
    expect(w.find('.dropdown-menu').classes()).not.toContain('show');
  });

  it('supports direction, alignment, toggle classes, no caret and tag', () => {
    const w = mount(DropDown, { props: { direction: 'up', align: 'end', toggleClasses: 'nav-link', hideArrow: true, tag: 'li' } });
    expect(w.element.tagName).toBe('LI');
    expect(w.classes()).toEqual(['dropup']);
    expect(w.find('.dropdown-menu').classes()).toContain('dropdown-menu-end');
    expect(w.find('.dropdown-toggle').classes()).toEqual(expect.arrayContaining(['nav-link', 'no-caret']));
    expect(w.find('.dropdown-toggle').classes()).not.toContain('btn');
  });

  it('accepts a custom toggle', async () => {
    const w = mount(DropDown, { slots: { title: '<template #title="{ toggle, isOpen }"><a class="t" @click="toggle">{{ isOpen }}</a></template>' } });
    expect(w.find('.t').text()).toBe('false');
    await w.find('.t').trigger('click');
    expect(w.find('.t').text()).toBe('true');
  });

  it('validates its props', () => {
    expect(DropDown.props.direction.validator('left')).toBe(false);
    expect(DropDown.props.align.validator('right')).toBe(false);
  });
});
