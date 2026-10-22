<template>
  <div
    class="form-group"
    :class="[
      attrs.class,
      {
        'input-group': hasIcon,
        'has-danger': error,
        'input-group-focus': focused,
        'has-label': label || $slots.label
      }
    ]"
    :style="attrs.style"
  >
    <slot name="label">
      <label v-if="label" class="control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div :class="{ 'input-group': hasIcon }">
      <slot name="addonLeft">
        <div v-if="addonLeftIcon" class="input-group-prepend">
          <i class="input-group-text" :class="addonLeftIcon" />
        </div>
      </slot>
      <slot>
        <input
          :value="modelValue"
          v-bind="inputAttrs"
          class="form-control"
          :class="[{ valid: modelValue && !error }, inputClasses]"
          aria-describedby="addon-right addon-left"
          @input="emit('update:modelValue', $event.target.value)"
          @focus="onFocus"
          @blur="onBlur"
        >
      </slot>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-addon input-group-append">
          <i class="input-group-text" :class="addonRightIcon" />
        </span>
      </slot>

      <slot name="infoBlock" />
      <slot name="helpBlock">
        <div
          v-if="error"
          class="text-danger invalid-feedback"
          style="display: block;"
          :class="{ 'mt-2': hasIcon }"
        >
          {{ error }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useAttrs, useSlots } from 'vue';

defineOptions({ name: 'fg-input', inheritAttrs: false });

const props = defineProps({
  required: Boolean,
  label: { type: String, default: undefined },
  /** Error message; also marks the field as invalid. */
  error: { type: String, default: undefined },
  labelClasses: { type: String, default: undefined },
  inputClasses: { type: String, default: undefined },
  modelValue: { type: [String, Number], default: '' },
  /** Icon classes for an addon after the input, e.g. "now-ui-icons ui-1_email-85". */
  addonRightIcon: { type: String, default: undefined },
  /** Icon classes for an addon before the input. */
  addonLeftIcon: { type: String, default: undefined }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const attrs = useAttrs();
const slots = useSlots();
const focused = ref(false);

// class and style style the wrapper; every other attribute (type, placeholder,
// listeners, ...) belongs on the input.
const inputAttrs = computed(() => {
  // eslint-disable-next-line no-unused-vars
  const { class: _class, style, ...rest } = attrs;
  return rest;
});

const hasIcon = computed(() =>
  slots.addonRight !== undefined ||
  slots.addonLeft !== undefined ||
  props.addonRightIcon !== undefined ||
  props.addonLeftIcon !== undefined
);

function onFocus(event) {
  focused.value = true;
  emit('focus', event);
}

function onBlur(event) {
  focused.value = false;
  emit('blur', event);
}
</script>
