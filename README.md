# @cranelad/ui

Cranelad's internal Vue 3 UI kit: the Now UI Kit theme and components, on
Bootstrap 5. For use in Cranelad projects only (see [LICENSE](LICENSE)).

## Requirements

The package ships source (`.vue` and `.scss`), so the consuming project needs:

- Vue 3.4+ and Vite with `@vitejs/plugin-vue`
- `sass`
- `bootstrap` 5.3 (peer dependency)
- `element-plus` 2 only if you use `style-element-plus.scss` (optional peer dependency)

## Install

The package is published privately to GitHub Packages, so installing it needs
a GitHub token with the `read:packages` scope from someone with access to the
Cranelad organisation.

1. Tell npm where `@cranelad` packages live, in the project's `.npmrc`
   (commit this file):

   ```ini
   @cranelad:registry=https://npm.pkg.github.com
   ```

2. Give npm the token, once per machine (developer or server), in the user's
   own `~/.npmrc`. Never commit a token to a project.

   ```sh
   npm config set //npm.pkg.github.com/:_authToken <token>
   ```

   In CI, set it from a secret instead, e.g. GitHub Actions'
   `actions/setup-node` with `registry-url: https://npm.pkg.github.com` and
   `NODE_AUTH_TOKEN`.

3. Install:

   ```sh
   npm install @cranelad/ui
   ```

### Working on the kit alongside a project

To try unreleased changes, link a local checkout instead:

```sh
npm install ../ui        # adds "@cranelad/ui": "file:../ui"
```

and add this to the project's `vite.config.js` so the app and the package
share one copy of Vue, and Vite's dev server may read the package:

```js
import { searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  resolve: { dedupe: ['vue'] },
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), '../ui'] } },
})
```

Vite's dev server doesn't watch a linked package for changes: restart it after
changing the kit's SCSS. Switch back to the published version before
deploying, since the server won't have `../ui`.

## Use

```js
// Styles: Bootstrap 5 and the theme, in one stylesheet.
import '@cranelad/ui/style.scss'

// Components
import CraneladUi from '@cranelad/ui'
app.use(CraneladUi) // v-click-outside, <n-button>, <fg-input>, <parallax>
```

Projects that use [Element Plus](https://element-plus.org) import
`style-element-plus.scss` instead: the same kit plus theme styles for Element's
inputs, selects, date pickers and carousel. (Element Plus is an optional peer
dependency; the kit's own components don't need it.)

```js
import '@cranelad/ui/style-element-plus.scss'
```

To use the theme's variables and mixins in a project's own Sass, import the
tokens (no CSS output, so the kit isn't compiled twice):

```scss
@import '@cranelad/ui/tokens.scss';

.thing { color: $primary-color; }
```

Other components are imported where they are used:

```js
import { Card, Navbar, NavLink, DropDown, Alert } from '@cranelad/ui'
```

The docs page (`npm run demo`, then open `/docs.html`) has a live example and
code for every component.

## Components

### Plugin (`app.use(CraneladUi)`)

Registers `v-click-outside` and the components templates commonly use without
importing: `<n-button>`, `<fg-input>` and `<parallax>`. Everything is also
exported by name, including the directive (`clickOutside`).

### `Button` (`<n-button>`)

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'default'` | Colour: `default`, `primary`, `secondary`, `info`, `success`, `warning`, `danger`, `neutral`, `light`, `dark`, `link`, `facebook`, `twitter`, `google`, `github`, `linkedin` |
| `size` | String | | `sm` or `lg` |
| `round`, `simple`, `block`, `icon`, `link`, `social`, `wide` | Boolean | `false` | `btn-round`, `btn-simple`, `btn-block`, ... |
| `tag` | String | `'button'` | Element to render, e.g. `a` |
| `nativeType` | String | `'button'` | The `type` attribute (`submit`, `reset`) |

Events: `click`. Slots: default, `label`, `labelRight`.

### `FormGroupInput` (`<fg-input>`)

A `.form-group` with a label, an input and optional icon addons. Supports
`v-model`. `class` and `style` apply to the wrapper; all other attributes and
listeners (`type`, `placeholder`, `@keydown`, ...) go to the `<input>`.

| Prop | Type | Default | |
|---|---|---|---|
| `modelValue` | String, Number | `''` | `v-model` |
| `label` | String | | |
| `required` | Boolean | `false` | Adds `*` to the label |
| `error` | String | | Shows the message and marks the field invalid |
| `addonLeftIcon`, `addonRightIcon` | String | | Icon classes, e.g. `now-ui-icons ui-1_email-85` |
| `labelClasses`, `inputClasses` | String | | Extra classes |

Events: `update:modelValue`, `focus`, `blur`. Slots: default (replaces the
input), `label`, `addonLeft`, `addonRight`, `infoBlock`, `helpBlock`.

### `Card`

| Prop | Type | Default | |
|---|---|---|---|
| `title`, `subTitle`, `description` | String | | Build the header |
| `category` | String | | Small heading above everything |
| `type` | String | | `card-{type}`, e.g. `login` |
| `color` | String | | Theme background (`data-background-color`): `orange`, `blue`, `red`, `green`, `yellow`, `black`, `gray`, `secondary` |
| `plain`, `raised` | Boolean | `false` | `card-plain`, `card-raised` |
| `noFooterLine` | Boolean | `false` | No `<hr>` above the footer |
| `headerClasses`, `cardBodyClasses` | String, Object, Array | | Extra classes |

Slots: default (`.card-body`), `header`, `footer`, `category`, `image`,
`avatar`, `info`, `raw-content` (inside the card, outside the body).

### `Alert`

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'default'` | `primary`, `secondary`, `info`, `success`, `warning`, `danger`, `light`, `dark` |
| `dismissible` | Boolean | `false` | Show a close button |

Events: `dismiss`. Slots: default, `dismiss-icon` (receives `{ dismiss }`).

### `Navbar`

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'white'` | Background: `white`, `default`, `primary`, `info`, `success`, `warning`, `danger`, `black` |
| `position` | String | `'relative'` | `navbar-{position}`; `fixed` gives `fixed-top` |
| `transparent` | Boolean | `false` | Transparent background |
| `colorOnScroll` | Number | `0` | Stay transparent until scrolled this many pixels |
| `expand` | String, Boolean | `'lg'` | Breakpoint the menu expands at; `false` never expands |
| `menuClasses` | String, Object, Array | | Classes for the menu's `<ul class="navbar-nav">`, e.g. `ms-auto` |
| `navMenuClasses` | String | `''` | Classes for the collapsing menu |
| `menuImage` | String | | Background image for the mobile menu |

Events: `open`, `close`. Slots: default (brand; receives
`{ toggle, open, close, isToggled }`), `navbar-menu` (the `<li>` items; same
slot props), `before-menu`, `after-menu`. Opening the menu adds `nav-open` to
`<html>`.

On small screens the theme only styles the navbar (hamburger button, collapsing
menu) inside `<body class="sidebar-collapse">`: add that class to `<body>`, for
example from the app's layout component. (`bootstrap-collapse` gives the
plainer Bootstrap-style menu instead.)

Use one collapsible navbar per page: opening a navbar's mobile menu adds
`nav-open` to `<html>`, and the theme slides in every navbar's menu on that
class.

### `NavLink`

A menu link: renders `<router-link>` when `to` is set, `<a>` otherwise, and
closes the navbar menu and dropdown it is in when clicked.

| Prop | Type | Default | |
|---|---|---|---|
| `to` | String, Object | | Route location |

### `DropDown` (`<drop-down>`)

| Prop | Type | Default | |
|---|---|---|---|
| `title`, `icon` | String | | Toggle text and icon classes |
| `direction` | String | `'down'` | `down` or `up` |
| `position` | String | | `right` aligns the menu to the right |
| `hideArrow` | Boolean | `false` | No caret |
| `tag` | String | `'li'` | Element to render (`li` fits in a navbar `<ul>`) |

Events: `change` (open state). Slots: default (menu items), `title` (replaces
the toggle). Closes on clicks outside it and when a `NavLink` inside is clicked.

### `Parallax` (`<parallax>`)

A `<div>` whose content moves at a third of the page's scroll speed (used for
page-header images). Slot: default.

### Icons

`<i class="now-ui-icons ui-1_email-85"></i>`: the original Now UI Kit class
names, drawn with [Tabler Icons](https://tabler.io/icons) (MIT). The 100
available names and the Tabler icon used for each are in
[`scripts/icons.mjs`](scripts/icons.mjs). Add `spin` to rotate an icon and
`circle` for a round grey background.

To use an icon from Sass (e.g. in a `::after`), use the mixin or the map:

```scss
.thing::after { @include now-ui-icon('ui-1_check'); }
```

To add an icon, add a line to `scripts/icons.mjs` and run
`npm run build:icons`; it cuts Tabler's font down to the listed icons
(about 15 kB) and regenerates `_icons.scss` and `_icon-map.scss`.

### `NavbarToggleButton`

The hamburger button used by `Navbar`. Prop: `toggled` (Boolean).

## How the styles are organised

| Path | What |
|---|---|
| `src/scss/now-ui-kit/_variables.scss` | The theme's design tokens (colours, sizes) |
| `src/scss/_config.scss` | Bootstrap 5 settings, matching the Bootstrap 4 defaults the theme was designed on |
| `src/scss/kit/` | The kit's own component styles on top of Bootstrap 5 (`.form-group`, `.btn-block`, input-group addons, `.close`, dropdown positioning, ...) |
| `src/scss/now-ui-kit/` | The Now UI Kit theme |
| `src/scss/index.scss` | The complete stylesheet (`@cranelad/ui/style.scss`) |
| `src/scss/element-plus.scss` | The same plus Element Plus styles (`@cranelad/ui/style-element-plus.scss`) |
| `src/scss/tokens.scss` | Variables and mixins only (`@cranelad/ui/tokens.scss`) |

The theme was designed for Bootstrap 4, so a few Bootstrap 4 conventions are
part of the kit: in templates use Bootstrap 5 utility names (`ms-auto`,
`text-end`, ...) together with the kit's markup patterns (`form-group`,
`btn-block`, `input-group-prepend`).

### Differences from the original (Bootstrap 4) kit

Everything renders as it did on Bootstrap 4, except:

- `<navbar type="black">` is black. Bootstrap 4 had no `.bg-black`, so it was
  transparent; Bootstrap 5's `.bg-black` utility makes it work as named.
- Bootstrap popovers and tooltips use Bootstrap 5's markup and arrow
  positioning. Only Bootstrap's own JavaScript shows them, and it now produces
  Bootstrap 5 markup.

## Development

```sh
npm install
npm test            # unit tests (Vitest)
npm run demo        # demo (/) and docs (/docs.html) with hot reload
npm run demo:build  # static build in demo/dist
```

The demo page (`demo/App.vue`) renders every component and theme style. It is
also the reference for visual-regression checks, so add to it rather than
rearranging it. The docs page is `demo/Docs.vue`.

## Releasing

1. Note the changes in `CHANGELOG.md`.
2. Bump the version; this commits it and creates a matching tag:

   ```sh
   npm version patch   # or minor / major
   ```

3. Push the commit and the tag:

   ```sh
   git push --follow-tags
   ```

The tag starts the Publish workflow (`.github/workflows/publish.yml`), which
checks the tag matches `package.json`, runs the tests and the demo build, and
publishes to GitHub Packages. The Test workflow runs on every push to `main` and
on pull requests.

