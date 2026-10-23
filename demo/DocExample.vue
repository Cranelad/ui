<template>
  <section :id="id" class="doc-example">
    <h3 class="title">{{ title }}</h3>
    <p v-if="$slots.description" class="description"><slot name="description" /></p>
    <div class="doc-live">
      <slot />
    </div>
    <pre class="doc-code"><code>{{ code.trim() }}</code></pre>
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  /** The source shown under the live example. */
  code: { type: String, required: true }
});
</script>
