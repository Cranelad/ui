<template>
  <transition name="fade">
    <div v-if="visible" class="alert" :class="`alert-${type}`" role="alert">
      <slot v-if="!dismissible" />
      <div v-else class="container">
        <slot />
        <slot name="dismiss-icon" :dismiss="dismiss">
          <button type="button" class="close" aria-label="Close" @click="dismiss">
            <span aria-hidden="true">
              <i class="now-ui-icons ui-1_simple-remove" />
            </span>
          </button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const TYPES = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'];
</script>

<script setup>
import { ref } from 'vue';

defineOptions({ name: 'alert' });

defineProps({
  /** Colour: alert-{type}. */
  type: { type: String, default: 'default', validator: value => TYPES.includes(value) },
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
