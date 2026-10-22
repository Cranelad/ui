import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Button } from '../src/index.js';

describe('Button (n-button)', () => {
  it('renders a default button', () => {
    const w = mount(Button, { slots: { default: 'Go' } });
    expect(w.element.tagName).toBe('BUTTON');
    expect(w.attributes('type')).toBe('button');
    expect(w.classes()).toEqual(['btn', 'btn-default']);
    expect(w.text()).toBe('Go');
  });

  it('maps props to classes', () => {
    const w = mount(Button, {
      props: { type: 'primary', round: true, simple: true, block: true, social: true, link: true, icon: true, wide: true, size: 'lg' }
    });
    expect(w.classes()).toEqual(expect.arrayContaining([
      'btn', 'btn-primary', 'btn-round', 'btn-simple', 'btn-block', 'btn-social', 'btn-link', 'btn-icon', 'btn-wd', 'btn-lg'
    ]));
  });

  it('supports another tag and native type', () => {
    const w = mount(Button, { props: { tag: 'a', nativeType: 'submit' } });
    expect(w.element.tagName).toBe('A');
    expect(w.attributes('type')).toBe('submit');
  });

  it('emits click with the event', async () => {
    const w = mount(Button);
    await w.trigger('click');
    expect(w.emitted('click')).toHaveLength(1);
    expect(w.emitted('click')[0][0]).toBeInstanceOf(Event);
  });

  it('renders label slots', () => {
    const w = mount(Button, { slots: { label: 'L', labelRight: 'R', default: 'Text' } });
    expect(w.find('.btn-label:not(.btn-label-right)').text()).toBe('L');
    expect(w.find('.btn-label.btn-label-right').text()).toBe('R');
  });

  it('is registered as n-button', () => {
    expect(Button.name).toBe('n-button');
  });
});
