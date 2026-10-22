<template>
  <button
    type="button"
    class="navbar-toggler"
    :class="toggled ? 'toggled' : 'collapsed'"
    aria-controls="navigation"
    :aria-expanded="toggled"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-bar top-bar" />
    <span class="navbar-toggler-bar middle-bar" />
    <span class="navbar-toggler-bar bottom-bar" />
  </button>
</template>

<script setup>
defineOptions({ name: 'navbar-toggle-button' });

defineProps({
  /** Whether the menu it controls is open. */
  toggled: Boolean
});
</script>
