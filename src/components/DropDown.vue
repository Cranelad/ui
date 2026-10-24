<template>
  <component
    :is="tag"
    v-click-outside="close"
    :class="direction === 'up' ? 'dropup' : 'dropdown'"
  >
    <slot name="title" :toggle="toggle" :is-open="isOpen">
      <button
        type="button"
        class="dropdown-toggle"
        :class="[toggleClasses, { show: isOpen, 'no-caret': hideArrow }]"
        :aria-expanded="isOpen"
        @click="toggle"
      >
        <i v-if="icon" :class="icon" aria-hidden="true" />
        {{ title }}
      </button>
    </slot>
    <ul class="dropdown-menu" :class="{ 'dropdown-menu-end': align === 'end', show: isOpen }">
      <slot />
    </ul>
  </component>
</template>

<script setup>
import { ref, provide } from 'vue';
import clickOutside from '../directives/click-outside.js';

defineOptions({ name: 'drop-down' });

defineProps({
  /** Open downwards or upwards. */
  direction: { type: String, default: 'down', validator: value => ['down', 'up'].includes(value) },
  title: { type: String, default: undefined },
  /** Icon classes shown before the title, e.g. "ti ti-user". */
  icon: { type: String, default: undefined },
  /** Align the menu with the start or end edge of the toggle. */
  align: { type: String, default: 'start', validator: value => ['start', 'end'].includes(value) },
  /** Classes for the default toggle, e.g. "btn btn-primary" or "nav-link". */
  toggleClasses: { type: [String, Object, Array], default: 'btn btn-primary' },
  hideArrow: Boolean,
  /** Element to render; "li" fits inside a navbar's <ul>. */
  tag: { type: String, default: 'div' }
});

const emit = defineEmits(['change']);

const vClickOutside = clickOutside;
const isOpen = ref(false);

function setOpen(value) {
  if (isOpen.value !== value) {
    isOpen.value = value;
    emit('change', value);
  }
}

function toggle() {
  setOpen(!isOpen.value);
}

function close() {
  setOpen(false);
}

// NavLinks inside the menu close it when clicked.
provide('closeDropDown', close);
</script>

<style>
.dropdown-toggle.no-caret::after {
  display: none;
}
</style>
