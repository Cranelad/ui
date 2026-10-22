import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FormGroupInput } from '../src/index.js';

describe('FormGroupInput (fg-input)', () => {
  it('renders a form-group with an input', () => {
    const w = mount(FormGroupInput);
    expect(w.classes()).toEqual(['form-group']);
    const input = w.find('input.form-control');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('');
    expect(input.attributes('aria-describedby')).toBe('addon-right addon-left');
    expect(w.find('.input-group').exists()).toBe(false);
    expect(w.find('label').exists()).toBe(false);
  });

  it('supports v-model', async () => {
    const w = mount(FormGroupInput, { props: { modelValue: 'a', 'onUpdate:modelValue': v => w.setProps({ modelValue: v }) } });
    expect(w.find('input').element.value).toBe('a');
    await w.find('input').setValue('abc');
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['abc']);
    expect(w.props('modelValue')).toBe('abc');
  });

  it('marks a filled, error-free input as valid', () => {
    expect(mount(FormGroupInput, { props: { modelValue: 'x' } }).find('input').classes()).toContain('valid');
    expect(mount(FormGroupInput, { props: { modelValue: 'x', error: 'bad' } }).find('input').classes()).not.toContain('valid');
    expect(mount(FormGroupInput, { props: { modelValue: '' } }).find('input').classes()).not.toContain('valid');
  });

  it('accepts numbers', () => {
    expect(mount(FormGroupInput, { props: { modelValue: 5 } }).find('input').element.value).toBe('5');
  });

  it('tracks focus and emits focus/blur', async () => {
    const w = mount(FormGroupInput);
    await w.find('input').trigger('focus');
    expect(w.classes()).toContain('input-group-focus');
    expect(w.emitted('focus')).toHaveLength(1);
    await w.find('input').trigger('blur');
    expect(w.classes()).not.toContain('input-group-focus');
    expect(w.emitted('blur')).toHaveLength(1);
  });

  it('renders a label, with * when required', () => {
    const w = mount(FormGroupInput, { props: { label: 'Name', required: true, labelClasses: 'lc' } });
    const label = w.find('label.control-label');
    expect(label.classes()).toContain('lc');
    expect(label.text()).toBe('Name *');
    expect(w.classes()).toContain('has-label');
  });

  it('renders icon addons inside an input-group', () => {
    const w = mount(FormGroupInput, { props: { addonLeftIcon: 'icon-l', addonRightIcon: 'icon-r' } });
    expect(w.classes()).toContain('input-group');
    expect(w.find('.form-group > div.input-group').exists()).toBe(true);
    expect(w.find('.input-group-prepend > i.input-group-text.icon-l').exists()).toBe(true);
    expect(w.find('span.input-group-addon.input-group-append > i.input-group-text.icon-r').exists()).toBe(true);
  });

  it('treats addon slots as icons', () => {
    const w = mount(FormGroupInput, { slots: { addonLeft: '<span class="s">$</span>' } });
    expect(w.classes()).toContain('input-group');
    expect(w.find('.s').exists()).toBe(true);
    expect(w.find('.input-group-prepend').exists()).toBe(false);
  });

  it('shows an error', () => {
    const w = mount(FormGroupInput, { props: { error: 'Required' } });
    expect(w.classes()).toContain('has-danger');
    const err = w.find('.text-danger.invalid-feedback');
    expect(err.text()).toBe('Required');
    expect(err.attributes('style')).toContain('display: block');
    expect(err.classes()).not.toContain('mt-2');
    expect(mount(FormGroupInput, { props: { error: 'x', addonLeftIcon: 'i' } }).find('.invalid-feedback').classes()).toContain('mt-2');
  });

  it('puts class and style on the wrapper and other attributes on the input', () => {
    const w = mount(FormGroupInput, { attrs: { class: 'no-border', style: 'color: red;', type: 'email', placeholder: 'Email', name: 'email' } });
    expect(w.classes()).toContain('no-border');
    expect(w.attributes('style')).toContain('color: red');
    const input = w.find('input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('placeholder')).toBe('Email');
    expect(input.attributes('name')).toBe('email');
    expect(input.classes()).not.toContain('no-border');
  });

  it('applies inputClasses', () => {
    expect(mount(FormGroupInput, { props: { inputClasses: 'ic' } }).find('input').classes()).toContain('ic');
  });

  it('allows replacing the input, label and help blocks', () => {
    const w = mount(FormGroupInput, { props: { error: 'e' }, slots: { default: '<textarea class="t"></textarea>', label: '<span class="lbl"></span>', helpBlock: '<p class="help"></p>', infoBlock: '<p class="info"></p>' } });
    expect(w.find('textarea.t').exists()).toBe(true);
    expect(w.find('input').exists()).toBe(false);
    expect(w.find('.lbl').exists()).toBe(true);
    expect(w.find('.help').exists()).toBe(true);
    expect(w.find('.info').exists()).toBe(true);
    expect(w.find('.invalid-feedback').exists()).toBe(false);
  });

  it('is registered as fg-input', () => {
    expect(FormGroupInput.name).toBe('fg-input');
  });
});
