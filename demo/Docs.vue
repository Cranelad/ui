<template>
  <div class="docs">
    <navbar type="black" position="relative" menu-classes="ms-auto">
      <template #default>
        <a class="navbar-brand" href="#top">@cranelad/ui</a>
      </template>
      <template #navbar-menu>
        <li v-for="s in sections" :key="s.id" class="nav-item">
          <nav-link class="nav-link" :href="`#${s.id}`">{{ s.title }}</nav-link>
        </li>
        <li class="nav-item">
          <nav-link class="nav-link" href="./index.html">Demo</nav-link>
        </li>
      </template>
    </navbar>

    <div id="top" class="container">
      <section class="doc-intro">
        <h2 class="title">@cranelad/ui</h2>
        <p class="description">
          Cranelad's internal Vue 3 UI kit: the Now UI Kit theme and components on Bootstrap 5.
          Each section below shows a live example and the code for it. The README lists every prop,
          event and slot; <a href="./index.html">the demo</a> shows every theme style.
        </p>
      </section>

      <DocExample id="setup" title="Setup" :code="code.setup">
        <template #description>Import the stylesheet and install the plugin once, in the app's entry file.</template>
        <p class="mb-0">(No live example: this goes in <code>main.js</code>.)</p>
      </DocExample>

      <DocExample id="button" title="Button" :code="code.button">
        <template #description><code>&lt;n-button&gt;</code> is registered by the plugin. Colours, sizes and styles are props.</template>
        <n-button type="primary">Primary</n-button>
        <n-button type="success" round>Round</n-button>
        <n-button type="info" simple>Simple</n-button>
        <n-button type="danger" size="sm">Small</n-button>
        <n-button type="warning" size="lg" round>Large</n-button>
        <n-button type="primary" icon round><i class="now-ui-icons ui-2_favourite-28" /></n-button>
        <div style="max-width: 320px">
          <n-button type="primary" block round native-type="submit" @click.prevent="clicks++">Block, clicked {{ clicks }}×</n-button>
        </div>
      </DocExample>

      <DocExample id="input" title="Form input" :code="code.input">
        <template #description><code>&lt;fg-input&gt;</code> wraps a label, an input and icon addons in a <code>.form-group</code>, and supports <code>v-model</code>.</template>
        <div class="row">
          <div class="col-md-6">
            <fg-input v-model="email" label="Email" required type="email" placeholder="you@cranelad.tech" addon-left-icon="now-ui-icons ui-1_email-85" />
            <p class="small-note">v-model: <code>{{ email || '(empty)' }}</code></p>
          </div>
          <div class="col-md-6">
            <fg-input v-model="code6" label="Code" :error="code6.length && code6.length !== 6 ? 'Enter all 6 digits' : undefined" placeholder="6 digits" />
          </div>
        </div>
      </DocExample>

      <DocExample id="card" title="Card" :code="code.card">
        <div class="row">
          <div class="col-md-6">
            <card title="Card title" sub-title="Subtitle" description="A short description.">
              Body content.
              <template #footer>Footer</template>
            </card>
          </div>
          <div class="col-md-6">
            <card color="orange">
              <h4 class="card-title">Coloured</h4>
              <p>Use the <code>color</code> prop for the theme's backgrounds.</p>
            </card>
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
        <template #description>The bar at the top of this page is one. On small screens the menu collapses behind the toggle; links close it when clicked.</template>
        <p class="small-note d-lg-none">
          The live example below is shown on wide screens only: on small screens the theme supports one
          collapsible navbar per page (see the README), and this page already has one.
        </p>
        <div class="d-none d-lg-block">
        <navbar type="black" position="relative" menu-classes="ms-auto">
          <template #default>
            <a class="navbar-brand" href="#navbar">Brand</a>
          </template>
          <template #navbar-menu>
            <li class="nav-item"><nav-link href="#navbar">Home</nav-link></li>
            <drop-down title="More" icon="now-ui-icons design_app" class="nav-item">
              <nav-link href="#navbar">First</nav-link>
              <nav-link href="#navbar">Second</nav-link>
            </drop-down>
          </template>
        </navbar>
        </div>
      </DocExample>

      <DocExample id="dropdown" title="DropDown" :code="code.dropdown">
        <template #description>Opens on click, closes on clicks outside it or on a link inside it.</template>
        <ul class="navbar-nav">
          <drop-down title="Account" icon="now-ui-icons users_single-02" @change="open => (dropdownOpen = open)">
            <nav-link href="#dropdown">Profile</nav-link>
            <nav-link href="#dropdown">Sign out</nav-link>
          </drop-down>
        </ul>
        <p class="small-note">Open: {{ dropdownOpen }}</p>
      </DocExample>

      <DocExample id="parallax" title="Parallax" :code="code.parallax">
        <template #description>Moves its content at a third of the scroll speed; used for page-header images.</template>
        <div class="page-header page-header-small doc-parallax">
          <parallax class="page-header-image" :style="{ backgroundColor: '#2c2c2c' }" />
          <div class="content-center"><h3 class="title text-white">Scroll the page</h3></div>
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
const email = ref('');
const code6 = ref('');
const showAlert = ref(true);
const dismissed = ref(0);
const dropdownOpen = ref(false);
const boxActive = ref(false);

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
<n-button type="primary">Primary</n-button>
<n-button type="success" round>Round</n-button>
<n-button type="info" simple>Simple</n-button>
<n-button type="danger" size="sm">Small</n-button>
<n-button type="warning" size="lg" round>Large</n-button>
<n-button type="primary" icon round><i class="now-ui-icons ui-2_favourite-28" /></n-button>
<n-button type="primary" block round native-type="submit" @click="save">Block</n-button>
`,
  input: `
<fg-input
  v-model="email"
  label="Email"
  required
  type="email"
  placeholder="you@cranelad.tech"
  addon-left-icon="now-ui-icons ui-1_email-85"
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

<card color="orange">
  <h4 class="card-title">Coloured</h4>
</card>
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

<navbar type="black" position="fixed" :color-on-scroll="100" menu-classes="ms-auto">
  <template #default>
    <router-link class="navbar-brand" to="/">Brand</router-link>
  </template>
  <template #navbar-menu>
    <li class="nav-item"><nav-link :to="{ name: 'home' }">Home</nav-link></li>
    <drop-down title="More" icon="now-ui-icons design_app" class="nav-item">
      <nav-link :to="{ name: 'first' }">First</nav-link>
      <nav-link :to="{ name: 'second' }">Second</nav-link>
    </drop-down>
  </template>
</navbar>
`,
  dropdown: `
<ul class="navbar-nav">
  <drop-down title="Account" icon="now-ui-icons users_single-02" @change="open => isOpen = open">
    <nav-link :to="{ name: 'profile' }">Profile</nav-link>
    <nav-link @click="signOut">Sign out</nav-link>
  </drop-down>
</ul>
`,
  parallax: `
<div class="page-header page-header-small">
  <parallax class="page-header-image" style="background-image: url('/images/header.jpg')" />
  <div class="content-center"><h3 class="title">Title</h3></div>
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
  border-bottom: 1px solid #eee;
}

.docs .doc-live {
  margin: 16px 0;
}

.docs .doc-code {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
  font-size: 13px;
  white-space: pre-wrap;
}

.docs .small-note {
  font-size: 13px;
  color: #888;
}

.docs .doc-parallax {
  min-height: 0;
  height: 220px;
}

.docs .doc-box {
  display: inline-block;
  padding: 16px 24px;
  border: 1px dashed #aaa;
  border-radius: 4px;
  cursor: pointer;
}

.docs .doc-box.active {
  border-color: #2196f3;
  color: #2196f3;
}
</style>
