# Changelog

## Unreleased (1.0)

- Native Bootstrap 5 theme in place of Now UI: the Cranelad look (black pages,
  blue #2196f3 headings and links, a blue line under the header, blue
  `.text-bg-info` cards, pill-shaped inputs and buttons) set through Bootstrap's
  own variables, plus a few site pieces: `.site-header`, `.site-footer`,
  `.section`, `.timeline`, `.btn-ghost`, `.link-arrow`.
- Icons use Tabler's own class names: `<i class="ti ti-mail"></i>`.

## 0.2.0

- The repository is public so projects can install from GitHub without a token
  (`github:Cranelad/ui#semver:^0.2.0`). The license still limits use to
  Cranelad projects. Also published to GitHub Packages, as before.
- Icons are now drawn with Tabler Icons (MIT) instead of the Nucleo font, under
  the same `now-ui-icons` class names, sizes and positions. The font holds only
  the kit's 100 icons (15 kB) and is built by `npm run build:icons` from
  `scripts/icons.mjs`. New: `$now-ui-icons` Sass map and `now-ui-icon()` mixin.
- Removed the Nucleo font and its license.

## 0.1.0

First release: the Now UI Kit theme and components from the Cranelad website,
reworked as a package.

- Bootstrap 5.3, configured to keep the Bootstrap 4 look the theme was designed
  on. Entries: `style.scss`, `style-element-plus.scss` (adds styles for Element
  Plus components) and `tokens.scss` (variables and mixins only).
- Components rewritten with `<script setup>`, with prop validators: Button
  (`n-button`), FormGroupInput (`fg-input`), Card, Alert, Navbar, NavLink,
  NavbarToggleButton, DropDown (`drop-down`), Parallax; plus `v-click-outside`
  and a plugin registering the common globals.
- Fixes compared with the original kit: Parallax no longer leaks its scroll
  listener; navbars no longer share one scroll throttle, clean up `nav-open`
  when unmounted and read the scroll position on mount; DropDown only emits
  `change` when its state changes; Card renders its `#category` slot; the
  navbar toggle's `aria-expanded`/`aria-controls` are correct.
- Removed styles for jQuery plugins (bootstrap-switch, datepicker, noUiSlider)
  and Creative Tim's demo pages.
- Unit tests (Vitest), a kitchen-sink demo and a docs page.
