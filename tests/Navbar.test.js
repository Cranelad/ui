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
  Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, configurable: true });
});

describe('NavbarToggleButton', () => {
  it('reflects the toggled state', async () => {
    const w = mount(NavbarToggleButton, { props: { controls: 'menu' } });
    expect(w.element.tagName).toBe('BUTTON');
    expect(w.classes()).toEqual(['navbar-toggler', 'collapsed']);
    expect(w.find('.navbar-toggler-icon').exists()).toBe(true);
    expect(w.attributes('aria-expanded')).toBe('false');
    expect(w.attributes('aria-controls')).toBe('menu');
    await w.setProps({ toggled: true });
    expect(w.classes()).toEqual(['navbar-toggler']);
    expect(w.attributes('aria-expanded')).toBe('true');
  });
});

describe('NavLink', () => {
  it('renders a nav-link anchor without `to`', () => {
    const w = mount(NavLink, { slots: { default: 'Home' } });
    expect(w.element.tagName).toBe('A');
    expect(w.classes()).toEqual(['nav-link']);
    expect(w.attributes('to')).toBeUndefined();
    expect(w.text()).toBe('Home');
  });

  it('renders a router-link with `to`', () => {
    const w = mount(NavLink, { props: { to: { name: 'home' } }, global: { stubs: { RouterLink: { props: ['to'], template: '<a class="rl"><slot /></a>' } } } });
    expect(w.find('a.rl').exists()).toBe(true);
  });

  it('closes the navbar and dropdown it is in', async () => {
    const closeNavbar = vi.fn(), closeDropDown = vi.fn();
    const w = mount(NavLink, { global: { provide: { closeNavbar, closeDropDown } } });
    expect(w.classes()).toEqual(['dropdown-item']);
    await w.trigger('click');
    expect(closeNavbar).toHaveBeenCalledOnce();
    expect(closeDropDown).toHaveBeenCalledOnce();
  });
});

describe('Navbar', () => {
  it('renders with default classes', () => {
    const w = mount(Navbar, { global, slots: { default: '<a class="navbar-brand">Brand</a>', ...menu } });
    expect(w.classes()).toEqual(['navbar', 'bg-body', 'navbar-expand-lg']);
    expect(w.attributes('data-bs-theme')).toBeUndefined();
    expect(w.find('.container').exists()).toBe(true);
    expect(w.find('.navbar-brand').text()).toBe('Brand');
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
  });

  it('maps props to classes', () => {
    const w = mount(Navbar, { global, props: { type: 'dark', dark: true, position: 'fixed-top', expand: 'md', fluid: true, menuClasses: 'ms-auto', navMenuClasses: 'nm' }, slots: menu });
    expect(w.classes()).toEqual(['navbar', 'bg-dark', 'navbar-expand-md', 'fixed-top']);
    expect(w.attributes('data-bs-theme')).toBe('dark');
    expect(w.find('.container-fluid').exists()).toBe(true);
    expect(w.find('.navbar-nav').classes()).toContain('ms-auto');
    expect(w.find('.navbar-collapse').classes()).toContain('nm');
  });

  it('never expands with expand=false, and is transparent with `transparent`', () => {
    const w = mount(Navbar, { global, props: { expand: false, transparent: true } });
    expect(w.classes()).toEqual(['navbar', 'bg-transparent']);
  });

  it('has no toggler or menu without a navbar-menu slot', () => {
    const w = mount(Navbar, { global });
    expect(w.find('.navbar-toggler').exists()).toBe(false);
    expect(w.find('.navbar-collapse').exists()).toBe(false);
  });

  it('toggles the menu and links the toggler to it', async () => {
    const w = mount(Navbar, { global, slots: menu });
    const toggler = w.find('.navbar-toggler');
    expect(toggler.attributes('aria-controls')).toBe(w.find('.navbar-collapse').attributes('id'));
    await toggler.trigger('click');
    expect(w.find('.navbar-collapse').classes()).toContain('show');
    expect(w.emitted('open')).toHaveLength(1);
    await toggler.trigger('click');
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
    expect(w.emitted('close')).toHaveLength(1);
  });

  it('keeps several navbars independent', async () => {
    const w = mount({ components: { Navbar }, template: `<div><navbar><template #navbar-menu><li /></template></navbar><navbar><template #navbar-menu><li /></template></navbar></div>` }, { global });
    const [a, b] = w.findAll('nav');
    expect(a.find('.navbar-collapse').attributes('id')).not.toBe(b.find('.navbar-collapse').attributes('id'));
    await a.find('.navbar-toggler').trigger('click');
    expect(a.find('.navbar-collapse').classes()).toContain('show');
    expect(b.find('.navbar-collapse').classes()).not.toContain('show');
  });

  it('closes the menu when a NavLink in it is clicked', async () => {
    const w = mount(Navbar, { global: { ...global, components: { NavLink } }, slots: { 'navbar-menu': '<li class="nav-item"><nav-link>Go</nav-link></li>' } });
    await w.find('.navbar-toggler').trigger('click');
    await w.find('.navbar-nav a').trigger('click');
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
  });

  it('closes the menu on a click outside it', async () => {
    const w = mount(Navbar, { global, slots: menu, attachTo: document.body });
    await w.find('.navbar-toggler').trigger('click');
    document.body.click();
    await w.vm.$nextTick();
    expect(w.find('.navbar-collapse').classes()).not.toContain('show');
  });

  it('passes toggle, open, close and isToggled to its slots', async () => {
    const w = mount(Navbar, { global, slots: {
      default: '<template #default="{ open, isToggled }"><a class="o" @click="open">{{ isToggled }}</a></template>',
      ...menu
    } });
    expect(w.find('.o').text()).toBe('false');
    await w.find('.o').trigger('click');
    expect(w.find('.o').text()).toBe('true');
  });

  it('is transparent until scrolled past colorOnScroll', async () => {
    vi.useFakeTimers();
    const w = mount(Navbar, { global, props: { type: 'primary', colorOnScroll: 100 } });
    expect(w.classes()).toContain('bg-transparent');
    setScroll(150);
    vi.advanceTimersByTime(70);
    await w.vm.$nextTick();
    expect(w.classes()).toContain('bg-primary');
    expect(w.classes()).not.toContain('bg-transparent');
    setScroll(50);
    vi.advanceTimersByTime(70);
    await w.vm.$nextTick();
    expect(w.classes()).toContain('bg-transparent');
  });

  it('starts coloured when the page is already scrolled', async () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, configurable: true });
    const w = mount(Navbar, { global, props: { type: 'dark', colorOnScroll: 100 } });
    await w.vm.$nextTick();
    expect(w.classes()).toContain('bg-dark');
  });

  it('checks the scroll position at most every 66 ms', async () => {
    vi.useFakeTimers();
    const w = mount(Navbar, { global, props: { colorOnScroll: 100 } });
    setScroll(150);
    setScroll(160);
    vi.advanceTimersByTime(30);
    await w.vm.$nextTick();
    expect(w.classes()).toContain('bg-transparent');
    vi.advanceTimersByTime(40);
    await w.vm.$nextTick();
    expect(w.classes()).toContain('bg-body');
  });

  it('removes its scroll listener when unmounted', () => {
    const spy = vi.spyOn(document, 'removeEventListener');
    const w = mount(Navbar, { global, props: { colorOnScroll: 100 } });
    w.unmount();
    expect(spy).toHaveBeenCalledWith('scroll', expect.any(Function));
    spy.mockRestore();
  });

  it('validates its props', () => {
    expect(Navbar.props.type.validator('orange')).toBe(false);
    expect(Navbar.props.position.validator('fixed')).toBe(false);
  });
});
