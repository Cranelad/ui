import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { FormGroupInput } from '../src/index.js';

describe('FormGroupInput (fg-input)', () => {
  it('renders a labelled input', () => {
    const w = mount(FormGroupInput, { props: { label: 'Email' } });
    const input = w.find('input');
    expect(w.classes()).toEqual(['mb-3']);
    expect(w.find('label').classes()).toContain('form-label');
    expect(w.find('label').attributes('for')).toBe(input.attributes('id'));
    expect(input.classes()).toContain('form-control');
    expect(w.find('.input-group').exists()).toBe(false);
  });

  it('marks required fields', () => {
    const w = mount(FormGroupInput, { props: { label: 'Name', required: true } });
    expect(w.find('label span').text()).toBe('*');
    expect(w.find('input').attributes('required')).toBeDefined();
  });

  it('puts class and style on the wrapper and other attributes on the input', () => {
    const w = mount(FormGroupInput, { attrs: { class: 'wide', style: 'color: red', type: 'email', placeholder: 'you@example.com', id: 'email' } });
    expect(w.classes()).toContain('wide');
    expect(w.attributes('style')).toContain('color: red');
    const input = w.find('input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('placeholder')).toBe('you@example.com');
    expect(input.attributes('id')).toBe('email');
    expect(input.classes()).not.toContain('wide');
  });

  it('supports v-model', async () => {
    const w = mount(FormGroupInput, { props: { modelValue: 'a' } });
    expect(w.find('input').element.value).toBe('a');
    await w.find('input').setValue('ab');
    expect(w.emitted('update:modelValue')[0]).toEqual(['ab']);
  });

  it('shows an error and marks the input invalid', () => {
    const w = mount(FormGroupInput, { props: { error: 'Required' } });
    const input = w.find('input');
    const feedback = w.find('.invalid-feedback');
    expect(input.classes()).toContain('is-invalid');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(feedback.text()).toBe('Required');
    expect(input.attributes('aria-describedby')).toBe(feedback.attributes('id'));
  });

  it('wraps icon addons in an input group', () => {
    const w = mount(FormGroupInput, { props: { addonLeftIcon: 'ti ti-mail', addonRightIcon: 'ti ti-check' } });
    expect(w.find('.input-group').exists()).toBe(true);
    const addons = w.findAll('.input-group-text i');
    expect(addons.map(a => a.classes().join(' '))).toEqual(['ti ti-mail', 'ti ti-check']);
  });

  it('accepts addon and input slots', () => {
    const w = mount(FormGroupInput, { slots: { addonLeft: '<span class="input-group-text">@</span>', default: '<select class="form-select" />' } });
    expect(w.find('.input-group').exists()).toBe(true);
    expect(w.find('select').exists()).toBe(true);
    expect(w.find('input').exists()).toBe(false);
  });

  it('emits focus and blur', async () => {
    const onFocus = vi.fn();
    const w = mount(FormGroupInput, { attrs: { onFocus } });
    await w.find('input').trigger('focus');
    await w.find('input').trigger('blur');
    expect(w.emitted('focus')).toHaveLength(1);
    expect(w.emitted('blur')).toHaveLength(1);
  });

  it('gives each input its own id', () => {
    const w = mount({ components: { 'fg-input': FormGroupInput }, template: '<div><fg-input label="A" /><fg-input label="B" /></div>' });
    const ids = w.findAll('input').map(i => i.attributes('id'));
    expect(new Set(ids).size).toBe(2);
  });
});
