<template>
  <div
    class="form-group"
    :class="[
      $attrs.class,
      { 'input-group': hasIcon },
      { 'has-danger': error },
      { 'input-group-focus': focused },
      { 'has-label': label || $slots.label }
    ]"
    :style="$attrs.style"
  >
    <slot name="label">
      <label v-if="label" class="control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div :class="[{ 'input-group': hasIcon }]">
      <slot name="addonLeft">
        <div v-if="addonLeftIcon" class="input-group-prepend">
          <i class="input-group-text" :class="addonLeftIcon"></i>
        </div>
      </slot>
      <slot>
        <input
          :value="modelValue"
          v-bind="inputAttrs"
          @input="updateValue"
          @focus="onFocus"
          @blur="onBlur"
          class="form-control"
          :class="[{ valid: modelValue && !error }, inputClasses]"
          aria-describedby="addon-right addon-left"
        />
      </slot>
      <slot name="addonRight">
        <span
          v-if="addonRightIcon"
          class="input-group-addon input-group-append"
        >
          <i class="input-group-text" :class="addonRightIcon"></i>
        </span>
      </slot>

      <slot name="infoBlock"></slot>
      <slot name="helpBlock">
        <div
          class="text-danger invalid-feedback"
          style="display: block;"
          :class="{ 'mt-2': hasIcon }"
          v-if="error"
        >
          {{ error }}
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'fg-input',
  props: {
    required: Boolean,
    label: String,
    error: String,
    labelClasses: String,
    inputClasses: String,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    addonRightIcon: String,
    addonLeftIcon: String
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  data() {
    return {
      focused: false
    };
  },
  computed: {
    // In Vue 3 $attrs includes class and style; keep those on the wrapper.
    inputAttrs() {
      // eslint-disable-next-line no-unused-vars
      const { class: _class, style, ...attrs } = this.$attrs;
      return attrs;
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    }
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value;
      this.$emit('update:modelValue', value);
    },
    onFocus(value) {
      this.focused = true;
      this.$emit('focus', value);
    },
    onBlur(value) {
      this.focused = false;
      this.$emit('blur', value);
    }
  }
};
</script>
<style></style>
