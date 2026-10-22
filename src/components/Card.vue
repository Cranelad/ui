<template>
  <div
    class="card"
    :class="{ 'card-plain': plain, 'card-raised': raised, [`card-${type}`]: type }"
    :data-background-color="color"
  >
    <h6 v-if="$slots.category || category" class="card-category">
      <slot name="category">{{ category }}</slot>
    </h6>

    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div v-if="$slots.avatar" class="card-avatar">
      <slot name="avatar" />
    </div>

    <div v-if="$slots.info" class="info">
      <slot name="info" />
    </div>

    <div v-if="$slots.header || title" class="card-header" :class="headerClasses">
      <slot name="header">
        <h1 v-if="title" class="card-title">{{ title }}</h1>
        <h3 v-if="subTitle" class="card-category">{{ subTitle }}</h3>
        <p v-if="description" class="card-description">{{ description }}</p>
      </slot>
    </div>

    <div v-if="$slots.default" class="card-body" :class="cardBodyClasses">
      <slot />
    </div>

    <slot name="raw-content" />

    <hr v-if="$slots.footer && !noFooterLine">
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'card' });

defineProps({
  /** Variant: card-{type}, e.g. "login". */
  type: { type: String, default: undefined },
  title: { type: String, default: undefined },
  subTitle: { type: String, default: undefined },
  category: { type: String, default: undefined },
  /** Theme background colour (data-background-color), e.g. "orange", "blue", "black". */
  color: { type: String, default: undefined },
  description: { type: String, default: undefined },
  noFooterLine: Boolean,
  plain: Boolean,
  raised: Boolean,
  cardBodyClasses: { type: [String, Object, Array], default: undefined },
  headerClasses: { type: [String, Object, Array], default: undefined }
});
</script>
