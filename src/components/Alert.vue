<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="alert"
      :class="[`alert-${type}`, { 'alert-dismissible': dismissible }]"
      role="alert"
    >
      <slot />
      <slot v-if="dismissible" name="dismiss-icon" :dismiss="dismiss">
        <button type="button" class="btn-close" aria-label="Close" @click="dismiss" />
      </slot>
    </div>
  </transition>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const TYPES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
</script>

<script setup>
import { ref } from 'vue';

defineOptions({ name: 'alert' });

defineProps({
  /** Colour: alert-{type}. */
  type: { type: String, default: 'primary', validator: value => TYPES.includes(value) },
  /** Show a close button; the alert hides itself when it is clicked. */
  dismissible: Boolean
});

const emit = defineEmits(['dismiss']);

const visible = ref(true);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>
