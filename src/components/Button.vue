<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : undefined"
    class="btn"
    :class="classes"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-busy="loading || undefined"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const TYPES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'];
</script>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'n-button' });

const props = defineProps({
  /** Element to render, e.g. "a" for a link styled as a button. */
  tag: { type: String, default: 'button' },
  /** Colour: btn-{type}, or btn-outline-{type} with `outline`. */
  type: { type: String, default: 'primary', validator: value => TYPES.includes(value) },
  /** The button's type attribute (button, submit, reset). */
  nativeType: { type: String, default: 'button' },
  /** Outlined instead of filled. */
  outline: Boolean,
  /** Pill-shaped. */
  round: Boolean,
  /** Full width. */
  block: Boolean,
  /** A square (round with `round`) button holding just an icon. */
  icon: Boolean,
  /** btn-sm or btn-lg. */
  size: { type: String, default: undefined, validator: value => ['sm', 'lg'].includes(value) },
  disabled: Boolean,
  /** Show a spinner and disable the button, e.g. while a form is sending. */
  loading: Boolean
});

const emit = defineEmits(['click']);

const classes = computed(() => [
  props.outline && props.type !== 'link' ? `btn-outline-${props.type}` : `btn-${props.type}`,
  props.size ? `btn-${props.size}` : null,
  {
    'rounded-pill': props.round,
    'w-100': props.block,
    'btn-icon': props.icon
  }
]);
</script>
