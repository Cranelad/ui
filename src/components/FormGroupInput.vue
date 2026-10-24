<template>
  <div class="mb-3" :class="attrs.class" :style="attrs.style">
    <slot name="label">
      <label v-if="label" class="form-label" :class="labelClasses" :for="inputId">
        {{ label }}
        <span v-if="required" aria-hidden="true">*</span>
      </label>
    </slot>

    <div :class="{ 'input-group': hasAddon, 'has-validation': hasAddon && error }">
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-group-text">
          <i :class="addonLeftIcon" aria-hidden="true" />
        </span>
      </slot>
      <slot>
        <input
          :id="inputId"
          :value="modelValue"
          v-bind="inputAttrs"
          class="form-control"
          :class="[{ 'is-invalid': error }, inputClasses]"
          :required="required || undefined"
          :aria-invalid="error ? 'true' : undefined"
          :aria-describedby="error ? errorId : undefined"
          @input="emit('update:modelValue', $event.target.value)"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        >
      </slot>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-text">
          <i :class="addonRightIcon" aria-hidden="true" />
        </span>
      </slot>

      <slot name="helpBlock">
        <div v-if="error" :id="errorId" class="invalid-feedback d-block">
          {{ error }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useAttrs, useId, useSlots } from 'vue';

defineOptions({ name: 'fg-input', inheritAttrs: false });

const props = defineProps({
  required: Boolean,
  label: { type: String, default: undefined },
  /** Error message; also marks the field as invalid. */
  error: { type: String, default: undefined },
  labelClasses: { type: String, default: undefined },
  inputClasses: { type: String, default: undefined },
  modelValue: { type: [String, Number], default: '' },
  /** Icon classes for an addon after the input, e.g. "ti ti-mail". */
  addonRightIcon: { type: String, default: undefined },
  /** Icon classes for an addon before the input. */
  addonLeftIcon: { type: String, default: undefined }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const attrs = useAttrs();
const slots = useSlots();
const generatedId = useId();

// class and style style the wrapper; every other attribute (type, placeholder,
// id, listeners, ...) belongs on the input.
const inputAttrs = computed(() => {
  // eslint-disable-next-line no-unused-vars
  const { class: _class, style, ...rest } = attrs;
  return rest;
});

const inputId = computed(() => attrs.id || generatedId);
const errorId = computed(() => `${inputId.value}-error`);

const hasAddon = computed(() =>
  slots.addonRight !== undefined ||
  slots.addonLeft !== undefined ||
  props.addonRightIcon !== undefined ||
  props.addonLeftIcon !== undefined
);
</script>
