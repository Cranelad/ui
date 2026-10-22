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

Other components are imported where they are used:

```js
import { Card, Navbar, NavLink, DropDown, Alert } from '@cranelad/ui'
```

## Bootstrap 5 and the Bootstrap 4 look

The theme was designed for Bootstrap 4. `src/scss/_config.scss` sets Bootstrap
5's variables to the Bootstrap 4 values, and `src/scss/_base.scss` adds back the
Bootstrap 4 behaviour the theme relies on. `src/scss/_bootstrap4-grid.scss`
replaces Bootstrap 5's grid with Bootstrap 4's.

In templates, use Bootstrap 5 utility names (`ms-auto`, `text-end`, ...) and the
existing markup patterns (`form-group`, `btn-block`, `input-group-prepend`).
