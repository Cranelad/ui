<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineOptions({ name: 'parallax' });

// Moves its content at a third of the page's scroll speed.
const style = ref({});
let frame = null;

function update() {
  frame = null;
  style.value = { transform: `translate3d(0, ${window.scrollY / 3}px,0)` };
}

function onScroll() {
  if (frame === null) {
    frame = requestAnimationFrame(update);
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  if (frame !== null) {
    cancelAnimationFrame(frame);
  }
});
</script>
