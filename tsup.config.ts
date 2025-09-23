import { defineConfig } from 'tsup'

// https://tsup.egoist.dev/#what-can-it-bundle
// https://github.com/egoist/tsup/issues/728
export default defineConfig({
  sourcemap: true,
  silent: true,
  clean: true
})
