<template>
  <component
    :is="tag"
    :type="nativeType"
    class="btn"
    :class="classes"
    @click="emit('click', $event)"
  >
    <span v-if="$slots.label" class="btn-label">
      <slot name="label" />
    </span>
    <slot />
    <span v-if="$slots.labelRight" class="btn-label btn-label-right">
      <slot name="labelRight" />
    </span>
  </component>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const TYPES = [
  'default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'neutral', 'light', 'dark', 'link',
  'facebook', 'twitter', 'google', 'github', 'linkedin'
];
</script>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'n-button' });

const props = defineProps({
  /** Element to render, e.g. "a" for a link styled as a button. */
  tag: { type: String, default: 'button' },
  /** Colour: btn-{type}. */
  type: { type: String, default: 'default', validator: value => TYPES.includes(value) },
  /** The element's type attribute (button, submit, reset). */
  nativeType: { type: String, default: 'button' },
  round: Boolean,
  simple: Boolean,
  block: Boolean,
  social: Boolean,
  link: Boolean,
  icon: Boolean,
  wide: Boolean,
  /** btn-sm or btn-lg. */
  size: { type: String, default: undefined, validator: value => ['sm', 'lg'].includes(value) }
});

const emit = defineEmits(['click']);

const classes = computed(() => [
  {
    'btn-simple': props.simple,
    'btn-icon': props.icon,
    'btn-round': props.round,
    'btn-block': props.block,
    'btn-social': props.social,
    'btn-link': props.link,
    'btn-wd': props.wide
  },
  `btn-${props.type}`,
  props.size ? `btn-${props.size}` : null
]);
</script>
