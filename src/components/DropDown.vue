<template>
  <component
    :is="tag"
    v-click-outside="close"
    class="dropdown"
    :class="{ show: isOpen, dropdown: direction === 'down', dropup: direction === 'up' }"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggle"
  >
    <slot name="title">
      <a class="dropdown-toggle nav-link" :class="{ 'no-caret': hideArrow }">
        <i :class="icon" />
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul class="dropdown-menu" :class="{ 'dropdown-menu-right': position === 'right', show: isOpen }">
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
  /** Icon classes shown before the title. */
  icon: { type: String, default: undefined },
  /** "right" aligns the menu to the right edge of the toggle. */
  position: { type: String, default: undefined, validator: value => ['left', 'right'].includes(value) },
  hideArrow: Boolean,
  /** Element to render; "li" fits inside a navbar's <ul>. */
  tag: { type: String, default: 'li' }
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
.dropdown {
  list-style-type: none;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
</style>
