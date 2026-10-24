# Changelog

## 1.0.0

Native Bootstrap 5 in place of the Now UI Kit. Breaking: markup, classes and
some component props change; see the README.

- Theme: the Cranelad look (black pages, blue `#2196f3` headings and links, a
  blue line under the header, blue `.text-bg-info` cards, pill-shaped inputs
  and buttons) set through Bootstrap's own variables, plus a few site pieces:
  `.site-header`, `.site-footer`, `.section`, `.btn-ghost`, `.btn-icon`,
  `.link-arrow`. Write ordinary Bootstrap 5 markup.
- Icons use Tabler's own class names: `<i class="ti ti-mail"></i>`, and the
  `icon()` mixin / `$icons` map. The `now-ui-icons` names are gone.
- Components render plain Bootstrap 5 markup:
  - Button: types are Bootstrap's colours plus `link`; `outline` replaces
    `simple`; `round`, `block`, `icon` give `rounded-pill`, `w-100`,
    `btn-icon`. New `loading` and `disabled` props. Removed `social`, `wide`,
    `link` (use `type="link"`) and the `label` slots.
  - FormGroupInput: Bootstrap form markup; the label is linked to the input,
    and errors use `is-invalid` with `aria-describedby`.
  - Card: `title`, `subTitle` and `description` go in the body; `color` gives
    `text-bg-{color}`; `cardBodyClasses` is now `bodyClasses`. Removed `plain`,
    `raised`, `type`, `category`, `noFooterLine` and the `category`, `avatar`,
    `info` and `raw-content` slots.
  - Alert: `alert-dismissible` with a `btn-close`; default type `primary`.
  - DropDown: a button toggle (`toggleClasses`, default `btn btn-primary`);
    `align` (`start`/`end`) replaces `position`; renders a `div` by default.
  - Navbar: `bg-{type}` (`body` by default), `dark`, `fluid`, and `position`
    as `static`/`fixed-top`/`fixed-bottom`/`sticky-top`. Each navbar is
    independent (no more `nav-open` on `<html>` or `sidebar-collapse` on
    `<body>`). Removed `menuImage`.
  - NavLink is a `.nav-link` in a navbar and a `.dropdown-item` in a DropDown.
  - NavbarToggleButton is Bootstrap's toggler; new `controls` prop.
- Requires Vue 3.5.
- Removed the Now UI theme, its fonts and the old demo styles.

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
