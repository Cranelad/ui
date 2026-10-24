<template>
  <div class="card" :class="color ? `text-bg-${color}` : null">
    <slot name="image" />

    <div v-if="$slots.header" class="card-header" :class="headerClasses">
      <slot name="header" />
    </div>

    <div v-if="$slots.default || title || subTitle || description" class="card-body" :class="bodyClasses">
      <h5 v-if="title" class="card-title">{{ title }}</h5>
      <h6 v-if="subTitle" class="card-subtitle mb-2 text-body-secondary">{{ subTitle }}</h6>
      <p v-if="description" class="card-text">{{ description }}</p>
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
</script>

<script setup>
defineOptions({ name: 'card' });

defineProps({
  title: { type: String, default: undefined },
  subTitle: { type: String, default: undefined },
  description: { type: String, default: undefined },
  /** Background colour with a readable text colour: text-bg-{color}. */
  color: { type: String, default: undefined, validator: value => COLORS.includes(value) },
  bodyClasses: { type: [String, Object, Array], default: undefined },
  headerClasses: { type: [String, Object, Array], default: undefined }
});
</script>
