import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Alert } from '../src/index.js';

describe('Alert', () => {
  it('renders a primary alert', () => {
    const w = mount(Alert, { slots: { default: 'Saved' } });
    expect(w.find('.alert').classes()).toEqual(['alert', 'alert-primary']);
    expect(w.find('.alert').attributes('role')).toBe('alert');
    expect(w.text()).toBe('Saved');
    expect(w.find('.btn-close').exists()).toBe(false);
  });

  it('dismisses itself', async () => {
    const w = mount(Alert, { props: { type: 'success', dismissible: true }, slots: { default: 'Saved' } });
    expect(w.find('.alert').classes()).toEqual(['alert', 'alert-success', 'alert-dismissible']);
    await w.find('.btn-close').trigger('click');
    expect(w.emitted('dismiss')).toHaveLength(1);
    expect(w.find('.alert').exists()).toBe(false);
  });

  it('accepts a custom dismiss control', async () => {
    const w = mount(Alert, { props: { dismissible: true }, slots: {
      'dismiss-icon': '<template #dismiss-icon="{ dismiss }"><a class="x" @click="dismiss">x</a></template>'
    } });
    await w.find('.x').trigger('click');
    expect(w.find('.alert').exists()).toBe(false);
  });

  it('rejects unknown types', () => {
    expect(Alert.props.type.validator('default')).toBe(false);
  });
});
