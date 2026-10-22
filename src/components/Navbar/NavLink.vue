<template>
  <component :is="to ? 'router-link' : 'a'" :to="to" class="dropdown-item" @click.stop="onClick">
    <slot />
  </component>
</template>

<script setup>
import { inject } from 'vue';

defineOptions({ name: 'nav-link' });

defineProps({
  /** Route location; renders a <router-link> when set, a plain <a> otherwise. */
  to: { type: [String, Object], default: undefined }
});

// Clicking a link closes the navbar menu and dropdown it sits in, if any.
const closeNavbar = inject('closeNavbar', null);
const closeDropDown = inject('closeDropDown', null);

function onClick() {
  closeNavbar?.();
  closeDropDown?.();
}
</script>
