import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Card } from '../src/index.js';

describe('Card', () => {
  it('renders a body for the default slot', () => {
    const w = mount(Card, { slots: { default: '<p>Hi</p>' } });
    expect(w.classes()).toEqual(['card']);
    expect(w.find('.card-body').html()).toContain('<p>Hi</p>');
    expect(w.find('.card-header').exists()).toBe(false);
    expect(w.find('.card-footer').exists()).toBe(false);
  });

  it('renders title, subtitle and description in the body', () => {
    const w = mount(Card, { props: { title: 'T', subTitle: 'S', description: 'D' } });
    expect(w.find('.card-body .card-title').text()).toBe('T');
    expect(w.find('.card-body .card-subtitle').text()).toBe('S');
    expect(w.find('.card-body .card-text').text()).toBe('D');
  });

  it('renders header, footer and image slots', () => {
    const w = mount(Card, { props: { headerClasses: 'h', bodyClasses: 'b' }, slots: {
      image: '<img class="card-img-top">', header: 'Head', default: 'Body', footer: 'Foot'
    } });
    expect(w.element.firstElementChild.className).toBe('card-img-top');
    expect(w.find('.card-header').classes()).toContain('h');
    expect(w.find('.card-header').text()).toBe('Head');
    expect(w.find('.card-body').classes()).toContain('b');
    expect(w.find('.card-footer').text()).toBe('Foot');
  });

  it('colours the card with `color`', () => {
    expect(mount(Card, { props: { color: 'info' } }).classes()).toContain('text-bg-info');
    expect(Card.props.color.validator('orange')).toBe(false);
  });
});
