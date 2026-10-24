# @cranelad/ui

Cranelad's internal Vue 3 UI kit: Bootstrap 5 with the Cranelad theme (black
pages, blue headings and links, blue cards, pill-shaped buttons and inputs) and
a few Vue components that render plain Bootstrap 5 markup. For use in Cranelad
projects only (see [LICENSE](LICENSE)).

## Requirements

The package ships source (`.vue` and `.scss`), so the consuming project needs:

- Vue 3.5+ and Vite with `@vitejs/plugin-vue`
- `sass`
- `bootstrap` 5.3 (peer dependency)
- `element-plus` 2 only if you use `style-element-plus.scss` (optional peer dependency)

## Install

Install a tagged release straight from GitHub; no token or npm account needed:

```sh
npm install "github:Cranelad/ui#semver:^1.0.0"
```

which adds this to `package.json`:

```json
"@cranelad/ui": "github:Cranelad/ui#semver:^1.0.0"
```

npm picks the newest release tag matching the range (`v1.x` here). Update
the range to move to a new minor or major version. Requires `git` on the
machine running `npm install`.

### Or from GitHub Packages

Each release is also published to GitHub Packages. Installing from there needs
a GitHub personal access token (classic) with `read:packages` on every machine,
even though the package is public, so the GitHub install above is simpler. To
use it anyway, add `@cranelad:registry=https://npm.pkg.github.com` to the
project's `.npmrc`, put the token in your own `~/.npmrc`
(`npm config set //npm.pkg.github.com/:_authToken <token>`), then
`npm install @cranelad/ui`.

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
changing the kit's SCSS. Switch back to the GitHub release before deploying,
since the server won't have `../ui`.

## Use

```js
// Styles: Bootstrap 5 and the Cranelad theme, in one stylesheet.
import '@cranelad/ui/style.scss'

// Components
import CraneladUi from '@cranelad/ui'
app.use(CraneladUi) // v-click-outside, <n-button>, <fg-input>, <parallax>
```

Projects that use [Element Plus](https://element-plus.org) import
`style-element-plus.scss` instead: the same kit with Element Plus's colours,
font and radii set to match. (Element Plus is an optional peer dependency; the
kit's own components don't need it.)

```js
import '@cranelad/ui/style-element-plus.scss'
```

To use the theme's variables and mixins in a project's own Sass, import the
tokens (no CSS output, so the kit isn't compiled twice):

```scss
@import '@cranelad/ui/tokens.scss';

.thing { color: $primary; }
```

Other components are imported where they are used:

```js
import { Card, Navbar, NavLink, DropDown, Alert } from '@cranelad/ui'
```

The docs page (`npm run demo`, then open `/docs.html`) has a live example and
code for every component.

## The theme

Everything is standard Bootstrap 5, styled through Bootstrap's own variables in
`src/scss/_variables.scss`: write ordinary Bootstrap markup (`btn btn-primary
rounded-pill`, `card text-bg-info`, `form-control`, ...) and it comes out in the
Cranelad look. The main tokens:

| Token | Value | Used for |
|---|---|---|
| `$primary` | `#2196f3` | Headings, links, the header line, primary buttons |
| `$info` | `#2ca8ff` | The blue cards (`.text-bg-info`) |
| `$body-bg` / `$body-color` | `#000` / `#fff` | Black pages, white text |
| `$font-size-base` | `.875rem` (14px) | |
| `$input-border-radius` | `1.875rem` | Pill-shaped inputs, outlined in the text colour |

Cards are white with dark text by default (for dashboards and admin forms);
`.text-bg-info` gives the blue ones.

On top of Bootstrap the kit adds a few site-level pieces:

| Class | What |
|---|---|
| `.site-header` | Black header with the blue line under it; put a `.navbar` inside |
| `.site-footer`, `.site-footer-links`, `.site-footer-copyright` | The small footer: uppercase links and the copyright line |
| `.section`, `.section-title`, `.section-lead` | Page sections with centred blue titles, separated by a thin blue line |
| `.btn-ghost` | Outline button for the blue cards, in the card's text colour |
| `.btn-icon` | Square (round with `.rounded-pill`) button holding just an icon |
| `.link-arrow` | Text link with an arrow icon that nudges on hover |

Textareas are a plain underline rather than a pill, and an `.input-group-text`
icon sits inside the pill next to its input.

## Components

### Plugin (`app.use(CraneladUi)`)

Registers `v-click-outside` and the components templates commonly use without
importing: `<n-button>`, `<fg-input>` and `<parallax>`. Everything is also
exported by name, including the directive (`clickOutside`).

### `Button` (`<n-button>`)

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'primary'` | `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link` |
| `outline` | Boolean | `false` | `btn-outline-{type}` instead of filled |
| `round` | Boolean | `false` | Pill-shaped (`rounded-pill`) |
| `block` | Boolean | `false` | Full width (`w-100`) |
| `icon` | Boolean | `false` | Square icon-only button (`btn-icon`) |
| `size` | String | | `sm` or `lg` |
| `loading` | Boolean | `false` | Shows a spinner and disables the button |
| `disabled` | Boolean | `false` | |
| `tag` | String | `'button'` | Element to render, e.g. `a` |
| `nativeType` | String | `'button'` | The `type` attribute (`submit`, `reset`) |

Events: `click`. Slot: default.

### `FormGroupInput` (`<fg-input>`)

A label, an input and optional icon addons, as Bootstrap 5 form markup. Supports
`v-model`. The label is linked to the input (pass `id` to choose the id).
`class` and `style` apply to the wrapper; all other attributes and listeners
(`type`, `placeholder`, `@keydown`, ...) go to the `<input>`.

| Prop | Type | Default | |
|---|---|---|---|
| `modelValue` | String, Number | `''` | `v-model` |
| `label` | String | | |
| `required` | Boolean | `false` | Adds `*` to the label and `required` to the input |
| `error` | String | | Shows the message and marks the input invalid |
| `addonLeftIcon`, `addonRightIcon` | String | | Icon classes, e.g. `ti ti-mail` |
| `labelClasses`, `inputClasses` | String | | Extra classes |

Events: `update:modelValue`, `focus`, `blur`. Slots: default (replaces the
input), `label`, `addonLeft`, `addonRight`, `helpBlock` (replaces the error).

### `Card`

| Prop | Type | Default | |
|---|---|---|---|
| `title`, `subTitle`, `description` | String | | Shown at the top of the body |
| `color` | String | | `text-bg-{color}`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` |
| `headerClasses`, `bodyClasses` | String, Object, Array | | Extra classes |

Slots: default (`.card-body`), `header`, `footer`, `image` (first in the card,
e.g. an `<img class="card-img-top">`).

### `Alert`

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'primary'` | `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` |
| `dismissible` | Boolean | `false` | Show a close button |

Events: `dismiss`. Slots: default, `dismiss-icon` (receives `{ dismiss }`).

### `Navbar`

| Prop | Type | Default | |
|---|---|---|---|
| `type` | String | `'body'` | Background `bg-{type}`: a theme colour, `body`, `black` or `white` |
| `dark` | Boolean | `false` | Light text and toggler for dark backgrounds (`data-bs-theme="dark"`) |
| `transparent` | Boolean | `false` | No background |
| `colorOnScroll` | Number | `0` | Stay transparent until scrolled this many pixels |
| `position` | String | `'static'` | `static`, `fixed-top`, `fixed-bottom` or `sticky-top` |
| `expand` | String, Boolean | `'lg'` | Breakpoint the menu expands at; `false` never expands |
| `fluid` | Boolean | `false` | Full-width container |
| `menuClasses` | String, Object, Array | | Classes for the menu's `<ul class="navbar-nav">`, e.g. `ms-auto` |
| `navMenuClasses` | String, Object, Array | | Classes for the collapsing menu |

Events: `open`, `close`. Slots: default (brand; receives
`{ toggle, open, close, isToggled }`), `navbar-menu` (the `<li>` items; same
slot props), `before-menu`, `after-menu`. The menu closes on a click outside it
and when a `NavLink` in it is clicked. Each navbar is independent, so a page can
have several.

### `NavLink`

A link that renders `<router-link>` when `to` is set, `<a>` otherwise. It is a
`.nav-link` in a navbar and a `.dropdown-item` inside a `DropDown`, and closes
the navbar menu and dropdown it is in when clicked.

| Prop | Type | Default | |
|---|---|---|---|
| `to` | String, Object | | Route location |

### `NavbarToggleButton`

The Bootstrap toggler `Navbar` uses. Props: `toggled` (Boolean), `controls`
(the menu's id).

### `DropDown` (`<drop-down>`)

| Prop | Type | Default | |
|---|---|---|---|
| `title`, `icon` | String | | Toggle text and icon classes |
| `toggleClasses` | String, Object, Array | `'btn btn-primary'` | Classes for the toggle, e.g. `nav-link` in a navbar |
| `direction` | String | `'down'` | `down` or `up` |
| `align` | String | `'start'` | `end` aligns the menu with the toggle's end edge |
| `hideArrow` | Boolean | `false` | No caret |
| `tag` | String | `'div'` | Element to render (`li` fits in a navbar `<ul>`) |

Events: `change` (open state). Slots: default (menu items), `title` (replaces
the toggle; receives `{ toggle, isOpen }`). Closes on clicks outside it and when
a `NavLink` inside is clicked.

### `Parallax` (`<parallax>`)

A `<div>` whose content moves at a third of the page's scroll speed. Slot:
default.

### Icons

`<i class="ti ti-mail"></i>`: [Tabler Icons](https://tabler.io/icons) (MIT) by
their own names. The kit's font holds only the 135 icons listed in
[`scripts/icons.mjs`](scripts/icons.mjs) (about 20 kB).

To use an icon from Sass (e.g. in a `::after`), use the mixin or the `$icons`
map:

```scss
.thing::after { @include icon('check'); }
```

To add an icon, add its name to `scripts/icons.mjs` and run
`npm run build:icons`; it cuts Tabler's font down to the listed icons and
regenerates `_icons.scss` and `_icon-map.scss`.

## How the styles are organised

| Path | What |
|---|---|
| `src/scss/_variables.scss` | The theme, as Bootstrap 5 variables |
| `src/scss/components/` | The site-level pieces Bootstrap doesn't have (header, footer, sections, buttons) |
| `src/scss/_icons.scss`, `_icon-map.scss` | The icon font (generated) |
| `src/scss/index.scss` | The complete stylesheet (`@cranelad/ui/style.scss`) |
| `src/scss/element-plus.scss` | The same plus Element Plus theme variables (`@cranelad/ui/style-element-plus.scss`) |
| `src/scss/tokens.scss` | Variables and mixins only (`@cranelad/ui/tokens.scss`) |

## Development

```sh
npm install
npm test            # unit tests (Vitest)
npm run demo        # demo (/) and docs (/docs.html) with hot reload
npm run demo:build  # static build in demo/dist
```

The demo page (`demo/App.vue`) renders every component and theme style; the
docs page is `demo/Docs.vue`.

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

Projects installing from GitHub pick the release up on their next
`npm install`/`npm update` (within their semver range). The tag also starts the
Publish workflow (`.github/workflows/publish.yml`), which checks the tag matches
`package.json`, runs the tests and the demo build, and publishes to GitHub
Packages. The Test workflow runs on every push to `main` and on pull requests.
