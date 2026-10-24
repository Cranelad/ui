<template>
  <button
    type="button"
    class="navbar-toggler"
    :class="{ collapsed: !toggled }"
    :aria-controls="controls"
    :aria-expanded="toggled"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon" />
  </button>
</template>

<script setup>
defineOptions({ name: 'navbar-toggle-button' });

defineProps({
  /** Whether the menu it controls is open. */
  toggled: Boolean,
  /** id of the menu it controls. */
  controls: { type: String, default: undefined }
});
</script>
