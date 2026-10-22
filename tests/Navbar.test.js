import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import CraneladUi, { Navbar, NavLink, NavbarToggleButton } from '../src/index.js';

const global = { plugins: [CraneladUi] };
const menu = { 'navbar-menu': '<li class="nav-item"><a class="nav-link">Link</a></li>' };

const setScroll = y => {
  Object.defineProperty(document.documentElement, 'scrollTop', { value: y, configurable: true });
  document.dispatchEvent(new Event('scroll'));
};

// Unmount every navbar after each test so scroll listeners don't leak between
// tests, and reset the scroll position without dispatching a scroll event.
enableAutoUnmount(afterEach);

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.classList.remove('nav-open');
  Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, configurable: true });
});

describe('NavbarToggleButton', () => {
  it('reflects the toggled state in its classes', async () => {
    const w = mount(NavbarToggleButton);
    expect(w.element.tagName).toBe('BUTTON');
    expect(w.classes()).toEqual(['navbar-toggler', 'collapsed']);
    expect(w.findAll('.navbar-toggler-bar')).toHaveLength(3);
    await w.setProps({ toggled: true });
    expect(w.classes()).toEqual(['navbar-toggler', 'toggled']);
  });
});

describe('NavLink', () => {
  it('renders an anchor without `to`', () => {
    const w = mount(NavLink, { slots: { default: 'Home' } });
    expect(w.element.tagName).toBe('A');
    expect(w.classes()).toContain('dropdown-item');
    expect(w.attributes('to')).toBeUndefined();
    expect(w.text()).toBe('Home');
  });

  it('renders a router-link with `to`', () => {
    const w = mount(NavLink, { props: { to: { name: 'home' } }, global: { stubs: { RouterLink: { props: ['to'], template: '<a class="rl"><slot /></a>' } } } });
    expect(w.find('a.rl').exists()).toBe(true);
  });

  it('closes the navbar and dropdown it is in, and stops the click', async () => {
    const closeNavbar = vi.fn(), closeDropDown = vi.fn(), parentClick = vi.fn();
    const w = mount({ components: { NavLink }, template: '<div @click="parentClick"><nav-link /></div>', methods: { parentClick } },
      { global: { provide: { closeNavbar, closeDropDown } } });
    await w.find('a').trigger('click');
    expect(closeNavbar).toHaveBeenCalledOnce();
    expect(closeDropDown).toHaveBeenCalledOnce();
    expect(parentClick).not.toHaveBeenCalled();
  });
});

describe('Navbar', () => {
  it('renders with default classes and slots', () => {
    const w = mount(Navbar, { global, slots: { default: '<a class="navbar-brand">B</a>', ...menu }, props: { menuClasses: 'ms-auto' } });
    expect(w.element.tagName).toBe('NAV');
    expect(w.classes()).toEqual(expect.arrayContaining(['navbar', 'bg-white', 'navbar-expand-lg', 'navbar-relative']));
    expect(w.find('.container-fluid > .navbar-translate > .navbar-brand').exists()).toBe(true);
    expect(w.find('.navbar-translate > button.navbar-toggler').exists()).toBe(true);
    const collapse = w.find('.navbar-collapse.collapse');
    expect(collapse.attributes('id')).toBe('navigation');
    expect(collapse.attributes('data-color')).toBe('orange');
    expect(collapse.find('ul.navbar-nav.ms-auto > li.nav-item').exists()).toBe(true);
  });

  it('omits the collapse without a navbar-menu slot', () => {
    expect(mount(Navbar, { global }).find('.navbar-collapse').exists()).toBe(false);
  });

  it('maps type, position, transparent and expand', () => {
    const w = mount(Navbar, { global, props: { type: 'primary', position: 'fixed', expand: 'md' } });
    expect(w.classes()).toEqual(expect.arrayContaining(['bg-primary', 'fixed-top', 'navbar-expand-md']));
    const t = mount(Navbar, { global, props: { transparent: true, expand: false } });
    expect(t.classes()).toContain('navbar-transparent');
    expect(t.classes()).not.toContain('bg-white');
    expect(t.classes().some(c => c.startsWith('navbar-expand'))).toBe(false);
  });

  it('opens and closes the menu with the toggle button', async () => {
    const w = mount(Navbar, { global, slots: menu, attachTo: document.body });
    await w.find('.navbar-toggler').trigger('click');
    expect(w.find('.navbar-collapse').classes()).toContain('show');
    expect(w.find('.navbar-toggler').classes()).toContain('toggled');
    expect(document.documentElement.classList.contains('nav-open')).toBe(true);
    await w.find('.navbar-toggler').trigger('click');
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
    expect(document.documentElement.classList.contains('nav-open')).toBe(false);
    expect(w.emitted('open')).toHaveLength(1);
    expect(w.emitted('close')).toHaveLength(1);
    w.unmount();
  });

  it('closes the menu on an outside click', async () => {
    const w = mount(Navbar, { global, slots: menu, attachTo: document.body });
    await w.find('.navbar-toggler').trigger('click');
    document.body.click();
    await w.vm.$nextTick();
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
    w.unmount();
  });

  it('closes the menu when a NavLink is clicked', async () => {
    const w = mount({ components: { Navbar, NavLink }, template: '<navbar><template #navbar-menu><nav-link class="x">X</nav-link></template></navbar>' }, { global });
    await w.find('.navbar-toggler').trigger('click');
    expect(w.find('.navbar-collapse').classes()).toContain('show');
    await w.find('.x').trigger('click');
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
  });

  it('exposes toggle/open/close/isToggled to its slots', async () => {
    const w = mount(Navbar, { global, slots: {
      default: `<template #default="{ open, isToggled }"><button class="o" @click="open">o</button><i class="state">{{ isToggled }}</i></template>`,
      'navbar-menu': `<template #navbar-menu="{ close }"><li><button class="c" @click="close">c</button></li></template>`
    } });
    await w.find('.o').trigger('click');
    expect(w.find('.state').text()).toBe('true');
    await w.find('.c').trigger('click');
    expect(w.find('.state').text()).toBe('false');
  });

  it('applies menuImage and navMenuClasses to the collapse', () => {
    const w = mount(Navbar, { global, slots: menu, props: { menuImage: '/m.png', navMenuClasses: 'nm' } });
    const collapse = w.find('.navbar-collapse');
    expect(collapse.classes()).toEqual(expect.arrayContaining(['has-image', 'nm']));
    // jsdom's CSS parser drops this background shorthand (browsers accept it),
    // so check the style Vue was asked to apply.
    expect(collapse.element.__vnode.props.style).toContain('url(/m.png)');
  });

  it('switches from transparent to its colour after scrolling past colorOnScroll', async () => {
    vi.useFakeTimers();
    const w = mount(Navbar, { global, props: { type: 'black', colorOnScroll: 100 }, attachTo: document.body });
    expect(w.classes()).toContain('navbar-transparent');
    expect(w.classes()).not.toContain('bg-black');
    setScroll(150);
    await vi.advanceTimersByTimeAsync(100);
    expect(w.classes()).not.toContain('navbar-transparent');
    expect(w.classes()).toContain('bg-black');
    setScroll(50);
    await vi.advanceTimersByTimeAsync(100);
    expect(w.classes()).toContain('navbar-transparent');
    expect(w.classes()).not.toContain('bg-black');
    w.unmount();
  });
});
