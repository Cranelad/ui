import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Kitchen-sink demo of every component and theme style in the kit (index.html)
// and the docs page (docs.html). Both import the kit by its package name, the
// same way a consuming project would.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@cranelad/ui/style.scss': fileURLToPath(new URL('../src/scss/index.scss', import.meta.url)),
      '@cranelad/ui': fileURLToPath(new URL('../src/index.js', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // The theme predates the Sass module system.
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'legacy-js-api', 'if-function'],
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        demo: fileURLToPath(new URL('./index.html', import.meta.url)),
        docs: fileURLToPath(new URL('./docs.html', import.meta.url)),
      },
    },
  },
})
