import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Card } from '../src/index.js';

describe('Card', () => {
  it('renders a plain card with only a body', () => {
    const w = mount(Card, { slots: { default: 'Body' } });
    expect(w.classes()).toEqual(['card']);
    expect(w.attributes('data-background-color')).toBeUndefined();
    expect(w.find('.card-body').text()).toBe('Body');
    expect(w.find('.card-header').exists()).toBe(false);
    expect(w.find('.card-footer').exists()).toBe(false);
    expect(w.find('hr').exists()).toBe(false);
  });

  it('maps props to classes and background colour', () => {
    const w = mount(Card, { props: { plain: true, raised: true, type: 'login', color: 'orange' } });
    expect(w.classes()).toEqual(expect.arrayContaining(['card', 'card-plain', 'card-raised', 'card-login']));
    expect(w.attributes('data-background-color')).toBe('orange');
  });

  it('builds a header from title, subTitle and description', () => {
    const w = mount(Card, { props: { title: 'T', subTitle: 'S', description: 'D', headerClasses: 'hc' } });
    const header = w.find('.card-header');
    expect(header.classes()).toContain('hc');
    expect(header.find('h1.card-title').text()).toBe('T');
    expect(header.find('h3.card-category').text()).toBe('S');
    expect(header.find('p.card-description').text()).toBe('D');
  });

  it('uses the header slot instead', () => {
    const w = mount(Card, { props: { title: 'T' }, slots: { header: '<h4 class="mine">Mine</h4>' } });
    expect(w.find('.card-header .mine').exists()).toBe(true);
    expect(w.find('.card-header h1').exists()).toBe(false);
  });

  it('renders the category prop', () => {
    expect(mount(Card, { props: { category: 'Cat' } }).find('h6.card-category').text()).toBe('Cat');
  });

  it('renders image, avatar, info and raw-content slots', () => {
    const w = mount(Card, { slots: { image: '<img>', avatar: '<span class="a"></span>', info: 'i', 'raw-content': '<div class="raw"></div>' } });
    expect(w.find('.card-image img').exists()).toBe(true);
    expect(w.find('.card-avatar .a').exists()).toBe(true);
    expect(w.find('.info').text()).toBe('i');
    expect(w.find('.card > .raw').exists()).toBe(true);
  });

  it('renders a footer with a line, unless noFooterLine', () => {
    const w = mount(Card, { slots: { footer: 'F' } });
    expect(w.find('.card-footer').text()).toBe('F');
    expect(w.find('hr').exists()).toBe(true);
    expect(mount(Card, { props: { noFooterLine: true }, slots: { footer: 'F' } }).find('hr').exists()).toBe(false);
  });

  it('applies cardBodyClasses', () => {
    expect(mount(Card, { props: { cardBodyClasses: ['x', { y: true }] }, slots: { default: 'b' } }).find('.card-body').classes())
      .toEqual(expect.arrayContaining(['card-body', 'x', 'y']));
  });
});
