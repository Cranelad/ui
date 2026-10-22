# @cranelad/ui

Cranelad's internal Vue 3 UI kit: the Now UI Kit theme and components, on
Bootstrap 5. For use in Cranelad projects only (see [LICENSE](LICENSE)).

## Requirements

The package ships source (`.vue` and `.scss`), so the consuming project needs:

- Vue 3 and Vite with `@vitejs/plugin-vue`
- `sass`
- `bootstrap` 5.3 (peer dependency)

## Install

Until the package is published, link it from a local checkout:

```sh
npm install ../ui        # adds "@cranelad/ui": "file:../ui"
```

When linking locally, add this to the project's `vite.config.js` so the app and
the package share one copy of Vue, and Vite's dev server may read the package:

```js
import { searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  resolve: { dedupe: ['vue'] },
  server: { fs: { allow: [searchForWorkspaceRoot(process.cwd()), '../ui'] } },
})
```

## Use

```js
// Styles: Bootstrap 5 and the theme, in one stylesheet.
import '@cranelad/ui/style.scss'

// Components
import CraneladUi from '@cranelad/ui'
app.use(CraneladUi) // v-click-outside, <n-button>, <fg-input>, <parallax>
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

## How the styles are organised

| Path | What |
|---|---|
| `src/scss/now-ui-kit/_variables.scss` | The theme's design tokens (colours, sizes) |
| `src/scss/_config.scss` | Bootstrap 5 settings, matching the Bootstrap 4 defaults the theme was designed on |
| `src/scss/kit/` | The kit's own component styles on top of Bootstrap 5 (`.form-group`, `.btn-block`, input-group addons, `.close`, dropdown positioning, ...) |
| `src/scss/now-ui-kit/` | The Now UI Kit theme |
| `src/scss/index.scss` | The complete stylesheet (`@cranelad/ui/style.scss`) |
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

The demo (`npm run demo`) shows every component and theme style.

