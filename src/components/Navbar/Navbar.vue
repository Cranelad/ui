<template>
  <nav class="navbar" :class="classes">
    <div class="container-fluid">
      <div class="navbar-translate">
        <slot v-bind="slotData" />
        <NavbarToggleButton :toggled="showMenu" @click.stop="toggle" />
      </div>
      <div
        v-if="$slots['navbar-menu']"
        id="navigation"
        v-click-outside="close"
        class="navbar-collapse collapse"
        :class="[{ show: showMenu, 'has-image': menuImage }, navMenuClasses]"
        :style="menuImage ? `background: url(${menuImage}) 0% 0% / cover;` : ''"
        data-color="orange"
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
const TYPES = ['white', 'default', 'primary', 'danger', 'success', 'warning', 'info', 'black'];
</script>

<script setup>
import { ref, computed, provide, onMounted, onBeforeUnmount } from 'vue';
import NavbarToggleButton from './NavbarToggleButton.vue';
import clickOutside from '../../directives/click-outside.js';

defineOptions({ name: 'navbar' });

const props = defineProps({
  /** Transparent background (navbar-transparent). */
  transparent: Boolean,
  /** navbar-{position}; "fixed" gives fixed-top. */
  position: { type: String, default: 'relative' },
  /** Classes for the menu's <ul class="navbar-nav">, e.g. "ms-auto". */
  menuClasses: { type: [String, Object, Array], default: undefined },
  /** Stay transparent until the page is scrolled this many pixels, then take the colour of `type`. */
  colorOnScroll: { type: Number, default: 0 },
  /** Background colour: bg-{type}. */
  type: { type: String, default: 'white', validator: value => TYPES.includes(value) },
  /** Classes for the collapsing menu container. */
  navMenuClasses: { type: String, default: '' },
  /** Background image for the collapsed (mobile) menu. */
  menuImage: { type: String, default: undefined },
  /** Breakpoint from which the menu is expanded (navbar-expand-{expand}); false never expands. */
  expand: { type: [String, Boolean], default: 'lg' }
});

const emit = defineEmits(['open', 'close']);

const vClickOutside = clickOutside;
const showMenu = ref(false);
const scrollColorClass = ref('');
const scrollValue = ref(0);

const classes = computed(() => {
  const transparentUntilScrolled = props.colorOnScroll && scrollValue.value < props.colorOnScroll;
  return [
    {
      'navbar-transparent': props.transparent || transparentUntilScrolled,
      [`bg-${props.type}`]: !props.transparent && props.colorOnScroll === 0
    },
    props.expand ? `navbar-expand-${props.expand}` : '',
    props.position === 'fixed' ? 'fixed-top' : `navbar-${props.position}`,
    scrollColorClass.value
  ];
});

// Opening the menu also flags <html> (nav-open), which the theme uses.
function setNav(value) {
  const htmlClasses = document.documentElement.classList;
  htmlClasses.toggle('nav-open', value);
  showMenu.value = htmlClasses.contains('nav-open');
  emit(showMenu.value ? 'open' : 'close');
}

function toggle() {
  setNav(!showMenu.value);
}

function open() {
  setNav(true);
}

function close() {
  if (showMenu.value) {
    setNav(false);
  }
}

const slotData = computed(() => ({ toggle, open, close, isToggled: showMenu.value }));

// NavLinks inside the menu close it when clicked.
provide('closeNavbar', close);

function handleScroll() {
  const value = document.body.scrollTop || document.documentElement.scrollTop;
  scrollValue.value = value;
  scrollColorClass.value = props.colorOnScroll > 0 && value > props.colorOnScroll ? `bg-${props.type}` : '';
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
  handleScroll();
  document.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll);
  clearTimeout(scrollTimeout);
  if (showMenu.value) {
    document.documentElement.classList.remove('nav-open');
  }
});
</script>
