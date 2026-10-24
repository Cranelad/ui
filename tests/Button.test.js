import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Button } from '../src/index.js';

describe('Button (n-button)', () => {
  it('renders a primary button', () => {
    const w = mount(Button, { slots: { default: 'Go' } });
    expect(w.element.tagName).toBe('BUTTON');
    expect(w.attributes('type')).toBe('button');
    expect(w.classes()).toEqual(['btn', 'btn-primary']);
    expect(w.text()).toBe('Go');
  });

  it('maps props to Bootstrap classes', () => {
    const w = mount(Button, { props: { type: 'danger', round: true, block: true, icon: true, size: 'lg' } });
    expect(w.classes()).toEqual(['btn', 'btn-danger', 'btn-lg', 'rounded-pill', 'w-100', 'btn-icon']);
  });

  it('outlines with `outline`, except link buttons', async () => {
    const w = mount(Button, { props: { type: 'info', outline: true } });
    expect(w.classes()).toContain('btn-outline-info');
    await w.setProps({ type: 'link' });
    expect(w.classes()).toContain('btn-link');
    expect(w.classes()).not.toContain('btn-outline-link');
  });

  it('supports another tag and native type', () => {
    const a = mount(Button, { props: { tag: 'a' } });
    expect(a.element.tagName).toBe('A');
    expect(a.attributes('type')).toBeUndefined();
    expect(mount(Button, { props: { nativeType: 'submit' } }).attributes('type')).toBe('submit');
  });

  it('shows a spinner and disables itself while loading', async () => {
    const w = mount(Button, { slots: { default: 'Save' } });
    expect(w.find('.spinner-border').exists()).toBe(false);
    expect(w.attributes('disabled')).toBeUndefined();
    await w.setProps({ loading: true });
    expect(w.find('.spinner-border').exists()).toBe(true);
    expect(w.attributes('disabled')).toBeDefined();
    expect(w.attributes('aria-busy')).toBe('true');
    expect(w.text()).toBe('Save');
  });

  it('emits click with the event', async () => {
    const w = mount(Button);
    await w.trigger('click');
    expect(w.emitted('click')[0][0]).toBeInstanceOf(Event);
  });

  it('rejects unknown types', () => {
    expect(Button.props.type.validator('neutral')).toBe(false);
    expect(Button.props.type.validator('success')).toBe(true);
    expect(Button.props.size.validator('xl')).toBe(false);
  });
});
