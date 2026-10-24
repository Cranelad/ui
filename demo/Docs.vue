<template>
  <div class="docs">
    <header class="site-header sticky-top">
      <navbar dark type="black" fluid menu-classes="ms-auto">
        <template #default>
          <a class="navbar-brand" href="#top">@cranelad/ui</a>
        </template>
        <template #navbar-menu>
          <li v-for="s in sections" :key="s.id" class="nav-item">
            <nav-link :href="`#${s.id}`">{{ s.title }}</nav-link>
          </li>
          <li class="nav-item">
            <nav-link href="./index.html">Demo</nav-link>
          </li>
        </template>
      </navbar>
    </header>

    <div id="top" class="container">
      <section class="doc-intro">
        <h2 class="section-title text-start">@cranelad/ui</h2>
        <p>
          Cranelad's internal Vue 3 UI kit: Bootstrap 5 with the Cranelad theme, and a few components
          that render plain Bootstrap markup. Each section below shows a live example and the code for it.
          The README lists every prop, event and slot; <a href="./index.html">the demo</a> shows every
          theme style.
        </p>
      </section>

      <DocExample id="setup" title="Setup" :code="code.setup">
        <template #description>Import the stylesheet and install the plugin once, in the app's entry file.</template>
        <p class="mb-0">(No live example: this goes in <code>main.js</code>.)</p>
      </DocExample>

      <DocExample id="button" title="Button" :code="code.button">
        <template #description><code>&lt;n-button&gt;</code> is registered by the plugin. Colours, sizes and shapes are props.</template>
        <div class="d-flex flex-wrap gap-2 mb-3">
          <n-button>Primary</n-button>
          <n-button type="success" round>Round</n-button>
          <n-button type="info" outline>Outline</n-button>
          <n-button type="danger" size="sm">Small</n-button>
          <n-button type="warning" size="lg" round>Large</n-button>
          <n-button icon round aria-label="Favourite"><i class="ti ti-heart" /></n-button>
          <n-button :loading="saving" round @click="save">{{ saving ? 'Saving' : 'Save' }}</n-button>
        </div>
        <div style="max-width: 320px">
          <n-button block round native-type="submit" @click.prevent="clicks++">Block, clicked {{ clicks }}×</n-button>
        </div>
      </DocExample>

      <DocExample id="input" title="Form input" :code="code.input">
        <template #description><code>&lt;fg-input&gt;</code> renders a label, an input and icon addons as Bootstrap form markup, and supports <code>v-model</code>.</template>
        <div class="row">
          <div class="col-md-6">
            <fg-input v-model="email" label="Email" required type="email" placeholder="you@cranelad.tech" addon-left-icon="ti ti-mail" />
            <p class="small-note">v-model: <code>{{ email || '(empty)' }}</code></p>
          </div>
          <div class="col-md-6">
            <fg-input v-model="code6" label="Code" :error="code6.length && code6.length !== 6 ? 'Enter all 6 digits' : undefined" placeholder="6 digits" />
          </div>
        </div>
      </DocExample>

      <DocExample id="card" title="Card" :code="code.card">
        <template #description>White by default, for dashboards and forms. For the blue cards on Cranelad pages, use plain markup with <code>text-bg-info</code>.</template>
        <div class="row g-4">
          <div class="col-md-6 d-flex">
            <card class="w-100" title="Card title" sub-title="Subtitle" description="A short description.">
              Body content.
              <template #footer>Footer</template>
            </card>
          </div>
          <div class="col-md-6 d-flex">
            <article class="card text-bg-info w-100 text-center">
              <div class="card-body">
                <h3 class="card-title h4">Blue card</h3>
                <p class="card-text">The cards on the Cranelad home page.</p>
                <a href="#card" class="btn btn-ghost rounded-pill">Visit Now</a>
              </div>
            </article>
          </div>
        </div>
      </DocExample>

      <DocExample id="alert" title="Alert" :code="code.alert">
        <alert type="success">
          <strong>Saved.</strong> Your changes are live.
        </alert>
        <alert v-if="showAlert" type="info" dismissible @dismiss="dismissed++">
          <strong>Dismissible.</strong> Close me.
        </alert>
        <p class="small-note">
          Dismissed {{ dismissed }}×.
          <a v-if="!showAlert || dismissed" href="#alert" @click.prevent="resetAlert">Show it again</a>
        </p>
      </DocExample>

      <DocExample id="navbar" title="Navbar" :code="code.navbar">
        <template #description>The bar at the top of this page is one. On small screens the menu collapses behind the toggler; links close it when clicked. Each navbar is independent.</template>
        <navbar type="primary" dark menu-classes="ms-auto">
          <template #default>
            <a class="navbar-brand" href="#navbar">Brand</a>
          </template>
          <template #navbar-menu>
            <li class="nav-item"><nav-link href="#navbar">Home</nav-link></li>
            <drop-down tag="li" title="More" toggle-classes="nav-link" align="end">
              <li><nav-link href="#navbar">First</nav-link></li>
              <li><nav-link href="#navbar">Second</nav-link></li>
            </drop-down>
          </template>
        </navbar>
      </DocExample>

      <DocExample id="dropdown" title="DropDown" :code="code.dropdown">
        <template #description>Opens on click, closes on clicks outside it or on a link inside it.</template>
        <drop-down title="Account" icon="ti ti-user" @change="open => (dropdownOpen = open)">
          <li><nav-link href="#dropdown">Profile</nav-link></li>
          <li><nav-link href="#dropdown">Sign out</nav-link></li>
        </drop-down>
        <p class="small-note mt-2">Open: {{ dropdownOpen }}</p>
      </DocExample>

      <DocExample id="parallax" title="Parallax" :code="code.parallax">
        <template #description>Moves its content at a third of the scroll speed.</template>
        <div class="doc-parallax">
          <parallax class="doc-parallax-layer">
            <h3 class="text-primary">Scroll the page</h3>
          </parallax>
        </div>
      </DocExample>

      <DocExample id="click-outside" title="v-click-outside" :code="code.clickOutside">
        <template #description>Registered by the plugin; calls its handler on clicks outside the element.</template>
        <div class="doc-box" :class="{ active: boxActive }" @click="boxActive = true" v-click-outside="() => (boxActive = false)">
          {{ boxActive ? 'Active: click outside to deactivate' : 'Click me' }}
        </div>
      </DocExample>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Navbar, NavLink, DropDown, Alert, Card } from '@cranelad/ui';
import DocExample from './DocExample.vue';

const sections = [
  { id: 'button', title: 'Button' },
  { id: 'input', title: 'Input' },
  { id: 'card', title: 'Card' },
  { id: 'alert', title: 'Alert' },
  { id: 'navbar', title: 'Navbar' },
  { id: 'dropdown', title: 'DropDown' }
];

const clicks = ref(0);
const saving = ref(false);
const email = ref('');
const code6 = ref('');
const showAlert = ref(true);
const dismissed = ref(0);
const dropdownOpen = ref(false);
const boxActive = ref(false);

function save() {
  saving.value = true;
  setTimeout(() => { saving.value = false; }, 1500);
}

function resetAlert() {
  showAlert.value = false;
  requestAnimationFrame(() => { showAlert.value = true; });
}

const code = {
  setup: `
import { createApp } from 'vue'
import '@cranelad/ui/style.scss'          // or style-element-plus.scss
import CraneladUi from '@cranelad/ui'
import App from './App.vue'

createApp(App).use(CraneladUi).mount('#app')
`,
  button: `
<n-button>Primary</n-button>
<n-button type="success" round>Round</n-button>
<n-button type="info" outline>Outline</n-button>
<n-button type="danger" size="sm">Small</n-button>
<n-button type="warning" size="lg" round>Large</n-button>
<n-button icon round aria-label="Favourite"><i class="ti ti-heart" /></n-button>
<n-button :loading="form.busy" round @click="save">Save</n-button>
<n-button block round native-type="submit">Block</n-button>
`,
  input: `
<fg-input
  v-model="email"
  label="Email"
  required
  type="email"
  placeholder="you@cranelad.tech"
  addon-left-icon="ti ti-mail"
/>
<fg-input v-model="code" label="Code" :error="codeError" placeholder="6 digits" />
`,
  card: `
<script setup>
import { Card } from '@cranelad/ui'
<\/script>

<card title="Card title" sub-title="Subtitle" description="A short description.">
  Body content.
  <template #footer>Footer</template>
</card>

<!-- The blue Cranelad card: plain Bootstrap markup -->
<article class="card text-bg-info text-center">
  <div class="card-body">
    <h3 class="card-title h4">Blue card</h3>
    <p class="card-text">The cards on the Cranelad home page.</p>
    <a href="#" class="btn btn-ghost rounded-pill">Visit Now</a>
  </div>
</article>
`,
  alert: `
<alert type="success"><strong>Saved.</strong> Your changes are live.</alert>

<alert type="info" dismissible @dismiss="onDismiss">
  <strong>Dismissible.</strong> Close me.
</alert>
`,
  navbar: `
<script setup>
import { Navbar, NavLink, DropDown } from '@cranelad/ui'
<\/script>

<header class="site-header fixed-top">
  <navbar dark type="black" fluid menu-classes="ms-auto">
    <template #default>
      <router-link class="navbar-brand" to="/">Brand</router-link>
    </template>
    <template #navbar-menu>
      <li class="nav-item"><nav-link :to="{ name: 'home' }">Home</nav-link></li>
      <drop-down tag="li" title="More" toggle-classes="nav-link" align="end">
        <li><nav-link :to="{ name: 'first' }">First</nav-link></li>
        <li><nav-link :to="{ name: 'second' }">Second</nav-link></li>
      </drop-down>
    </template>
  </navbar>
</header>
`,
  dropdown: `
<drop-down title="Account" icon="ti ti-user" @change="open => isOpen = open">
  <li><nav-link :to="{ name: 'profile' }">Profile</nav-link></li>
  <li><nav-link @click="signOut">Sign out</nav-link></li>
</drop-down>
`,
  parallax: `
<div class="header">
  <parallax class="header-image" style="background-image: url('/images/header.jpg')" />
</div>
`,
  clickOutside: `
<div :class="{ active }" @click="active = true" v-click-outside="() => (active = false)">
  {{ active ? 'Active' : 'Click me' }}
</div>
`
};
</script>

<style>
.docs .doc-intro,
.docs .doc-example {
  padding: 32px 0;
  border-bottom: 1px solid var(--bs-border-color);
}

.docs .doc-live {
  margin: 16px 0;
}

.docs .doc-code {
  padding: 16px;
  font-size: 13px;
  color: #e6e6e6;
  white-space: pre-wrap;
  background: #111;
  border: 1px solid var(--bs-border-color);
  border-radius: 4px;
}

.docs .small-note {
  font-size: 13px;
  color: var(--bs-secondary-color);
}

.docs .doc-parallax {
  height: 160px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid var(--bs-border-color);
}

.docs .doc-box {
  display: inline-block;
  padding: 16px 24px;
  cursor: pointer;
  border: 1px dashed var(--bs-secondary-color);
  border-radius: 4px;
}

.docs .doc-box.active {
  color: var(--bs-primary);
  border-color: var(--bs-primary);
}
</style>
