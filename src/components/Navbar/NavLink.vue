<template>
  <component
    :is="to ? 'router-link' : 'a'"
    :to="to"
    :class="closeDropDown ? 'dropdown-item' : 'nav-link'"
    @click="onClick"
  >
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

// Inside a DropDown it's a dropdown-item, otherwise a nav-link. Clicking it
// closes the dropdown and navbar menu it sits in, if any.
const closeNavbar = inject('closeNavbar', null);
const closeDropDown = inject('closeDropDown', null);

function onClick() {
  closeNavbar?.();
  closeDropDown?.();
}
</script>
