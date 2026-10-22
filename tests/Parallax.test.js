import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Parallax } from '../src/index.js';

// Under Vitest's jsdom environment, `this` in a window listener is jsdom's own
// window object rather than the global proxy, so set scrollY on both.
const innerWindow = () => {
  let inner;
  window.addEventListener('probe', function () { inner = this; }, { once: true });
  window.dispatchEvent(new Event('probe'));
  return inner;
};

const scrollTo = y => {
  for (const w of new Set([window, innerWindow()])) {
    Object.defineProperty(w, 'scrollY', { value: y, configurable: true });
  }
  window.dispatchEvent(new Event('scroll'));
};

describe('Parallax', () => {
  afterEach(() => vi.useRealTimers());

  it('renders its slot in a div', () => {
    const w = mount(Parallax, { slots: { default: '<span class="c">x</span>' } });
    expect(w.element.tagName).toBe('DIV');
    expect(w.find('.c').exists()).toBe(true);
  });

  it('moves at a third of the scroll speed', async () => {
    vi.useFakeTimers();
    const w = mount(Parallax, { attachTo: document.body });
    scrollTo(300);
    await vi.advanceTimersByTimeAsync(50);
    await nextTick();
    expect(w.element.style.transform).toBe('translate3d(0, 100px,0)');
    w.unmount();
  });

  it('is registered as parallax', () => {
    expect(Parallax.name).toBe('parallax');
  });
});
