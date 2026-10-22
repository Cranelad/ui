import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Alert } from '../src/index.js';

describe('Alert', () => {
  it('renders content with the type class', () => {
    const w = mount(Alert, { props: { type: 'success' }, slots: { default: '<strong>Done</strong>' } });
    const el = w.find('.alert');
    expect(el.classes()).toEqual(['alert', 'alert-success']);
    expect(el.attributes('role')).toBe('alert');
    expect(el.find('strong').text()).toBe('Done');
    expect(el.find('.container').exists()).toBe(false);
    expect(el.find('.close').exists()).toBe(false);
  });

  it('defaults to alert-default', () => {
    expect(mount(Alert).find('.alert').classes()).toContain('alert-default');
  });

  it('dismissible alerts wrap content in a container with a close button', async () => {
    const w = mount(Alert, { props: { dismissible: true }, slots: { default: 'Hi' } });
    expect(w.find('.alert > .container').text()).toContain('Hi');
    const close = w.find('button.close');
    expect(close.attributes('aria-label')).toBe('Close');
    expect(close.find('i.now-ui-icons.ui-1_simple-remove').exists()).toBe(true);
    await close.trigger('click');
    expect(w.find('.alert').exists()).toBe(false);
    expect(w.emitted('dismiss')).toHaveLength(1);
  });

  it('passes dismiss to a custom dismiss-icon slot', async () => {
    const w = mount(Alert, { props: { dismissible: true }, slots: { 'dismiss-icon': '<template #dismiss-icon="{ dismiss }"><a class="x" @click="dismiss">x</a></template>' } });
    await w.find('a.x').trigger('click');
    expect(w.find('.alert').exists()).toBe(false);
  });

  it('validates type', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount(Alert, { props: { type: 'warning' } });
    expect(warn).not.toHaveBeenCalled();
    mount(Alert, { props: { type: 'purple' } });
    expect(warn.mock.calls[0][0]).toMatch(/custom validator check failed for prop "type"/);
    warn.mockRestore();
  });

  it('allows replacing the dismiss icon', () => {
    const w = mount(Alert, { props: { dismissible: true }, slots: { 'dismiss-icon': '<b class="x">x</b>' } });
    expect(w.find('b.x').exists()).toBe(true);
    expect(w.find('button.close').exists()).toBe(false);
  });
});
