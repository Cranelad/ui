<template>
  <nav class="navbar" :class="classes" :data-bs-theme="dark ? 'dark' : undefined">
    <div :class="fluid ? 'container-fluid' : 'container'">
      <slot v-bind="slotData" />
      <NavbarToggleButton
        v-if="$slots['navbar-menu']"
        :toggled="showMenu"
        :controls="menuId"
        @click.stop="toggle"
      />
      <div
        v-if="$slots['navbar-menu']"
        :id="menuId"
        v-click-outside="close"
        class="navbar-collapse collapse"
        :class="[{ show: showMenu }, navMenuClasses]"
      >
        <slot name="before-menu" />
        <ul class="navbar-nav" :class="menuClasses">
          <slot name="navbar-menu" v-bind="slotData" />
        </ul>
        <slot name="after-menu" />
      </div>
    </div>
  </nav>
</template>

<script>
// Module scope, so defineProps (which is hoisted out of setup) can use it.
const TYPES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'body', 'black', 'white'];
const POSITIONS = ['static', 'fixed-top', 'fixed-bottom', 'sticky-top'];
</script>

<script setup>
import { ref, computed, provide, useId, onMounted, onBeforeUnmount } from 'vue';
import NavbarToggleButton from './NavbarToggleButton.vue';
import clickOutside from '../../directives/click-outside.js';

defineOptions({ name: 'navbar' });

const props = defineProps({
  /** Background colour: bg-{type}. */
  type: { type: String, default: 'body', validator: value => TYPES.includes(value) },
  /** Light text and toggler, for dark backgrounds (data-bs-theme="dark"). */
  dark: Boolean,
  /** No background at all. */
  transparent: Boolean,
  /** Stay transparent until the page is scrolled this many pixels, then take the colour of `type`. */
  colorOnScroll: { type: Number, default: 0 },
  /** Where it sits: static, fixed-top, fixed-bottom or sticky-top. */
  position: { type: String, default: 'static', validator: value => POSITIONS.includes(value) },
  /** Breakpoint from which the menu is expanded (navbar-expand-{expand}); false never expands. */
  expand: { type: [String, Boolean], default: 'lg' },
  /** Full-width container instead of the centred one. */
  fluid: Boolean,
  /** Classes for the menu's <ul class="navbar-nav">, e.g. "ms-auto". */
  menuClasses: { type: [String, Object, Array], default: undefined },
  /** Classes for the collapsing menu container. */
  navMenuClasses: { type: [String, Object, Array], default: undefined }
});

const emit = defineEmits(['open', 'close']);

const vClickOutside = clickOutside;
const menuId = useId();
const showMenu = ref(false);
const scrolled = ref(0);

const classes = computed(() => {
  const transparent = props.transparent || (props.colorOnScroll > 0 && scrolled.value <= props.colorOnScroll);
  return [
    transparent ? 'bg-transparent' : `bg-${props.type}`,
    props.expand ? `navbar-expand-${props.expand}` : null,
    props.position === 'static' ? null : props.position
  ];
});

function setMenu(value) {
  if (showMenu.value !== value) {
    showMenu.value = value;
    emit(value ? 'open' : 'close');
  }
}

function toggle() {
  setMenu(!showMenu.value);
}

function open() {
  setMenu(true);
}

function close() {
  setMenu(false);
}

const slotData = computed(() => ({ toggle, open, close, isToggled: showMenu.value }));

// NavLinks inside the menu close it when clicked.
provide('closeNavbar', close);

function handleScroll() {
  scrolled.value = document.body.scrollTop || document.documentElement.scrollTop;
}

// Check the scroll position at most every 66 ms (about 15 times a second).
let scrollTimeout = null;
function onScroll() {
  if (scrollTimeout === null) {
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      handleScroll();
    }, 66);
  }
}

onMounted(() => {
  if (props.colorOnScroll > 0) {
    handleScroll();
    document.addEventListener('scroll', onScroll, { passive: true });
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll);
  clearTimeout(scrollTimeout);
});
</script>
